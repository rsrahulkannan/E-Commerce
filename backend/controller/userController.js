import asynchandler from 'express-async-handler';
import User from '../model/userModel.js';
import Token from '../model/tokenModel.js';
import generateToken from '../utils/generateToken.js';
import sendMail from '../utils/sendEmail.js';
import crypto from 'crypto';

// @desc Register suer
// route POST /api/users
// @access Public
const registerUser = asynchandler(async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const userExits = await User.findOne({email});
    if(userExits) {
        res.status(401);
        throw new Error(`User with given email already Exist!`);
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        isAdmin: false,
        isVerified: false
    })

    if(user) {
        const token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        })

        if(token) {
            const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;

            await sendMail(user.firstName + ' ' + user.lastName, user.email, 'Verify your email', url);

            const userDataWithoutPassword = {
                ...user._doc,
                password: undefined,
            };
    
            res.status(200).json({
                data: {
                    user: userDataWithoutPassword
                },
                message: 'Your account is registered, An Email sent to your account please verify!'
            })
        } else {
            res.status(400);
            throw new Error('Try to login')
        }
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
});

const authUser = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({email});

    if(userExists && await userExists.matchPassword(password)) {
        const token = generateToken(userExists._id);

        res.cookie('userToken', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== 'development',
            secure: false,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        const userDataWithoutPassword = {
            ...userExists._doc,
            password: undefined,
        };

        res.status(200).json({
            data: {
                user: userDataWithoutPassword
            },
            message: 'You have been logged into your account'
        })
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
})

const verifyToken = asynchandler(async (req, res) => {
    console.log(req.params);
    try {
        const user = await User.findOne({ _id: req.params.id });
        if(user) {
            const token = await Token.findOneAndDelete({
                userId: req.params.id,
                token: req.params.token
            });

            if(token) {
                await User.updateOne({ _id: user._id}, { $set: { isVerified: true }});

                res.status(200).json({ message: "Email verified successfully" });
            } else {
            res.status(400);
            throw new Error('Invalid link1')
        }
        } else {
            res.status(400);
            throw new Error('Invalid link2')
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
});

export {
    registerUser,
    authUser,
    verifyToken
}
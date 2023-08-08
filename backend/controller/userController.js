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
    
            // const token = generateToken(user._id);
            res.status(200).json({
                data: {
                    // token: token,
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
    verifyToken
}
import asynchandler from 'express-async-handler';
import User from '../model/userModel.js';
import Token from '../model/tokenModel.js';
import generateToken from '../utils/generateToken.js';
import sendMail from '../utils/sendEmail.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// @desc Register user
// route POST /api/auth
// @access Public
const registerUser = asynchandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userExits = await User.findOne({ email });
    if (userExits) {
        res.status(401);
        throw new Error(`User with given email already Exist!`);
    }

    const countUser = await User.count();

    let profileImage;
    if (req.file)
        profileImage = req.file.filename

    const user = await User.create({
        firstName,
        lastName,
        profileImage,
        email,
        password,
        isAdmin: countUser ? false : true,
        isVerified: false
    })

    if (user) {
        const token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        })

        if (token) {
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

    const userExists = await User.findOne({ email });

    if (userExists && await userExists.matchPassword(password)) {
        if (userExists.isVerified) {

            const token = generateToken(userExists._id);

            const userDataWithoutPassword = {
                ...userExists._doc,
                password: undefined,
            };

            res.cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 3600000)
            }).status(200).json({
                data: {
                    token: token,
                    user: userDataWithoutPassword
                },
                message: 'You have been logged into your account'
            })
        } else {
            const tokenExists = await Token.findOne({
                userId: userExists._id
            });

            if (!tokenExists) {
                const token = await Token.create({
                    userId: userExists._id,
                    token: crypto.randomBytes(32).toString('hex')
                })

                if (token) {
                    const url = `${process.env.BASE_URL}/users/${userExists._id}/verify/${token.token}`;

                    await sendMail(userExists.firstName + ' ' + userExists.lastName, userExists.email, 'Verify your email', url);
                }
            }

            res.status(400);
            throw new Error('You havent yet verified your account. We have send you an email');
        }
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
})

const verifyToken = asynchandler(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            const token = await Token.findOneAndDelete({
                userId: req.params.id,
                token: req.params.token
            });

            if (token) {
                await User.updateOne({ _id: user._id }, { $set: { isVerified: true } });

                res.status(200).json({ message: "Email verified successfully" });
            } else {
                res.status(400);
                throw new Error('Invalid link')
            }
        } else {
            res.status(400);
            throw new Error('Invalid link')
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
});

const forgotPassword = asynchandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        const token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        })

        if (token) {
            const url = `${process.env.BASE_URL}/users/${user._id}/reset/${token.token}`;

            await sendMail(user.firstName + ' ' + user.lastName, user.email, 'Forgot Password?', url);
        }
    }

    res.status(200).json({ message: 'We have send verification link to your Email' });
})

const verifyUrl = asynchandler(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            const token = await Token.findOne({
                userId: req.params.id,
                token: req.params.token
            });

            if (token) {
                res.status(200).json({ message: "Url verified successfully" });
            } else {
                res.status(400);
                throw new Error('Invalid link')
            }
        } else {
            res.status(400);
            throw new Error('Invalid link')
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
});

const resetPassword = asynchandler(async (req, res) => {
    const { password } = req.body;

    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            const token = await Token.findOneAndDelete({
                userId: req.params.id,
                token: req.params.token
            });

            if (token) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

                res.status(200).json({ message: "Password has been updated", password: hashedPassword });
            } else {
                res.status(400);
                throw new Error('Invalid link')
            }
        } else {
            res.status(400);
            throw new Error('Invalid link')
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
});

const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json({ message: 'Signout success!'});
};

export {
    registerUser,
    authUser,
    verifyToken,
    forgotPassword,
    resetPassword,
    verifyUrl,
    signout
}
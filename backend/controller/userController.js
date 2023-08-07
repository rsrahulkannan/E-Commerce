import asynchandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';

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
        password
    })

    if(user) {
        const userDataWithoutPassword = {
            ...user._doc,
            password: undefined,
        };
        const token = generateToken(user._id);
        res.status(200).json({
            data: {
                token: token,
                user: userDataWithoutPassword
            },
            message: 'User has been registered Successfully!'
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
});

export {
    registerUser
}
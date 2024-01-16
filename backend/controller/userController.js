import asynchandler from 'express-async-handler';
import User from '../model/userModel.js';
import sendMail from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';

const updateUser = asynchandler(async ( req, res) => {
    if (req.user.userId !== req.params.id) {
        res.status(401);
        throw new Error(`You can update only your account!`);
    }

    const { firstName, lastName } = req.body;
    
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    firstName,
                    lastName,
                }
            },
            { new: true }
        )
        const userDataWithoutPassword = {
            ...updateUser._doc,
            password: undefined,
        };

        res.status(200).json({
            data: {
                user: userDataWithoutPassword
            },
            message: 'You have been updated your account'
        })
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})

export {
    updateUser
}
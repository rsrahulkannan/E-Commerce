import asynchandler from 'express-async-handler';
import User from '../model/userModel.js';
import sendMail from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';
import { removeMiddleware } from '../middleware/multerMiddelware.js';

const updateUser = asynchandler(async (req, res) => {
    if (req.user.userId !== req.params.id) {
        res.status(401);
        throw new Error(`You can update only your account!`);
    }

    const { firstName, lastName } = req.body;

    let profileImage;
    let oldProfilePicture;
    if (req.file) {
        profileImage = req.file.filename;

        const userExists = await User.findById(req.params.id);
        oldProfilePicture = userExists.profileImage;
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    firstName,
                    lastName,
                    profileImage
                }
            },
            { new: true }
        )
        const userDataWithoutPassword = {
            ...updateUser._doc,
            password: undefined,
        };

        if (oldProfilePicture)
            removeMiddleware(req, oldProfilePicture)

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

const changePassword = asynchandler(async (req, res) => {
    if (req.user.userId !== req.params.id) {
        res.status(401);
        throw new Error(`You can update only your account!`);
    }

    const { oldPassword, newPassword } = req.body;

    const userExists = await User.findById(req.params.id);
    if (userExists && await userExists.matchPassword(oldPassword)) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: { password: hashedPassword } });

            const userDataWithoutPassword = {
                ...updateUser._doc,
                password: undefined,
            };
            res.status(200).json({
                message: "Password has been updated",
                data: {
                    user: userDataWithoutPassword
                }
            });
        } catch (error) {
            res.status(401);
            throw new Error(error);
        }
    } else {
        res.status(400);
        throw new Error('Old password is incorrect');
    }
})

export {
    updateUser,
    changePassword
}
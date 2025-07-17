import { hashPassword } from "../utils/Auth.util.js";
import { User } from "../models/User.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User

export const SignUpUser = async (req, res) => {
    try {

        console.log("Received body:", req.body);

        const { fullName, email, password, confirmPassword } = req.body;

        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Registration Failed. User already exists"
            });
        }


        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            {userId: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        const userData = await User.findById(newUser._id).select("-password");

        return res.status(200).json({
            success: true,
            token,
            userData,
            message: "Registration successfull"
        });


    } catch (error) {
        console.log("Error : ", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Login User

export const SignInUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!!"
            });
        }

        const isCorrectPass = await bcrypt.compare(password, user.password);

        if (!isCorrectPass) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!!"
            })
        }

        // Finally got correct user
        // generate JWT token

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Return user info + token without password

        const userData = await User.findOne({ email }).select("-password");

        res.status(200).json({
            success: true,
            userData: userData,
            token,
            message: "Login Successful"
        });

        return;

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


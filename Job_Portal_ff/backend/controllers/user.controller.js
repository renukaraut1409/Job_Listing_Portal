import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new user
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        // Validate input
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Check if file is uploaded
        let profilePhotoUrl = '';
        if (file) {
            console.log('File received:', file);
            const fileUri = getDataUri(file);
            console.log('File URI:', fileUri);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            console.log('Cloudinary response:', cloudResponse);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({
            message: "An error occurred while registering the user.",
            success: false
        });
    }
};

// Log in a user
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate input
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Find the user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check user role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the specified role.",
                success: false
            });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Return response with token
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: "An error occurred while logging in.",
            success: false
        });
    }
};

// Log out a user
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({
            message: "An error occurred while logging out.",
            success: false
        });
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        const userId = req.id; // Middleware authentication

        // Find the user
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Update user details
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        // Upload file if present
        if (file) {
            console.log('File received for update:', file);
            const fileUri = getDataUri(file);
            console.log('File URI for update:', fileUri);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            console.log('Cloudinary response for update:', cloudResponse);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        // Save updated user
        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.error('Error during profile update:', error);
        return res.status(500).json({
            message: "An error occurred while updating the profile.",
            success: false
        });
    }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const createToken = (userId) => {
    return jwt.sign({ 
        id: userId
     },
     process.env.JWT_SECRET,
     {expiresIn: "7d"}
    );
};

const publicUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
});

export const signup = async (req, res, next) => {
    try {
        
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ success: false,
                message: "Name, email and password are required"
             });
        }

        if(password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            passwordHash,
        });

        const token = createToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            token,
            user: publicUser(user),
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = createToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Login successful",
            token,
            user: publicUser(user),
        });
    } catch (error) {
        next(error);
    }
};


export const me = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: publicUser(req.user)
    });
};

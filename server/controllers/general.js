import User from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(200);
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: error.message,
        });
    }    
}
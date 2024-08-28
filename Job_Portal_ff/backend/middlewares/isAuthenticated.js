import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;

        // Check if token is provided
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Attach user ID to request object
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
};

export default isAuthenticated;

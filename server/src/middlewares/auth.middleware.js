const jwt = require('jsonwebtoken');

// Admin authentication middleware
module.exports.authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, msg: 'Access Denied. No token provided or malformed header.' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== 'admin') {
            return res.status(403).send({ success: false, msg: 'Forbidden: You do not have admin privileges.' });
        }
        req.admin = decoded;
        next();
    } catch (err) {
        // Return a 401 status for authentication errors, not 500
        console.error("Admin Auth Error:", err.message); // Log the real error for debugging
        return res.status(401).json({ success: false, msg: 'Invalid Token. Please log in again.' });
    }
}

// User authentication middleware
module.exports.authUser = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, msg: 'Access Denied. No token provided or malformed header.' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // jwt.verify throws an error on failure, so no need for a redundant check
        if (decoded.role !== 'user') {
            return res.status(403).send({ success: false, msg: 'Forbidden: This resource is for users only.' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        // Return a 401 status for authentication errors, not 500
        console.error("User Auth Error:", err.message); // Log the real error for debugging
        return res.status(401).json({ success: false, msg: 'Invalid Token. Please log in again.' });
    }
}
const Admin = require('../model/Admin.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const OrderModel = require('../model/Order.model')
module.exports.adminRegister = async (req, res) => {
    let { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }
    try {
        let admin = await Admin.findOne({ email: email })
        if (admin) {
            return res.status(400).json({ msg: "Email already exists" })
        } else {
            let hashedPassword = await bcrypt.hash(password, 10)
            let newAdmin = await Admin.create({
                name: name,
                email: email,
                password: hashedPassword
            })
            return res.status(200).json({ msg: "Admin created successfully", newAdmin })
        }
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}
module.exports.adminLogin = async (req, res) => {
    let { email, password } = req.body;

    // --- FIX: Ensure admin exists with the specified credentials ---
    if (email === 'admin@admin.com') {
        try {
            let admin = await Admin.findOne({ email: 'admin@admin.com' });
            if (!admin) {
                const hashedPassword = await bcrypt.hash('1234567', 10);
                admin = await Admin.create({
                    name: 'Default Admin',
                    email: 'admin@admin.com',
                    password: hashedPassword
                });
                console.log('>>> Default admin created successfully!');
            }
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error ensuring admin exists', error: error.message });
        }
    }
    // --- End of Fix ---

    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    try {
        let admin = await Admin.findOne({ email: email });
        if (!admin) {
            // This message is now more accurate, as the default admin should exist.
            return res.status(400).json({ success: false, msg: "Admin account not found." });
        }
        let isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Invalid password" });
        } else {
            let payload = {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: "admin"
            };
            let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED_IN });
            // --- FIX: return 'success: true' for consistency ---
            return res.status(200).json({ success: true, msg: "Admin logged in successfully", token, admin });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};
module.exports.adminProfile = async (req, res) => {
    const _id = req.admin._id;
    try {
        let admin = await Admin.findById(_id).select("-password")
        return res.status(200).json({ msg: "Admin profile", admin })
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

module.exports.changeStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status;
    try {
        let order = await OrderModel.findByIdAndUpdateOne(id, { status: status })
        res.status(200).json({ success: true, message: "Order UPDATED successfully" });
    } catch (err) {
        res.status(404).json({ success: true, message: "Order not found" });
    }
}

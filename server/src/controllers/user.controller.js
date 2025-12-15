const User = require("../model/User.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Address = require('../model/Address.model');
const PaymentCard = require('../model/PaymentCard.model');

// Register
module.exports.userRegister = async (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ success: false, msg: "Please enter all fields" });
    }
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: "Email or phone already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, phone, password: hashedPassword });

        return res.status(201).json({ success: true, msg: "User created successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Login
module.exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, msg: "Please enter all fields" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, msg: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: "user"
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRED_IN }
        );

        return res.status(200).json({ success: true, msg: "User logged in successfully", token });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Profile
module.exports.userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json({ success: true, msg: "User profile", user });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Add Address
module.exports.addNewAddress = async (req, res) => {
    const { pin, city, state, street, type } = req.body;
    if (!pin || !city || !state || !street || !type) {
        return res.status(400).json({ success: false, msg: "Please enter all fields" });
    }

    try {
        const address = await Address.create({ pin, city, state, street, type, userId: req.user._id });
        const user = await User.findById(req.user._id);
        user.address.push(address._id);
        await user.save();

        return res.status(201).json({ success: true, msg: "Address added successfully", address });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Get All Address
module.exports.getAllAddress = async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user._id });
        return res.status(200).json({ success: true, msg: "All addresses", addresses });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Delete Address
module.exports.deleteAddressById = async (req, res) => {
    try {
        await Address.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, msg: "Address deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Update Address
module.exports.updateAddressById = async (req, res) => {
    try {
        const { pin, city, state, street, type } = req.body;
        const address = await Address.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { pin, city, state, street, type },
            { new: true }
        );
        if (!address) {
            return res.status(404).json({ success: false, msg: "Address not found or not authorized" });
        }
        return res.status(200).json({ success: true, msg: "Address updated successfully", address });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Add Payment Card
module.exports.addNewPaymentCard = async (req, res) => {
    const { number, expiryDate, cvv } = req.body;

    if (!number || !expiryDate || !cvv) {
        return res.status(400).json({ success: false, msg: "Please enter all fields" });
    }

    if (number.length !== 16 || cvv.length !== 3) {
        return res.status(400).json({ success: false, msg: "Invalid card number or CVV" });
    }

    try {
        const card = await PaymentCard.create({
            cardHolder: req.user._id,
            number,
            expiryDate,
            cvv
        });

        const user = await User.findById(req.user._id);
        user.paymentCards.push(card._id);
        await user.save();

        return res.status(201).json({ success: true, msg: "Card added successfully", card });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Get All Payment Cards
module.exports.getAllPaymentsCards = async (req, res) => {
    try {
        const cards = await PaymentCard.find({ cardHolder: req.user._id });
        return res.status(200).json({ success: true, msg: "All cards", cards });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Delete Payment Card
module.exports.deletePaymentCardById = async (req, res) => {
    try {
        await PaymentCard.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, msg: "Card deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Update Payment Card
module.exports.updatePaymentCardById = async (req, res) => {
    try {
        const { number, expiryDate, cvv } = req.body;
        if (!number || !expiryDate || !cvv) {
            return res.status(400).json({ success: false, msg: "Please enter all fields" });
        }
        if (number.length !== 16 || cvv.length !== 3) {
            return res.status(400).json({ success: false, msg: "Invalid card number or CVV" });
        }
        const card = await PaymentCard.findOneAndUpdate(
            { _id: req.params.id, cardHolder: req.user._id },
            { number, expiryDate, cvv },
            { new: true }
        );
        if (!card) {
            return res.status(404).json({ success: false, msg: "Card not found or not authorized" });
        }
        return res.status(200).json({ success: true, msg: "Card updated successfully", card });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

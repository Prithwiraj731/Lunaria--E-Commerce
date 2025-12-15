const Order = require("../model/Order.model");
const AddressModel = require("../model/Address.model");
const User = require("../model/User.model");

module.exports.createOrder = async (req, res) => {
    const { orderItems, shippingAddress, addressType, paymentMethod, totalPrice, paymentReciptId } = req.body;
    const userId = req.user._id;

    if (!orderItems || !paymentMethod || !totalPrice || !paymentReciptId || (!shippingAddress && !addressType)) {
        return res.status(400).json({ success: false, message: "Please fill in all required fields" });
    }

    try {
        let addressId = shippingAddress;
        if (!addressId && addressType) {
            const address = await AddressModel.findOne({ userId, type: addressType });
            if (!address) {
                return res.status(404).json({ success: false, message: "Shipping address not found" });
            }
            addressId = address._id;
        }
        if (!addressId) {
            return res.status(400).json({ success: false, message: "Shipping address is required" });
        }

        const order = new Order({
            user: userId,
            orderItems,
            shippingAddress: addressId,
            totalPrice,
            paymentMethod,
            paymentReciptId
        });

        await order.save();

        return res.status(201).json({ success: true, message: "Order created successfully", order });
    } catch (error) {
        console.error("Create Order Error:", error);
        return res.status(500).json({ success: false, message: "Error creating order" });
    }
};

// Get Order by ID
module.exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
            .populate('orderItems.product')
            .populate('shippingAddress');
        if (!order) {
            return res.status(404).json({ success: false, msg: "Order not found" });
        }
        return res.status(200).json({ success: true, msg: "Order details", order });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

// Get All Orders (for a user)
module.exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('orderItems.product')
            .populate('shippingAddress')
            .sort({ createdAt: -1 });
        return res.status(200).json({ success: true, msg: "All orders", orders });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

module.exports.cancelOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = "cancelled";
        await order.save();

        return res.status(200).json({ success: true, message: "Order cancelled successfully! Refund initiated 🤣" });
    } catch (error) {
        console.error("Cancel Order Error:", error);
        return res.status(500).json({ success: false, message: "Error cancelling order" });
    }
};

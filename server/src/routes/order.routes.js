const express = require("express");
const { authUser, authAdmin } = require("../middlewares/auth.middleware");
const {
    createOrder,
    getAllOrder,
    getOrderById,
    cancelOrderById,
} = require("../controllers/order.controller");
const router = express.Router();

router.post("/", authUser, createOrder);
router.get("/", authUser, getAllOrder);
router.get("/:id", authUser, getOrderById);
router.delete("/:id", authUser, cancelOrderById);

module.exports = router
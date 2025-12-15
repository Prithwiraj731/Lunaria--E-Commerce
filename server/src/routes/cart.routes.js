const express = require('express')

const { authUser } = require('../middlewares/auth.middleware')
const { addCart, getAllCart, deleteCartById, clearCart } = require('../controllers/cart.controller')
const router = express.Router()

router.post('/', authUser, addCart)
router.get('/', authUser, getAllCart)
router.post('/clear', authUser, clearCart)
router.delete("/:id", authUser, deleteCartById)

module.exports = router
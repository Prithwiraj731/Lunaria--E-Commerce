const express = require('express');
const {
  userRegister,
  userLogin,
  userProfile,
  addNewAddress,
  getAllAddress,
  deleteAddressById,
  addNewPaymentCard,
  getAllPaymentsCards,
  deletePaymentCardById,
  updateAddressById,
  updatePaymentCardById
} = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware');

const router = express.Router();

// 🔐 Authentication Routes
router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/profile', authUser, userProfile);

// 📦 Address Routes
router.post('/address', authUser, addNewAddress);
router.get('/address', authUser, getAllAddress);
router.delete('/address/:id', authUser, deleteAddressById);
router.put('/address/:id', authUser, updateAddressById);

// 💳 Payment Card Routes
router.post('/card', authUser, addNewPaymentCard);
router.get('/card', authUser, getAllPaymentsCards);
router.delete('/card/:id', authUser, deletePaymentCardById);
router.put('/card/:id', authUser, updatePaymentCardById);

module.exports = router;

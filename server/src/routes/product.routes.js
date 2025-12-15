const express = require('express')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temp storage

const { authAdmin } = require('../middlewares/auth.middleware')
const { createProduct, getAllProduct, getProductById, deleteProductById, searchProducts, recommendProducts } = require('../controllers/product.controller')
const router = express.Router()

router.post('/', authAdmin, createProduct)
router.get('/', getAllProduct)
router.get('/search', searchProducts)
router.get('/recommend', recommendProducts)
router.delete('/all', authAdmin, require('../controllers/product.controller').deleteAllProducts)
router.post('/bulk-upload', authAdmin, upload.single('file'), require('../controllers/product.controller').bulkUploadProducts)
router.get('/:id', getProductById)
router.delete("/:id", authAdmin, deleteProductById)
router.put("/:id", authAdmin, require("../controllers/product.controller").updateProductById)

module.exports = router
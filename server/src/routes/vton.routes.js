const router = require('express').Router();
const { generateTryOn } = require('../controllers/vton.controller');
const multer = require('multer');

// Configure multer for temporary local storage
const upload = multer({ dest: 'uploads/' });

// Changed to match user spec "router.post('/try-on', ...)"
// Mounted at /api/vton, so full path is /api/vton/try-on
router.post('/try-on', upload.single('userImage'), generateTryOn);

module.exports = router;

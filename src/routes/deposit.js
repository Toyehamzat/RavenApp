const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const depositController = require('../controllers/depositController')
const router = express.Router();

router.post('/deposit',authMiddleware, depositController.depositWebhook);


module.exports = router;
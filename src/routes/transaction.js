const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/bankTransfer', authMiddleware, transactionController.createTransaction);

router.get('/history', authMiddleware, transactionController.getTransactionHistory);

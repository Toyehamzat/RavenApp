const TransactionService = require('../services/transactionService');

exports.createTransaction = async (req, res) => {
    const { recipientAccountNumber, amount, description } = req.body;
    try {
      const result = await TransactionService.transferToBank(req.user.userId, recipientAccountNumber, amount, description);
      res.json(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
};

exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await TransactionService.getTransactionHistory(req.user.userId);
        res.json(transactions);
      } catch (err) {
        res.status(500).send('Error fetching transactions');
      }
}
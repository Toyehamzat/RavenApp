const DepositService = require("../services/depositService")

exports.depositWebhook = async (req, res) => {
  const { account_number, amount, transactionId } = req.body;
  try {
    await axios.post('https://webhook.site/9cb63c58-98d5-411e-a99d-8de25fbb8c5e', req.body);
    const result = await DepositService.processDepositWebhook(account_number, amount, transactionId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send('Error processing webhook');
  }
};

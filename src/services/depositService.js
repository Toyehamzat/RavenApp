const db = require('../config/database');
const axios = require('axios');

class DepositService{
    async  processDepositWebhook(accountNumber, amount, transactionId) {
        const wallet = await db('wallets').where({ account_number: accountNumber }).first();
        if (!wallet) throw new Error('Wallet not found');
      
        const newBalance = parseFloat(wallet.balance) + parseFloat(amount);
      
        await db('transactions').insert({
          sender_wallet_id: null,
          recipient_wallet_id: wallet.id,
          amount,
          type: 'deposit',
          status: 'completed',
          reference_id: transactionId,
          b_before: wallet.balance,
          b_after: newBalance,
          direction: 'credit',
        });
      
        await db('wallets').where({ id: wallet.id }).update({ balance: newBalance });
      
        return 'Webhook received';
      }
}


module.exports = new DepositService();

const db = require('../config/database');
const axios = require('axios');

class TransactionService{
    async transferToBank(data){
        const { senderUserId, recipientAccountNumber, amount, description } = data;

        const senderWallet = await db('wallets').where({ user_id: senderUserId }).first();
        const recipientWallet = await db('wallets').where({ account_number: recipientAccountNumber }).first();
      
        if (!senderWallet || !recipientWallet) throw new Error('Wallet not found');
        if (senderWallet.balance < amount) throw new Error('Insufficient funds');
      
        const newSenderBalance = parseFloat(senderWallet.balance) - parseFloat(amount);
        const newRecipientBalance = parseFloat(recipientWallet.balance) + parseFloat(amount);
      
        const transactionId = `tx_${Date.now()}`;
      
        await db('transactions').insert({
          sender_wallet_id: senderWallet.id,
          recipient_wallet_id: recipientWallet.id,
          amount,
          type: 'transfer',
          status: 'completed',
          reference_id: transactionId,
          description,
          b_before: senderWallet.balance,
          b_after: newSenderBalance,
          direction: 'debit',
        });
      
        await db('transactions').insert({
          sender_wallet_id: senderWallet.id,
          recipient_wallet_id: recipientWallet.id,
          amount,
          type: 'transfer',
          status: 'completed',
          reference_id: transactionId,
          description,
          b_before: recipientWallet.balance,
          b_after: newRecipientBalance,
          direction: 'credit',
        });
      
        await db('wallets').where({ id: senderWallet.id }).update({ balance: newSenderBalance });
        await db('wallets').where({ id: recipientWallet.id }).update({ balance: newRecipientBalance });
      
        return { transactionId, senderNewBalance: newSenderBalance, recipientNewBalance: newRecipientBalance };
    }
    async  getTransactionHistory(userId) {
        const wallets = await db('wallets').where({ user_id: userId });
        const walletIds = wallets.map(w => w.id);
        const transactions = await db('transactions')
          .whereIn('sender_wallet_id', walletIds)
          .orWhereIn('recipient_wallet_id', walletIds);
        return transactions;
      }
}


module.exports = new TransactionService();

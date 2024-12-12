const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const axios = require('axios');

class AuthService {
  async registerUser(userData) {
    const { email, password, fname, lname, phone,nin,bvn} = userData;
    
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      throw new Error('User already exists');
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    return db.transaction(async (trx) => {
      const [userId] = await trx('users').insert({
        customer_email:email,
        password: hashedPassword,
        fname,
        lname,
        phone,
        bvn,
        nin
      });

      const walletResponse = await axios.post(
       'https://integrations.getravenbank.com/v1/wallet/create_merchant',
       {
           customer_email: email,
           fname,
           lname,
           phone,
           bvn,
           nin,
       },
       {
           headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LIVE_SECRET_KEY}` 
           },
       }
        );

    if (walletResponse.status !== 200) {
      throw new Error('Failed to create wallet');
  }

  const { reference, account_number, bank_name, account_name } = walletResponse.data.data;
        await trx('wallets').insert({
            user_id: userId,
            account_number,
            bank_name,
            account_name,
            reference,
        });
        return { userId, accountNumber: account_number, reference };
    });
  }

  async loginUser(email, password) {
    const user = await db('users').where({ customer_email:email }).first();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, customer_email: user.customer_email }, 
      process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    return { token, user: { id: user.id, customer_email: user.customer_email } };
  }

  async getUserProfile(userId) {
    const user = await db('users')
      .select('id', 'customer_email', 'fname', 'lname', 'phone')
      .where({ id: userId })
      .first();

    const wallet = await db('wallets')
      .where({ user_id: userId })
      .first();

    return { user:{...user},wallet:{...wallet} };
  }
}

module.exports = new AuthService();
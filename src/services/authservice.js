// src/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { generateAccountNumber } = require('../utils/accountUtils');

class AuthService {
  async registerUser(userData) {
    const { email, password, first_name, last_name, phone_number } = userData;
    
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      throw new Error('User already exists');
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    return db.transaction(async (trx) => {
      const [userId] = await trx('users').insert({
        email,
        password: hashedPassword,
        first_name,
        last_name,
        phone_number
      });

      const accountNumber = generateAccountNumber();
      await trx('accounts').insert({
        user_id: userId,
        account_number: accountNumber
      });

      return { userId, accountNumber };
    });
  }

  async loginUser(email, password) {
    const user = await db('users').where({ email }).first();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    return { token, user: { id: user.id, email: user.email } };
  }

  async getUserProfile(userId) {
    const user = await db('users')
      .select('id', 'email', 'first_name', 'last_name', 'phone_number')
      .where({ id: userId })
      .first();

    const account = await db('accounts')
      .where({ user_id: userId })
      .first();

    return { ...user, account_number: account.account_number, balance: account.balance };
  }
}

module.exports = new AuthService();
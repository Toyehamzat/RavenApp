const knex = require('../config/database');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

class User {
  static async create(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const accountNumber = this.generateAccountNumber();

    const [user] = await knex('users')
      .insert({
        id: uuidv4(),
        email,
        password: hashedPassword,
        account_number: accountNumber
      })
      .returning('*');

    return user;
  }

  static async authenticate(email, password) {
    const user = await knex('users').where({ email }).first();
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return { user, token };
  }

  static generateAccountNumber() {
    return Math.random().toString().slice(2, 11);
  }
}

module.exports = User;
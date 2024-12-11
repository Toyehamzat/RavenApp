const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { generateAccountNumber } = require('../utils/accountUtils');

class AuthService{
    async registerUser(user){}
    async loginUser(email, password){}
}
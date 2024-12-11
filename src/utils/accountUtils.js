const crypto = require('crypto');

exports.generateAccountNumber = () => {
  return '0' + Math.floor(Math.random() * 9000000000) + 10000000;
};

exports.generateReferenceId = () => {
  return crypto.randomBytes(16).toString('hex');
};
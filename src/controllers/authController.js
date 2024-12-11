const AuthService = require('../services/authservice');

exports.signUp=async(req,res)=>{
    try {
        const { userId, accountNumber } = await AuthService.registerUser(req.body);
        res.status(201).json({ 
          message: 'User registered successfully', 
          userId, 
          accountNumber 
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

exports.signIn = async (req, res) => {
    try {
        const result = await AuthService.loginUser(req.body.email, req.body.password);
        res.json(result);
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
}

exports.getProfile = async (req, res) => {
    try {
      const profile = await AuthService.getUserProfile(req.user.id);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
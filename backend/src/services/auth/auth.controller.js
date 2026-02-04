const authService = require("./auth.service");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await authService.registerUser(name, email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

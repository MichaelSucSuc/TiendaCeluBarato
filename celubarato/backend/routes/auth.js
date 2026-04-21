const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { ADMIN_EMAIL, ADMIN_PASSWORD_HASH } = require('../config/admin');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  let passwordHash = ADMIN_PASSWORD_HASH;
  const adminInDb = await Admin.findOne({ email: ADMIN_EMAIL });

  if (adminInDb) {
    passwordHash = adminInDb.passwordHash;
  }

  const isPasswordValid = await bcrypt.compare(password, passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { email: ADMIN_EMAIL, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' },
  );

  return res.json({
    token,
    admin: { email: ADMIN_EMAIL },
  });
});

module.exports = router;

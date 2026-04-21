require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const { ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_PASSWORD } = require('../config/admin');

async function initDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Admin.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      {
        email: ADMIN_EMAIL,
        passwordHash: ADMIN_PASSWORD_HASH,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    console.log('Base de datos inicializada.');
    console.log(`Admin email: ${ADMIN_EMAIL}`);
    console.log(`Admin password: ${ADMIN_PASSWORD}`);
    console.log(`Admin bcrypt hash: ${ADMIN_PASSWORD_HASH}`);
  } catch (error) {
    console.error('Error inicializando DB:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

initDb();

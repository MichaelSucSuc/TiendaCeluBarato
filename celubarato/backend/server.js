require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID inválido' });
  }

  return res.status(500).json({ message: 'Error interno del servidor' });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Servidor backend en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();

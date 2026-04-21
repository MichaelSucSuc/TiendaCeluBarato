const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await Product.find().sort({ fecha_creacion: -1 });
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  return res.json(product);
});

router.post('/', authMiddleware, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  return res.json(product);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  return res.status(204).send();
});

module.exports = router;

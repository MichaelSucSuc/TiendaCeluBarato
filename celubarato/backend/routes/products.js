const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

function validateObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return false;
  }

  return true;
}

router.get('/', async (_req, res) => {
  const products = await Product.find().sort({ fecha_creacion: -1 });
  res.json(products);
});

router.get('/:id', async (req, res) => {
  if (!validateObjectId(req.params.id, res)) {
    return;
  }

  const productId = new mongoose.Types.ObjectId(req.params.id);
  const product = await Product.findById(productId);

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
  if (!validateObjectId(req.params.id, res)) {
    return;
  }

  const productId = new mongoose.Types.ObjectId(req.params.id);
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  Object.assign(product, req.body);
  await product.save();

  return res.json(product);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  if (!validateObjectId(req.params.id, res)) {
    return;
  }

  const productId = new mongoose.Types.ObjectId(req.params.id);
  const product = await Product.findOneAndDelete({ _id: productId });

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  return res.status(204).send();
});

module.exports = router;

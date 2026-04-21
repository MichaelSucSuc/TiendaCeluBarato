const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['iphone', 'macbook'],
    required: true,
  },
  modelo: {
    type: String,
    required: true,
    trim: true,
  },
  capacidad: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  condicion: {
    type: String,
    enum: ['Mint', 'Good', 'Fair'],
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  precio_original: {
    type: Number,
    min: 0,
  },
  estado_verificado: {
    type: Boolean,
    default: true,
  },
  imagen_url: {
    type: String,
    required: true,
    trim: true,
  },
  especificaciones: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
});

productSchema.pre('validate', function generateSlug(next) {
  if (this.modelo && this.capacidad) {
    this.slug = slugify(`${this.modelo}-${this.capacidad}`, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch(() => setError('No se pudo cargar el producto.'));
  }, [id]);

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  if (!product) {
    return <p className="p-6 text-center">Cargando producto...</p>;
  }

  return (
    <main className="mx-auto w-full max-w-4xl p-4 md:p-6">
      <Link to="/" className="text-primary">← Volver</Link>
      <div className="mt-4 grid gap-6 rounded-xl bg-white p-4 shadow-md md:grid-cols-2 md:p-6">
        <img src={product.imagen_url} alt={product.modelo} className="h-72 w-full rounded-lg object-cover" />
        <div>
          <h1 className="text-2xl font-bold text-darkbg">{product.modelo}</h1>
          <p className="mt-1 text-textsecondary">{product.tipo} · {product.capacidad} · {product.color}</p>
          <p className="mt-1 text-textsecondary">Condición: {product.condicion}</p>
          {product.estado_verificado && (
            <span className="mt-3 inline-block rounded-full bg-secondary/20 px-3 py-1 text-sm">✅ Verificado</span>
          )}
          <div className="mt-4">
            {product.precio_original && <p className="text-textsecondary line-through">${product.precio_original}</p>}
            <p className="text-3xl font-bold text-accent">${product.precio}</p>
          </div>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-lightgray p-3 text-sm text-textmain">
{JSON.stringify(product.especificaciones || {}, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;

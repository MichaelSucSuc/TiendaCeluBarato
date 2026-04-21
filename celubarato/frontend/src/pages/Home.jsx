import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then((response) => setProducts(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-textsecondary">Cargando productos...</p>;
  }

  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-6">
      <header className="mb-6 rounded-xl bg-darkbg p-6 text-white">
        <h1 className="text-3xl font-bold">Celubarato</h1>
        <p className="mt-2 text-lightgray">iPhones y MacBooks usados/refurbished verificados</p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
      {products.length === 0 && (
        <p className="mt-8 text-center text-textsecondary">No hay productos disponibles por ahora.</p>
      )}
    </main>
  );
}

export default Home;

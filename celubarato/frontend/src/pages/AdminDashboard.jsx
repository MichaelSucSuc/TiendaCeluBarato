import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import api from '../services/api';

const initialForm = {
  tipo: 'iphone',
  modelo: '',
  capacidad: '',
  color: '',
  condicion: 'Mint',
  precio: '',
  precio_original: '',
  estado_verificado: true,
  imagen_url: '',
  especificaciones: '{}',
};

function AdminDashboard() {
  const { token, adminEmail, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setError('');
    } catch {
      setError('No se pudieron cargar los productos.');
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    api.get('/products')
      .then((response) => {
        if (mounted) {
          setProducts(response.data);
          setError('');
        }
      })
      .catch(() => {
        if (mounted) {
          setError('No se pudieron cargar los productos.');
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      precio: Number(form.precio),
      precio_original: form.precio_original ? Number(form.precio_original) : undefined,
      especificaciones: JSON.parse(form.especificaciones || '{}'),
    };

    if (editingId) {
      await api.put(`/products/${editingId}`, payload, authHeaders);
    } else {
      await api.post('/products', payload, authHeaders);
    }

    resetForm();
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      ...product,
      precio: String(product.precio),
      precio_original: product.precio_original ? String(product.precio_original) : '',
      especificaciones: JSON.stringify(product.especificaciones || {}, null, 2),
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`, authHeaders);
    fetchProducts();
  };

  return (
    <main className="mx-auto w-full max-w-6xl p-4 md:p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-darkbg p-4 text-white">
        <div>
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="text-sm text-lightgray">Sesión: {adminEmail}</p>
        </div>
        <button onClick={logout} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold">Cerrar sesión</button>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold">{editingId ? 'Editar producto' : 'Nuevo producto'}</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {[
              ['modelo', 'Modelo'],
              ['capacidad', 'Capacidad'],
              ['color', 'Color'],
              ['imagen_url', 'URL de imagen'],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="text-sm font-medium">{label}</label>
                <input
                  required
                  value={form[key]}
                  onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
                  className="mt-1 w-full rounded-lg border p-2"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Tipo</label>
                <select
                  className="mt-1 w-full rounded-lg border p-2"
                  value={form.tipo}
                  onChange={(event) => setForm((prev) => ({ ...prev, tipo: event.target.value }))}
                >
                  <option value="iphone">iPhone</option>
                  <option value="macbook">MacBook</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Condición</label>
                <select
                  className="mt-1 w-full rounded-lg border p-2"
                  value={form.condicion}
                  onChange={(event) => setForm((prev) => ({ ...prev, condicion: event.target.value }))}
                >
                  <option value="Mint">Mint</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Precio</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={form.precio}
                  onChange={(event) => setForm((prev) => ({ ...prev, precio: event.target.value }))}
                  className="mt-1 w-full rounded-lg border p-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Precio original</label>
                <input
                  type="number"
                  min="0"
                  value={form.precio_original}
                  onChange={(event) => setForm((prev) => ({ ...prev, precio_original: event.target.value }))}
                  className="mt-1 w-full rounded-lg border p-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Especificaciones (JSON)</label>
              <textarea
                rows="4"
                value={form.especificaciones}
                onChange={(event) => setForm((prev) => ({ ...prev, especificaciones: event.target.value }))}
                className="mt-1 w-full rounded-lg border p-2"
              />
            </div>

            <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white">
              {editingId ? 'Guardar cambios' : 'Crear producto'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="w-full rounded-lg border px-4 py-2 font-semibold">
                Cancelar edición
              </button>
            )}
          </form>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold">Productos</h2>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <ul className="mt-4 space-y-3">
            {products.map((product) => (
              <li key={product._id} className="rounded-lg border p-3">
                <p className="font-semibold">{product.modelo}</p>
                <p className="text-sm text-textsecondary">${product.precio} · {product.capacidad}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => handleEdit(product)} className="rounded bg-primary px-3 py-1 text-sm text-white">Editar</button>
                  <button onClick={() => handleDelete(product._id)} className="rounded bg-red-600 px-3 py-1 text-sm text-white">Eliminar</button>
                </div>
              </li>
            ))}
            {products.length === 0 && <p className="text-sm text-textsecondary">Sin productos cargados.</p>}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import api from '../services/api';

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', form);
      login(response.data.token, response.data.admin.email);
      navigate('/admin/dashboard');
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center p-4">
      <form onSubmit={handleSubmit} className="w-full rounded-xl bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-darkbg">Admin Login</h1>
        <p className="mt-1 text-sm text-textsecondary">Solo para administrador de Celubarato</p>

        <label className="mt-4 block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          className="mt-1 w-full rounded-lg border p-2"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />

        <label className="mt-4 block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          required
          className="mt-1 w-full rounded-lg border p-2"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button type="submit" className="mt-5 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white">Ingresar</button>
      </form>
    </main>
  );
}

export default AdminLogin;

import { useMemo, useState } from 'react';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [adminEmail, setAdminEmail] = useState(() => localStorage.getItem('admin_email'));

  const login = (nextToken, email) => {
    localStorage.setItem('admin_token', nextToken);
    localStorage.setItem('admin_email', email);
    setToken(nextToken);
    setAdminEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setToken(null);
    setAdminEmail(null);
  };

  const value = useMemo(
    () => ({
      token,
      adminEmail,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, adminEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

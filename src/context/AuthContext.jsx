import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === 'user' && password === 'user') {
      setUser({ username });
      toast.success('Successfully logged in!');
      return true;
    }
    toast.error('Invalid credentials!');
    return false;
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/axios';

export interface User {
  id: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>; // было: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const persistSession = (accessToken: string, userData: User) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const fetchUserProfile = async () => {
    try {
      const { data } = await api.get<User>('/users/me');
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch {
      logout();
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        await fetchUserProfile();
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (phone: string, password: string) => {
    const { data } = await api.post('/auth/login', { phone, password });
    persistSession(data.accessToken, data.user);
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    const { data } = await api.post('/auth/register', { firstName, lastName, email, phone, password });
    persistSession(data.accessToken, data.user);
  };

  const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch {
    // даже если бэкенд недоступен/токен уже невалиден — всё равно чистим локальную сессию
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
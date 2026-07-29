import React, { createContext, useContext, useState, useEffect } from 'react';

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
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Вспомогательная функция загрузки профиля по токену
  const fetchUserProfile = async (authToken: string) => {
    try {
      // Проверь этот путь! В NestJS часто бывает /auth/profile или /users/me
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      } else {
        // Если токен протух или невалиден
        logout();
      }
    } catch (err) {
      console.error('Ошибка получения профиля:', err);
    }
    return null;
  };

  // Проверка авторизации при старте приложения
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        await fetchUserProfile(savedToken);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (phone: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Ошибка при входе');
    }

    const authToken = data.accessToken || data.token;
    localStorage.setItem('token', authToken);
     localStorage.setItem('refreshToken', data.refreshToken);
    setToken(authToken);

    // Если бэкенд вернул юзера — берем его, иначе запрашиваем с сервера /users/me
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      await fetchUserProfile(authToken);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Ошибка при регистрации');
    }

    const authToken = data.access_token || data.token;
    localStorage.setItem('token', authToken);
     localStorage.setItem('refreshToken', data.refreshToken);
    setToken(authToken);

    if (data.user) {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      await fetchUserProfile(authToken);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
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
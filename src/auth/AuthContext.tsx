import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'mariamman_auth_user';

export const DEFAULT_USER: User = {
  id: 'USR-777',
  name: 'Mohan Kumar',
  email: 'mohan@mariammantravels.com',
  phone: '+91 98421 23456',
  loyaltyPoints: 450,
  memberSince: '2024',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Initialize default active traveler session so all website pages & navigations load immediately
        setUser(DEFAULT_USER);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER));
      }
    } catch (e) {
      console.error('Failed to parse stored auth user', e);
      setUser(DEFAULT_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrPhone: string, _password?: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const name = emailOrPhone.includes('@')
      ? emailOrPhone.split('@')[0].replace(/[._]/g, ' ')
      : 'Mohan Kumar';

    const cleanName = name.charAt(0).toUpperCase() + name.slice(1);

    const loggedInUser: User = {
      id: 'USR-' + Math.floor(100000 + Math.random() * 900000),
      name: cleanName || 'Mohan Kumar',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'mohan@mariammantravels.com',
      phone: emailOrPhone.includes('@') ? '+91 98421 23456' : emailOrPhone,
      loyaltyPoints: 450,
      memberSince: '2024',
    };

    setUser(loggedInUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
    return true;
  };

  const register = async (name: string, email: string, phone: string, _password?: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const newUser: User = {
      id: 'USR-' + Math.floor(100000 + Math.random() * 900000),
      name: name.trim() || 'Mohan Kumar',
      email: email.trim() || 'mohan@mariammantravels.com',
      phone: phone.trim() || '+91 98421 23456',
      loyaltyPoints: 100,
      memberSince: new Date().getFullYear().toString(),
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

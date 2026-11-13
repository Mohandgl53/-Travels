import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatedAuth } from '../experiences/animated-auth/AnimatedAuth';
import { WebsiteLayout } from '../website/layout/WebsiteLayout';
import { Home } from '../website/pages/Home';
import { SearchBuses } from '../website/pages/SearchBuses';
import { MyBookings } from '../website/pages/MyBookings';
import { Destinations } from '../website/pages/Destinations';
import { About } from '../website/pages/About';
import { Contact } from '../website/pages/Contact';
import { Account } from '../website/pages/Account';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { useAuth } from '../auth/AuthContext';

export const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase font-bold tracking-widest text-rose-400">Loading Application...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* 1. Animated Authentication Experience Route Group */}
      <Route path="/login" element={<AnimatedAuth initialMode="login" />} />
      <Route path="/register" element={<AnimatedAuth initialMode="register" />} />

      {/* 2. Independent Travel Booking Website Route Group (Protected) */}
      <Route
        element={
          <ProtectedRoute>
            <WebsiteLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchBuses />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
      </Route>

      {/* Root redirect: if logged in go to /home, else /login */}
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? '/home' : '/login'} replace />
        }
      />

      {/* 404 Wildcard Fallback */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? '/home' : '/login'} replace />
        }
      />
    </Routes>
  );
};


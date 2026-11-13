import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const WebsiteLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

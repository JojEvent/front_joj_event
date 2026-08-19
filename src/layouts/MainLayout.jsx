import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../composants/header';
import Footer from '../composants/footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

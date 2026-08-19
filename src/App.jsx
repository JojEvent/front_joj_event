import React from "react";
import Header from "./composants/header";
import Footer from "./composants/footer";
import { Outlet } from "react-router-dom";

const App = () => {
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

export default App;

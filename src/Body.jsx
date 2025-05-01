import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          {/* Your main content here */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Body;

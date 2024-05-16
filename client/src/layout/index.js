import React from "react";
import logo from "../assets/logo.png"
const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="flex justify-around items-center py-3 h-30 shadow-md bg-black/80">
       <img src={logo}
       alt="logo"
       width={120}
       height={60}/>
       <div className="text-white text-lg font-semibold">
        <h3>Chat App</h3>
       </div>

      </header>
      {children}
    </>
  );
};

export default AuthLayouts;

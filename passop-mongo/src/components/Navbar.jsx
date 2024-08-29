import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          <span>Lock</span>
          <span className="text-green-700">Quill/&gt;</span>
        </div>
        <button className="flex items-center gap-2 bg-green-700 py-1 p-1 rounded-full">
        <img className="w-10 " src="/Icons/github.svg" alt="github-logo"></img>
        <span className="font-bold px-2">GitHub</span></button>
        </div>
    </nav>
  );
};

export default Navbar;

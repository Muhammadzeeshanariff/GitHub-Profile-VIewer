import React from "react";

const Logo = () => {
  return (
    <div>
      <div className="flex  justify-center items-center  bg-slate-950 py-4 ">
        <a href="/">
          <img
            src="https://img.icons8.com/?size=100&id=LoL4bFzqmAa0&format=png&color=000000"
            className="w-24 rounded-full"
            alt="Logo"
          />
        </a>
        <h1 className="text-4xl text-white font-extrabold px-2">
          GitHub Profile Viewer
        </h1>
      </div>{" "}
    </div>
  );
};

export default Logo;

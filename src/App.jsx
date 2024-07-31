import React from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./routes/Detail";
import Home from "./routes/Home";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-l from-indigo-950 from-10% via-sky-800 via-40% to-indigo-950 to-90% ...">
      <div className=" text-gray-400 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

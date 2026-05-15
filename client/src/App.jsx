import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
     <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/markets" element={<h1 className="p-10">Markets Page</h1>} />
          <Route path="/portfolio" element={<h1 className="p-10">Portfolio Page</h1>} />
          <Route path="/charts" element={<h1 className="p-10">Charts Page</h1>} />
          <Route path="/news" element={<h1 className="p-10">News Page</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

//pages && components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

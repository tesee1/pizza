import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/Not-found";
import Cart from "./pages/Cart";
import FullPizza from "./components/fullPizza";

function App() {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/pizza/:id" element={<FullPizza />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;

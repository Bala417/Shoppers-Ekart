import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Home from "./Pages/Home";
import Product from "./Pages/product/Product";
import CartPage from "./Pages/CartPage/CartPage";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/cartPage" element={<CartPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

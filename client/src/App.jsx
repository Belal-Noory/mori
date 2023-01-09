import Product from "./pages/Product";
import Home from "./pages/Home";
import NewProduct from "./components/NewProduct";
import Login from "./pages/Login";
import Register from "./pages/Register"
import {
  Route,
  Routes
} from "react-router-dom";

const App = () => {
  return <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/new" element={<NewProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>;
};

export default App;
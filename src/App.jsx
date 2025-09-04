import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Books from "./pages/Books";
import Bills from "./pages/Bills";
import Bookshop from "./pages/BookShop";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/bookshop" element={<Bookshop />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/customer"
          element={
            <Layout>
              <Customer />
            </Layout>
          }
        />
        <Route
          path="/books"
          element={
            <Layout>
              <Books />
            </Layout>
          }
        />
        <Route
          path="/bills"
          element={
            <Layout>
              <Bills />
            </Layout>
          }
        />

           <Route
          path="/help"
          element={
            <Layout>
              <Help />
            </Layout>
          }
        />
      
      </Routes>
    </Router>
  );
}

export default App;

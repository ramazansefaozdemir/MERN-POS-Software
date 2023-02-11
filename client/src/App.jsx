import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BillPage from "./pages/BillPage";
import CartPage from "./pages/CartPage";
import CustomerPage from "./pages/CustomerPage";
import HomePage from "./pages/HomePage";
import StatisticPage from "./pages/StatisticPage";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouterControl>
              <HomePage />
            </RouterControl>
          }
        />
        <Route
          path="/cart"
          element={
            <RouterControl>
              <CartPage />
            </RouterControl>
          }
        />
        <Route
          path="/bills"
          element={
            <RouterControl>
              <BillPage />
            </RouterControl>
          }
        />
        <Route
          path="/customers"
          element={
            <RouterControl>
              <CustomerPage />
            </RouterControl>
          }
        />
        <Route
          path="/statistic"
          element={
            <RouterControl>
              <StatisticPage />
            </RouterControl>
          }
        />
        <Route
          path="/products"
          element={
            <RouterControl>
              <ProductPage />
            </RouterControl>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouterControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

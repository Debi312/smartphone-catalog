import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PhoneDetailPage } from "./pages/PhoneDetailPage";
import { CartPage } from "./pages/CartPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phone/:id" element={<PhoneDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  )
}


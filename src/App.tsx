import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { PhoneDetailPage } from "./pages/PhoneDetailPage"
import { CartPage } from "./pages/CartPage"
import { Layout } from "./components/Layout"

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<PhoneDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  )
}

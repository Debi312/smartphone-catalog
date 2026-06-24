import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export function Layout() {
  return (
    <div className="p-4 md:p-6 xl:p-12 min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}

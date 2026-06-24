import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export function Layout() {
  return (
    <div className="xl:p-10">
      <Header />
      <Outlet />
    </div>
  )
}

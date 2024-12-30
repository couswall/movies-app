import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "../ui/components"

export const Layout = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        
        <main>
            <Outlet/>
        </main>

        <Footer/>
      </div>
    </>
  )
}

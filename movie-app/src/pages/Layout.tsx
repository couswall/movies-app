import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "../ui/components"

export const Layout = () => {
  return (
    <>
        <Navbar/>
        
        <main>
            <Outlet/>
        </main>

        <Footer/>
    </>
  )
}

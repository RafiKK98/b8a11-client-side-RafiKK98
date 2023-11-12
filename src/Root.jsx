import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import { AnimatePresence } from "framer-motion"

function Root() {

    return (
        <AnimatePresence>
            <div className="max-w-7xl mx-auto">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </AnimatePresence>
    )
}

export default Root

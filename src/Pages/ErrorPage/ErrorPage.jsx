import { motion } from "framer-motion"
import Navbar from "../../Components/Navbar"
import Footer from "../../Components/Footer"
import error404 from "/error404.png";

const ErrorPage = () => {
    return (
        <motion.div
            className="max-w-7xl mx-auto"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <Navbar />
            <section>
                <img src={error404} alt="" />
            </section>
            <Footer />
        </motion.div>
    )
}

export default ErrorPage
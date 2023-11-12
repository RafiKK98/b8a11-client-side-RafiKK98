import Banner from "../../Components/Banner"
import Feature from "../../Components/Feature"
import { motion } from "framer-motion"
import Faq from "../../Components/Faq"

const Home = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <Banner />
            <Feature />
            <Faq />
        </motion.div>
    )
}

export default Home
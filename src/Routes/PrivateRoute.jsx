import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import { Navigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { user, loading} = useContext(AuthContext);

    if (loading) {
        return <>
            <Skeleton count={10}></Skeleton>
        </>
    }

    if (user) {
        return children
    }

    return (
        <Navigate to="/login"></Navigate>
    )
}

export default PrivateRoute
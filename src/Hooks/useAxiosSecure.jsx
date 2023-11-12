import axios from "axios"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://online-group-study-app-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=> {
        axiosSecure.interceptors.response.use(response => {
            return response
        }, error => {
            console.log('Error tracked in the interceptor: ', error);
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('logout the user');
                logOut()
                    .then(() =>{
                        navigate('/login')
                    })
                    .catch( error => console.log(error))
            }
        })
    }, [logOut, navigate])

    return axiosSecure;
}

export default useAxiosSecure
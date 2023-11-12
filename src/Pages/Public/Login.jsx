import { useContext } from "react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { motion } from "framer-motion";


const Login = () => {

    const { setUser, signIn, socialLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const LoginToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({
            icon: 'success',
            title: 'Logged in successfully!'
        });
    }

    const handleLogin = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signIn(email, password)
        .then(result => {
            LoginToast();
            setUser(result.user);
            console.log('User logged in!');
            console.log(result.user);
            navigate('/');
        })
        .catch(error => {
            console.error(`Error: ${error.code}, ${error.message}`);
        })
    }

    const handleGoogleLogin = () => {
        socialLogin('google')
        .then(result => {
            LoginToast();
            console.log(result.user);
            setUser(result.user);
            navigate('/');
        })
        .catch(error => {
            console.error(`Error: ${error.code}, ${error.message}`);
        })
    }
    
    const handleGithubLogin = () => {
        socialLogin('github')
        .then(result => {
            LoginToast();
            console.log(result.user);
            setUser(result.user);
            navigate('/');
        })
        .catch(error => {
            console.warn(`Error: ${error.code}, ${error.message}`);
        })
    }
    
    return (
        <motion.div 
            className="bg-base-400 py-10"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.25}}
        >
            <h3 className="text-3xl text-center">Welcome back!</h3>
            <form onSubmit={handleLogin} className="my-10">
                <div className="max-w-[32.5%] mx-auto grid grid-cols-1 gap-10">
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name:</span>
                        </label>
                        <input type="text" name="name" placeholder="Your name" className="input input-bordered w-full" />
                    </div> */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email:</span>
                        </label>
                        <input type="email" name="email" placeholder="Your email" className="input input-bordered w-full" />
                    </div>
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL:</span>
                        </label>
                        <input type="text" name="photoUrl" placeholder="Your photo URL" className="input input-bordered w-full" />
                    </div> */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password:</span>
                        </label>
                        <input type="password" name="password" placeholder="Your password" className="input input-bordered w-full" />
                    </div>
                    <input type="submit" value="Login" className="btn btn-block btn-outline" />
                </div>
                <div className="text-center text-xl my-10">
                    <span className="">Or you can login with: </span>
                    <button onClick={handleGoogleLogin} className="btn mx-4 px-6"><BsGoogle className="text-lg"/></button>
                    <button onClick={handleGithubLogin} className="btn mx-4 px-6"><BsGithub className="text-lg"/></button>
                </div>
                <div className="text-center text-xl my-10">
                    New user? Please <Link to="/register" className="link">Register</Link>
                </div>
            </form>
        </motion.div>
    )
}

export default Login
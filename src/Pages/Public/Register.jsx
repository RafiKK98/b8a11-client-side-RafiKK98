import { useContext } from "react"
import { BsGithub, BsGoogle } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../Providers/AuthProvider"
import Swal from "sweetalert2"
import { updateProfile } from "firebase/auth"
import { motion } from "framer-motion"


const Register = () => {

    const { setUser, createUser, socialLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const RegisterToast = () => {
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
            title: 'Registered successfully!'
        });
    }

    const handleRegister = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const photoUrl = event.target.photoUrl.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, photoUrl, email, password);
        createUser(email, password)
        .then(result => {
            updateProfile(result.user, {
                displayName: name,
                photoURL: photoUrl,
            })
            .then(result => {
                RegisterToast();
                console.log('User registered!');
                console.log(result.user);
                setUser(result.user);
                navigate('/');
            })
            .catch(error => {
                console.error(`Error: ${error.code}, ${error.message}`);
            })
        })
        .catch(error => {
            console.error(`Error: ${error.code}, ${error.message}`);
        })
    }

    const handleGoogleLogin = () => {
        socialLogin('google')
        .then(result => {
            RegisterToast();
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
            RegisterToast();
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
            <h3 className="text-3xl text-center">Welcome!</h3>
            <form onSubmit={handleRegister} className="my-10">
                <div className="max-w-[65%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name:</span>
                        </label>
                        <input type="text" name="name" placeholder="Your name" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email:</span>
                        </label>
                        <input type="email" name="email" placeholder="Your email" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL:</span>
                        </label>
                        <input type="text" name="photoUrl" placeholder="Your photo URL" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password:</span>
                        </label>
                        <input type="password" name="password" placeholder="Your password" className="input input-bordered w-full" />
                    </div>
                    <input type="submit" value="Register" className="btn lg:col-span-2 btn-block btn-outline" />
                </div>
                <div className="text-center text-xl my-10">
                    <span className="">Or you can login with: </span>
                    <button onClick={handleGoogleLogin} className="btn mx-4 px-6"><BsGoogle className="text-lg"/></button>
                    <button onClick={handleGithubLogin} className="btn mx-4 px-6"><BsGithub className="text-lg"/></button>
                </div>
                <div className="text-center text-xl my-10">
                    Already have an account? Please <Link to="/login" className="link">Login</Link>
                </div>
            </form>
        </motion.div>
    )
}

export default Register
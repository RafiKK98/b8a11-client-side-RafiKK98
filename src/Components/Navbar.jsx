import { useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../Providers/AuthProvider"
import Swal from "sweetalert2";
import logoIcon from "../../public/logo-icon.png";

const Navbar = () => {

    const { user, setUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
        .then(result => {
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
            })
            Toast.fire({
                icon: 'success',
                title: 'Logged out successfully!'
            });
            console.log(`User logged out!`);
            console.log(result);
            setUser(null);
            navigate('/login');
        })
        .catch(error => {
            console.error(`Error: ${error.code}, ${error.message}`);
        })
    }

    const navLinks = user ? (
        <>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/allAssignments"}>Assignments</NavLink></li>
            <li><NavLink to={"/createAssignment"}>Create Assignment</NavLink></li>
            <li><NavLink to={"/myAssignments"}>My Assignments</NavLink></li>
            <li><NavLink to={"/submittedAssignments"}>Submitted Assignment</NavLink></li>
        </>
    ) : (
        <>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/allAssignments"}>Assignments</NavLink></li>
            <li><NavLink to={"/login"}>Login</NavLink></li>
            <li><NavLink to={"/register"}>Register</NavLink></li>
        </>
    )

    return (
        <div className="navbar bg-base-300 py-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {
                        navLinks
                    }
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <figure className="w-12 h-12">
                        <img src={logoIcon} className="w-full h-full"  alt="" />
                    </figure>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {
                    navLinks
                }
                </ul>
            </div>
            <div className="navbar-end">
                <label className="btn btn-ghost btn-circle avatar mr-3">
                    <div className="w-10 rounded-full">
                        {
                            user ? 
                                <div className="tooltip tooltip-open" data-tip={user.displayName}>
                                    <img src={user.photoURL} />
                                </div>
                            : 
                            <></>
                        }
                    </div>
                </label>
                {
                    user ? 
                    <NavLink onClick={handleLogout} className="btn btn-outline">Logout</NavLink>
                    :
                    <NavLink to="/login" className="btn btn-outline">Login</NavLink>
                }
            </div>
        </div>
    )
}

export default Navbar
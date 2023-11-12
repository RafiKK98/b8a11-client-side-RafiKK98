import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const socialLogin = social => {
        setLoading(true);
        switch (social) {
            case 'google':
                return signInWithPopup(auth, googleProvider)     
            case 'github':
                return signInWithPopup(auth, githubProvider)
            default:
                break;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(`User in the auth state changed: ${currentUser}`);
            const userEmail = currentUser?.email || user.email;
            const loggedUser = { email: userEmail};
            setUser(currentUser);
            if (currentUser) {
                
                axios.post('https://online-group-study-app-server.vercel.app/jwt' , loggedUser, { withCredentials: true})
                .then(response => {
                    console.log('Token response: ', response.data);
                })
            } else {
                axios.post('https://online-group-study-app-server.vercel.app/logout' , loggedUser, { withCredentials: true})
                .then(response => {
                    console.log('Token response: ', response.data);
                })
            }
            setLoading(false)
        });

        return () => unsubscribe();
    }, [user?.email])

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        setUser,
        createUser,
        signIn,
        socialLogin,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider
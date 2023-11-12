import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import PrivateRoute from "../Routes/PrivateRoute";
import Home from "../Pages/Public/Home";
import Login from "../Pages/Public/Login";
import Register from "../Pages/Public/Register";
import AllAssignments from "../Pages/Public/AllAssignments";
import CreateAssignment from "../Pages/Private/CreateAssignment";
import UpdateAssignment from "../Pages/Private/UpdateAssignment";
import SingleAssignment from "../Pages/Private/SingleAssignment";
import MyAssignments from "../Pages/Private/MyAssignments"
import SubmittedAssignment from "../Pages/Private/SubmittedAssignment"
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/allAssignments',
                element: <AllAssignments></AllAssignments>,
                // loader: () => fetch('https://online-group-study-app-server.vercel.app/assignments')
            },
            {
                path: '/createAssignment',
                element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
            },
            {
                path: '/updateAssignment/:id',
                element: <PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
                loader: ({params}) => fetch(`https://online-group-study-app-server.vercel.app/assignments/${params.id}`)
            },
            {
                path: '/singleAssignment/:id',
                element: <PrivateRoute><SingleAssignment></SingleAssignment></PrivateRoute>,
                loader: ({params}) => fetch(`https://online-group-study-app-server.vercel.app/assignments/${params.id}`)
            },
            {
                path: '/myAssignments',
                element: <PrivateRoute><MyAssignments></MyAssignments></PrivateRoute>
            },
            {
                path: '/submittedAssignments',
                element: <PrivateRoute><SubmittedAssignment></SubmittedAssignment></PrivateRoute>,
                // loader: () => fetch(`https://online-group-study-app-server.vercel.app/submittedAssignments`)
            },
        ],
        errorElement: <ErrorPage></ErrorPage>
    },
]);

export default router;
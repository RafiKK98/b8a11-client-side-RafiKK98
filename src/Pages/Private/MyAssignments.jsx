import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Providers/AuthProvider"
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyAssignments = () => {

    const { user } = useContext(AuthContext);
    const [ myAssignments, setMyAssignments ] = useState([]);
    const [loadingState, setLoadingState] = useState(true);
    const axiosSecure = useAxiosSecure();

    // const url = `https://online-group-study-app-server.vercel.app/my-assignments?email=${user?.email}`;
    const url = `/my-assignments?email=${user?.email}`;

    useEffect(()=>{
        // fetch(url)
        // .then(res => res.json())
        // .then(data => {
        //     setLoadingState(false);
        //     setMyAssignments(data);
        // });
        axiosSecure.get(url)
        .then(res => {
            setLoadingState(false);
            setMyAssignments(res.data);
        })
    }, [url, axiosSecure])
    

    return (
        <motion.div 
            className="py-10"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <h3 className="text-5xl text-center mb-10">My Assignments</h3>
            {/* <div className="grid grid-cols-1 gap-5 justify-items-center my-10">
                {
                    myAssignments.map(assignment => (
                        <div key={assignment._id} className="card card-side w-full bg-base-100 shadow-xl">
                            <figure className="h-96">
                                <img src={assignment.photoUrl} className="w-full h-full" alt="Assignment Thumbnail" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{assignment.title}</h2>
                                <p>Difficulty: {assignment.difficulty.at(0).toUpperCase() + assignment.difficulty.slice(1)}</p>
                                <p>Description: {assignment.description}</p>
                                <p>Marks: {assignment.score} / {assignment.marks} </p>
                                <p>Status: {assignment.status}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div> */}
            {
                loadingState ? 
                <Bars
                    height="80"
                    width="80"
                    color="rgb(43, 52, 64)"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass="mx-auto"
                    visible={true}
                />
                :
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='text-xl'>
                            <tr>
                                <th>
                                    <label>
                                        Serial
                                    </label>
                                </th>
                                <th>Thumbnail & Title</th>
                                <th>Difficulty</th>
                                <th>Total Marks</th>
                                <th>Status</th>
                                <th>Answer</th>
                                <th>Note</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                            {
                                myAssignments.map((assignment, idx) => (
                                    <tr key={assignment._id} className={`hover`}>
                                        <th className='text-base'>
                                            <label>
                                                <span>{idx + 1}</span>
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-16 h-16">
                                                        <img src={assignment.photoUrl} alt="assignment thumbnail" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{assignment.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={assignment.difficulty.toLowerCase() == 'easy' ? 'text-green-600' : assignment.difficulty.toLowerCase() == 'medium' ? 'text-orange-300' : 'text-red-600'}>
                                            {assignment.difficulty.at(0).toUpperCase() + assignment.difficulty.slice(1)}
                                        </td>
                                        <td>
                                            {assignment?.score} / {assignment.marks} 
                                        </td>
                                        <td className={assignment.status.toLowerCase() == 'completed' ? 'text-green-600' : 'text-orange-400'}>
                                            {assignment.status} 
                                        </td>
                                        <td>
                                            <span className='hover:cursor-pointer' onClick={() => {
                                                Swal.fire({
                                                    title: 'Answer link',
                                                    text: assignment.answerText,
                                                })
                                            }}>
                                                {assignment.answerText.slice(0, 20) + '...'} 
                                            </span>
                                        </td>
                                        <td>
                                            {assignment?.noteText} 
                                        </td>
                                        <td>
                                            {/* <button className="btn" onClick={() => {
                                                console.log(assignment._id)
                                                if(assignment.status.toLowerCase() == 'completed') {
                                                    Swal.fire('You cannot mark an already marked assignment!', '', 'error');
                                                    return;
                                                }
                                                handleMarkAssignment(assignment);
                                            }}> Give Mark </button> */}
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            }
        </motion.div>
    )
}

export default MyAssignments
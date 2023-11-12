import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const AllAssignments = () => {

    const [allAssignments, setAllAssignments] = useState([]);
    const [loadingState, setLoadingState] = useState(true);

    useEffect(()=> {
        fetch('https://online-group-study-app-server.vercel.app/assignments')
        .then(res => res.json())
        .then(data => {
            setLoadingState(false);
            setAllAssignments(data);
        })
    }, [])

    return (
        <motion.div 
            className="py-10"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <h3 className="text-5xl text-center mb-10">Available Assignments</h3>
            {
                loadingState ? 
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
                :
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center my-10">
                {
                    allAssignments.map(assignment => (
                        <div key={assignment._id} className="card card-side h-80 w-full bg-base-100 shadow-xl">
                            <figure className="w-1/2 h-full">
                                <img src={assignment.photoUrl} alt="Assignment Thumbnail" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl font-semibold">{assignment.title}</h2>
                                <p className="text-lg font-medium">
                                    <span className="mr-2">
                                        Difficulty:
                                    </span> 
                                    <span className={assignment.difficulty.toLowerCase() == 'easy' ? 'text-green-600' : assignment.difficulty.toLowerCase() == 'medium' ? 'text-orange-300' : 'text-red-600'}>
                                        {assignment.difficulty.at(0).toUpperCase() + assignment.difficulty.slice(1)}
                                    </span>
                                </p>
                                <p className="text-lg font-medium">Total marks: {assignment.marks}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/singleAssignment/${assignment._id}`} className="btn btn-neutral">View</Link>
                                    <Link to={`/updateAssignment/${assignment._id}`} className="btn btn-neutral">Update</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            }
        </motion.div>
    )
}

export default AllAssignments
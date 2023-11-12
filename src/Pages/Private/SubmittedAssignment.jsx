import '@react-pdf-viewer/core/lib/styles/index.css';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hourglass } from 'react-loader-spinner';


const SubmittedAssignment = () => {

    // const submittedAssignments = useLoaderData();
    const [submittedAssignments, setSubmittedAssignments] = useState([]);
    const [loadingState, setLoadingState] = useState(true);
    

    useEffect(() => {
        fetch('https://online-group-study-app-server.vercel.app/submittedAssignments')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLoadingState(false);
            setSubmittedAssignments(data);
        })
    }, [])

    const handleMarkAssignment = async (assignment) => {
        const { value: formValues } = await Swal.fire({
            title: "Mark assignment",
            html: `
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Score:</span>
                </label>
                <input id="swal-input1" class="swal2-input" placeholder="score">
                </div>
                <label className="label">
                    <span className="label-text">Feedback:</span>
                </label>
                <input id="swal-input2" class="swal2-input" placeholder="feedback">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value
                ];
            }
        });
        if (formValues) {
            console.log(formValues);
            console.log(assignment);
            // Swal.fire(JSON.stringify(formValues));
            if (parseFloat(formValues[0]) <= assignment.marks) {
                fetch(`https://online-group-study-app-server.vercel.app/submittedAssignments/${assignment._id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'Completed', score: formValues[0], feedback: formValues[1] })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    Swal.fire('You have marked this assignment!', '', 'success');
                })
            } else {
                Swal.fire('You cannot mark an assignment higher than the top score!', '', 'error');
                return;
            }
        }
        // console.log(id);
        
    }

    return (
        <motion.div 
            className="py-10"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <h3 className="text-5xl text-center mb-10">Total submitted assignments: {submittedAssignments.length}</h3>
            {
                loadingState ? 
                <div className='mx-auto'>
                    <Hourglass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['rgb(43, 52, 64)', 'rgb(43, 52, 64)']}
                    />
                </div>
                :
                <div className="overflow-x-auto">
                <table className="table sm:table-sm md:table-md lg:table-lg">
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
                            submittedAssignments.map((assignment, idx) => (
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
                                        {assignment.score} / {assignment.marks} 
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
                                        {assignment.noteText} 
                                    </td>
                                    <td>
                                        <button className="btn btn-neutral" onClick={() => {
                                            console.log(assignment._id)
                                            if(assignment.status.toLowerCase() == 'completed') {
                                                Swal.fire('You cannot mark an already marked assignment!', '', 'error');
                                                return;
                                            }
                                            handleMarkAssignment(assignment);
                                        }}> Give Mark </button>
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

export default SubmittedAssignment
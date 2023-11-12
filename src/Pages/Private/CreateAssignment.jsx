import { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const CreateAssignment = () => {

    const { user } = useContext(AuthContext);
    const [ startDate, setStartDate ] = useState(new Date());

    const handleCreateAssignment = event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const title = form.get('title');
        const description = form.get('description');
        const marks = form.get('marks');
        const photoUrl = form.get('photoUrl');
        const difficulty = form.get('difficulty');
        const dueDate = form.get('dueDate');
        const createdBy = user.email;
        const newAssignment = { title, description, marks, photoUrl, difficulty, dueDate, createdBy }
        
        Swal.fire({
            title: 'Do you want to create this assignment?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: 'green',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Assignment created!', '', 'success')
                console.log(newAssignment);
                fetch('https://online-group-study-app-server.vercel.app/assignments', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(newAssignment)
                })
                .then(res => res.json())
                .then(data => console.log(data))
            }
        })
    }

    return (
        <motion.div 
            className="bg-base-400 py-10"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h3 className="text-5xl text-center">Create Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="my-10">
                <div className="max-w-[65%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="form-control lg:col-span-2">
                        <label className="label">
                            <span className="label-text">Title:</span>
                        </label>
                        <input type="text" name="title" placeholder="Assignment title" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control lg:col-span-2">
                        <label className="label">
                            <span className="label-text">Description:</span>
                        </label>
                        <textarea className="textarea textarea-bordered" name="description" placeholder="Description"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Marks:</span>
                        </label>
                        <input type="text" name="marks" placeholder="Marks" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL:</span>
                        </label>
                        <input type="text" name="photoUrl" placeholder="Image URL" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Difficulty:</span>
                        </label>
                        <select className="select select-bordered w-full" name="difficulty">
                            <option disabled selected>Select Difficulty</option>
                            <option value={`Easy`}>Easy</option>
                            <option value={`Medium`}>Medium</option>
                            <option value={`Hard`}>Hard</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Date:</span>
                        </label>
                        <ReactDatePicker 
                            name="dueDate" 
                            selected={startDate} 
                            onChange={(date) => {setStartDate(date)}} 
                            className="input input-bordered w-full" 
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 48 48"
                                >
                                    <mask id="ipSApplication0">
                                        <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                        <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                        <path
                                            fill="#fff"
                                            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                        ></path>
                                        </g>
                                    </mask>
                                    <path
                                        fill="currentColor"
                                        d="M0 0h48v48H0z"
                                        mask="url(#ipSApplication0)"
                                    ></path>
                                </svg>
                            }
                        />
                    </div>
                    <input type="submit" value="Create Assignment" className="btn lg:col-span-2 btn-block btn-outline rounded-lg" />
                </div>
            </form>
        </motion.div>
    )
}

export default CreateAssignment
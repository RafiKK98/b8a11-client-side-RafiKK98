import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const SingleAssignment = () => {

    const { user } = useContext(AuthContext);
    const currentAssignment = useLoaderData();
    const { _id, title, description, difficulty, marks, photoUrl, dueDate, createdBy } = currentAssignment;
    const navigate = useNavigate();
    // const [pdfFile, setPdfFile] = useState(null);
    // const [pdfError, setPdfError] = useState('');


    // const allowedFiles = ['application/pdf']

    // const handleFile = e => {
    //     let selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         if (selectedFile && allowedFiles.includes(selectedFile.type)) {
    //             let reader = new FileReader();
    //             reader.readAsDataURL(selectedFile);
    //             reader.onloadend = e => {
    //                 setPdfError('');
    //                 setPdfFile(e.target.result);
    //                 // console.log(e.target.result);
    //             }
    //         } else {
    //             setPdfError('Not a valid file type, please select only PDF files.')
    //         }
    //     } else {
    //         console.log('Please select a pdf');
    //     }
    // }

    const handleTakeAssignment = async () => {
        const status = 'Pending';
        const submittedBy = user.email;
        const score = '';
        const answerText = document.getElementById('answer').value;
        const noteText = document.getElementById('noteText').value;
        
        const submission = { title, description, difficulty, marks, photoUrl, dueDate, createdBy, status, submittedBy, score, answerText, noteText };
        console.log(submission);
        fetch('https://online-group-study-app-server.vercel.app/submittedAssignments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(submission)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId) {
                Swal.fire('Assignment submitted!', '', 'success');
                navigate('/allAssignments');
            }
        })
        
        // const { value: file } = await Swal.fire({
        //     title: 'Select pdf',
        //     input: 'file',
        //     inputAttributes: {
        //         'accept': 'pdf/*',
        //         'aria-label': 'Upload your pdf'
        //     }
        // });
        // if (file) {
        //     console.log(file);
        //     const reader = new FileReader()
        //     reader.onload = (e) => {
        //         console.log(e.target.result);
        //         Swal.fire({
        //             title: 'Your uploaded pdf',
        //             imageUrl: e.target.result,
        //             imageAlt: 'The uploaded pdf'
        //         })
        //     }
        //     reader.readAsDataURL(file)
        // }
        
    }

    const handleDeleteAssignment = () => {
        Swal.fire({
            title: 'Do you want to delete this assignment?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: 'red',
        }).then((result) => {
            if (result.isConfirmed) {
                if (user.email == createdBy) {
                    fetch(`https://online-group-study-app-server.vercel.app/assignments/${_id}`, {
                        method: 'DELETE',
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire('Assignment deleted!', '', 'success');
                            navigate('/allAssignments');
                        }
                    })
                } else {
                    Swal.fire('You cannot delete this assignment!', '', 'error');
                    return;
                }
            }
        })
    }

    return (
        <motion.div 
            className="py-10"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <h2 className="text-5xl text-center mb-10">Assignment Details</h2>
            <div key={_id} className="card card-side w-3/4 mx-auto bg-base-100 border pl-3">
                <figure className="mask mask-square h-96 py-2">
                    <img src={photoUrl} className="h-full w-full" alt="Assignment Thumbnail" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>Difficulty: {difficulty.at(0).toUpperCase() + difficulty.slice(1)}</p>
                    <p>{description}</p>
                    <p>Total marks: {marks}</p>
                    <p>Due date: {dueDate}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn btn-neutral">Take Assignment</button>
                        <button onClick={handleDeleteAssignment} className="btn btn-error">Delete Assignment</button>
                    </div>
                </div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Submit your assignment</h3>
                        <label className="label">
                            <span className="label-text">Your answer drive link:</span>
                        </label>
                        <input type="url" name="answer" id="answer" placeholder="answer link" className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">Short note:</span>
                        </label>
                        <input type="text" name="noteText" id="noteText" placeholder="Short note" className="input input-bordered w-full" />
                        <form method="dialog" className="modal-action">
                            <button onClick={handleTakeAssignment} className="btn">Submit</button> 
                        </form>
                    </div>
                </dialog>
            </div>
        </motion.div>
    )
}

export default SingleAssignment
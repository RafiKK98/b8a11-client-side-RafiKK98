
const Feature = () => {
    return (
        <div className="py-10">
            <h3 className="text-4xl text-center mb-10">Features</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="card card-side bg-base-300 shadow-xl" data-aos="fade-right">
                    <figure className="py-14 px-2 w-2/3">
                        <img src={`https://i.ibb.co/jhyS29b/assignment-submission.png`} alt="Movie"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Collaborative Assignment Submission</h2>
                        <p>Submit your assignments and receive feedback from your peers. Collaborate on homework and projects effortlessly.</p>
                    </div>
                </div>
                <div className="card card-side bg-base-300 shadow-xl" data-aos="fade-left">
                    <figure className="py-14 px-2 w-2/3">
                        <img src={`https://i.ibb.co/M6r4h8Y/peer-review.png`} alt="Movie"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Peer Review & Feedback</h2>
                        <p>Get constructive feedback on your work from your study group members. Improve your assignments with valuable insights.</p>
                    </div>
                </div>
                <div className="card card-side bg-base-300 shadow-xl" data-aos="fade-right">
                    <figure className="py-14 px-2 w-2/3">
                        <img src={`https://i.ibb.co/bFJp0zw/calendar.png`} alt="Movie"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Effortless Assignment Management</h2>
                        <p>Organize your assignments with due dates and track your progress. Stay on top of your study group&apos;s tasks with ease.</p>
                    </div>
                </div>
                <div className="card card-side bg-base-300 shadow-xl" data-aos="fade-left">
                    <figure className="py-14 px-2 w-2/3">
                        <img src={`https://i.ibb.co/bv3zP0M/user-profile.png`} alt="Movie"/>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Collaborative Learning Community</h2>
                        <p>Connect with fellow students, view their profiles, and form study groups. Collaborate and learn together in a supportive community.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature
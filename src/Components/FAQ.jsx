
const Faq = () => {
    return (
        <div className="bg-base-200 py-10">
            <h3 className="text-3xl text-center mb-10">Frequently Asked Questions</h3>
            <div className="flex flex-col lg:flex-row px-10 gap-5">
                <div className="w-1/2 bg-base-200">
                    <figure>
                        <img src={`https://i.ibb.co/TK8bNMn/faq-png.png`} alt="" />
                    </figure>
                </div>
                <div className="bg-white w-1/2 mx-auto p-6 space-y-3">
                    <div className="collapse collapse-plus bg-base-200 border border-black">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            How do I join?
                        </div>
                        <div className="collapse-content"> 
                            <p>Very simple: You can create an account using your mail, or you can use google or github. It&apos;s completely free!</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200 border border-black">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            Can I submit assignments for any subject or course?
                        </div>
                        <div className="collapse-content"> 
                            <p>Yes, you can submit assignments for a any topics or subjects. Our platform is designed to support collaborative learning across various academic disciplines.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200 border border-black">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-medium">
                            How does the peer review process work?
                        </div>
                        <div className="collapse-content"> 
                            <p>When you submit an assignment, it becomes available for review and marking by other members. They can provide feedback and assign grades based on the assignment&apos;s topic and performance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq;
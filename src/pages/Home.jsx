import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // modal stsytem 
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
    };

    // Handle Task 
    const handleTaskSubmit =async (e) => {
        e.preventDefault()
        if (title.trim().length === 0 || description.trim().length === 0) {
           
            toast.error('Title & Description cannot be empty!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
               
                });
            return;
        }
       const category = 'TO-DO'
       const date = new Date()
        const taskInfo = {title,description,category,date}
        const res = await axios.post('http://localhost:3000/tasks',taskInfo)
        if(res.data.acknowledged){
           
            toast.success('Task Added Successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
               
                });
        }
        else{

            toast.error('Something is Wrong Plase try again', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
               
                });
        }
        closeModal();
    };

    return (
        <div className="container mx-auto mt-10 p-5">
            <h1 className="text-3xl font-bold text-center mb-6">Daily Task Dashboard</h1>

            {/* Add Task Button */}
            <div className="flex gap-2 mb-6">
                <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Add Task
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add New Task</h2>

                       
                        <form onSubmit={handleTaskSubmit}>
                        <input
                            type="text"
                            maxLength={50}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task Title (Max 50 chars)"
                            className="w-full p-2 border rounded mb-3"
                        />

                       
                        <textarea
                            maxLength={200}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task Description (Max 200 chars)"
                            className="w-full p-2 border rounded mb-3"
                        ></textarea>

                       
                        <div className="flex justify-end gap-2">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Save
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Task Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">To-Do</h2>
                    <div className="p-3 bg-white shadow rounded-md">Task A</div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">In Progress</h2>
                    <div className="p-3 bg-white shadow rounded-md">Task A</div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">Done</h2>
                    <div className="p-3 bg-white shadow rounded-md line-through">Task X</div>
                </div>
            </div>
        </div>
    );
};

export default Home;

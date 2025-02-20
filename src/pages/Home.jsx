import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const Home = () => {
    const { user } = useContext(AuthContext)
    return (

        <div className="container mx-auto mt-10 p-5">
            <h1 className="text-3xl font-bold text-center mb-6">Daily Task Dashboard</h1>
            {/* Add Task Input */}
            <div className="flex gap-2 mb-6">

                <button

                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Add Task
                </button>
            </div>


            {/* Category Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* To-Do Column */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">To-Do</h2>


                    <div className="p-3 bg-white shadow rounded-md">Task A</div>
                </div>

                {/* In Progress Column */}
                <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">In Progress</h2>
                    <div className="p-3 bg-white shadow rounded-md">Task A</div>
                </div>

                {/* Done Column */}
                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">Done</h2>
                    <div className="p-3 bg-white shadow rounded-md line-through">Task X</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
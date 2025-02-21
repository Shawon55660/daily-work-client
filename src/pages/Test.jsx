/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useDrag, useDrop } from "react-dnd"; // import necessary hooks for drag and drop
import Loader from "./Loader";

const Test = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(user)

  const { data: tasks = [], refetch,isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/tasks?userEmail=${user?.email}`);
    
      return res.data;
    }
  });

  // modal system
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  // update modal system
  const [task, setTaskInfo] = useState({});
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const closeModalUpdate = () => setIsOpenUpdate(false);

  const openModalUpdate = async (id) => {
    const res = await axios.get(`http://localhost:3000/task/${id}`);
    if (res.data) {
      setTaskInfo(res.data);
    }
    setIsOpenUpdate(true);
  };

  // Handle Task
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length === 0 || description.trim().length === 0) {
      toast.error('Title & Description cannot be empty!');
      return;
    }
    const category = 'TO-DO';
    const date = new Date();
    const userEmail = user.email;
    const taskInfo = { title, description, category, userEmail, date };
    const res = await axios.post('http://localhost:3000/tasks', taskInfo);
    if (res.data.acknowledged) {
      refetch();
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
    } else {
      toast.error('Something is Wrong, Please try again');
    }
    closeModal();
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to access this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(`http://localhost:3000/tasks/${_id}`);
        if (data.deletedCount) {
          refetch();
          
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        }
      }
    });
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const from = e.target;
    const title = from.title.value;
    const description = from.description.value;
    const date = new Date();
    const updateInfo = { title, description, date };
    const res = await axios.patch(`http://localhost:3000/task/${task._id}`, updateInfo);
    if (res.data) {
      toast.success('Task Edited Successfully');
    }
    refetch();
    closeModalUpdate();
  };

  // Drag and Drop logic
  const moveTask = async (taskId, newCategory) => {
    const res = await axios.patch(`http://localhost:3000/taskCategory/${taskId}`, { category: newCategory });
    if (res.data) {
      refetch();
    }
  };

  const DraggableTask = ({ task, category }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id: task._id, category },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div ref={drag} className={`p-3 flex mb-2 justify-between bg-white shadow rounded-md ${isDragging ? 'opacity-50' : ''}`}>
        <div>
        <p className="text-xs py-1 font-semibold text-gray-500">{format(new Date(task.date), 'PP')}</p>
          <p className="text-lg font-semibold">{task.title}</p>
          <p className="text-sm text-gray-700 py-1 font-semibold">{task.description}</p>
         
        </div>
        <div className="flex  items-center gap-2">
          <button className="cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-110" onClick={() => openModalUpdate(task._id)}><FaEdit size={18} /></button>
          <button className="cursor-pointer text-red-400 transform transition-all duration-200 ease-in-out hover:scale-110" onClick={() => handleDelete(task._id)}><MdDeleteForever size={20} /></button>
        </div>
      </div>
    );
  };

  const DropZone = ({ category, children }) => {
    const [, drop] = useDrop({
      accept: "TASK",
      drop: (item) => moveTask(item.id, category),
    });

    return (
      <div ref={drop} className={` ${category=='TO-DO' && 'bg-gray-100'} ${category=='Done'&& 'bg-green-200'} ${category =='In Progress' && 'bg-yellow-200'} p-4 rounded-lg shadow-md`}>
        <h2 className="text-lg font-semibold border-b-[1px] pb-2 border-gray-700 mb-3">{category}</h2>
        {children}
      </div>
    );
  };
 if(isLoading) return <Loader></Loader>
  return (
    <div>
     <div className="bg-gray-800 fixed left-0 right-0 top-0 z-20 text-white">
     <div className="flex gap-2 container py-3 mx-auto  items-center justify-between">
     <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold text-center "> Task Dashboard</h1>
  <div className="flex  gap-3 items-center">
     <button onClick={openModal} className="px-3 py-2 lg:px-4 lg:py-2 text-sm bg-white font-semibold  text-black rounded-md">
     Add Task
   </button>
 <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="hello" /></div>
 </div>
     </div>
      <div className="container mx-auto mt-24 p-5">
     

    

 {/* Task Modal */}
 {isModalOpen && (
   <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
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
           <button onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
           <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
         </div>
       </form>
     </div>
   </div>
 )}
{isOpenUpdate && (
           <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
               <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                   <h2 className="text-xl font-bold mb-4">Edit  Task</h2>

                  
                   <form onSubmit={handleEdit}>
                   <input
                       type="text"
                       name="title"
                       maxLength={50}
                     defaultValue={task.title}
                       placeholder="Task Title (Max 50 chars)"
                       className="w-full p-2 border rounded mb-3"
                   />

                  
                   <textarea
                       maxLength={200}
                       name="description"
                      defaultValue={task.description}
                       placeholder="Task Description (Max 200 chars)"
                       className="w-full p-2 border rounded mb-3"
                   ></textarea>

                  
                   <div className="flex justify-end gap-2">
                       <button onClick={closeModalUpdate} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                           Cancel
                       </button>
                       <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                           Update
                       </button>
                   </div>
                   </form>
               </div>
           </div>
       )}
 {/* Task Categories */}
 <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
   
   <DropZone  category="TO-DO">
     {tasks.filter(task => task.category === "TO-DO").map(task => (
       <DraggableTask  key={task._id} task={task} category="TO-DO" />
     ))}
   </DropZone>
  
   <DropZone category="In Progress">
     {tasks.filter(task => task.category === "In Progress").map(task => (
       <DraggableTask key={task._id} task={task} category="In Progress" />
     ))}
   </DropZone>
   <DropZone category="Done">
     {tasks.filter(task => task.category === "Done").map(task => (
       <DraggableTask key={task._id} task={task} category="Done" />
     ))}
   </DropZone>
 </div>
</div>
    </div>
  );
};

export default Test;

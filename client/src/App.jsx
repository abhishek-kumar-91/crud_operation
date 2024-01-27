import Popup from "./coponents/Popup";
import { useState, useEffect } from "react";
import {Pencil, Delete, Send} from "lucide-react"
import axios from "axios";
import Update from "./coponents/Update"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteId, setDeleteId] = useState("");
  const [checkBox, setCheckBox] = useState(false)

  const apiUrl = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_DEV_API
  : import.meta.env.VITE_PROD_API;

  console.log("api url check", apiUrl )

  const fetchData = () =>{
    const result = axios.get(`${apiUrl}/api/user`).then((result) => setData(result.data))
  }

  useEffect(()=> {
    
    fetchData();
  }, [deleteId])
  console.log("result", data)


  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdateModal(true);
    
  };

 const handleDelete = async(userId) =>{
  const resData = await userId
  setDeleteId(resData)
  const response = await axios.delete(`${apiUrl}/api/user/${deleteId}`)
  toast("Successfully Deleted!")
  fetchData()
 }

 const handleSendData = async (user) => {
  const resData = await user;

  if (checkBox) {
    const data = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      hobbies: user.hobbies
    };

    try {
      const response = await axios.post(`${apiUrl}/api/user/send`, {
        to: 'info@redpositive.in',
        subject: 'Assignment Done',
        text: JSON.stringify(data), // Convert data to a string
      });

      toast("email sent successfully!")
    } catch (error) {
      toast("Error during sending email!")
    }
  } else {
    
    toast("Please select checkbox!")
  }
};

 
console.log("checkbox", checkBox)
  
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-neutral-950 text-white">
        <h1 className=" text-white lg:text-6xl lg:text-center lg:font-semibold lg:pt-16 font-semibold text-4xl text-center pt-5">
          Crud Operation
        </h1>
        <div className="flex justify-center mt-10 text-white">
          <button
            onClick={()=> setShowModal(true)}
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-md rounded-lg text-xl px-14 py-6 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Add
          </button>

         
        </div>
        <div className="flex justify-center">
        {showModal && <Popup fetchData={fetchData} onClose= {() => setShowModal(false)} />}
        </div>


        <div className="h-[300px] w-full flex justify-center items-center">
    <div className="h-[300px] w-[900px] mt-10 overflow-y-scroll scrollbar-none">
    {Array.isArray(data) && data.map((user, index) => (
      <div key={index}  className="w-full h-16 mb-2 backdrop-blur-sm bg-white/30 flex items-center gap-4 px-5">
      <input
          type="checkbox"
          className="w-[20px] h-[20px]"
          value={checkBox}
          onChange={() => setCheckBox(!checkBox)}
      />
          <h5>{user?.name}</h5>
          <h5>{user?.email}</h5>
          <h5>{user?.phoneNumber}</h5>
          <h5>{user?.hobbies}</h5>
          <button onClick={() => handleUpdateClick(user)} className="flex ml-16 items-center justify-center gap-2 bg-purple-700 px-3 py-2 rounded-md"><Pencil/></button>
          <button onClick = {() => handleDelete(user._id)} className="flex items-center justify-center gap-2 bg-purple-700 px-3 py-2 rounded-md"><Delete/></button>
          <button onClick = {() => handleSendData(user)} className="flex items-center justify-center gap-2 bg-purple-700 px-3 py-2 rounded-md"><Send/>Send</button>
        </div>
    ))}

       
    </div>
    {updateModal && <Update user={selectedUser} onClose = {() => setUpdateModal(false)}  />}
    
</div>
    <ToastContainer />
      
      </div>
    </>
  );
}

export default App;



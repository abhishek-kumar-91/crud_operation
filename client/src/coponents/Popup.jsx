import React, { useRef, useState } from 'react'
import {X, Save} from "lucide-react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<Save />
function Popup({onClose, fetchData}) {
    const modelRef = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [hobbies, setHobbies] = useState("");

    const apiUrl = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_DEV_API
    : import.meta.env.VITE_PROD_API;


    const closeModal = (e) =>{
        if(modelRef.current === e.target){
            onClose();
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

      const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
      };

      const handleHobbiesChange = (event) => {
        setHobbies(event.target.value);
      };

      const handleSubmit = async() => {
            const data = {
                name,
                email,
                phoneNumber,
                hobbies
            }

            try{
                const response = await axios.post(`${apiUrl}/api/user`, data);
                fetchData();
                toast("Successfully created")
            }catch(err){
                toast("Error during save data")
            }
      }
    
  return (
    <div ref= {modelRef} onClick={closeModal} className='fixed z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className=' flex flex-col gap-5 text-white backdrop-blur-sm bg-white/30 p-10 rounded-2xl'>
            <button onClick={onClose} className='place-self-end'><X size={30} /></button>
            <div className='w-[350px] ' >
                <h1 className='text-center mb-5 text-2xl font-bold'>Fill the form</h1>
                <form className='flex flex-col gap-5 w-full' onSubmit={handleSubmit}>
                    <input type='text' id='name' 
                        className='h-10 rounded-md text-gray-700 px-5 text-md font-medium focus:outline-none hover:border-purple-800 focus:ring-4 focus:ring-purple-300'
                        placeholder='Enter your name'
                        required
                        value={name}
                        onChange={handleNameChange}
                    />
                    <input type='email' id='email' 
                        className='h-10 rounded-md text-gray-700 px-5 text-md font-medium focus:outline-none hover:border-purple-800 focus:ring-4 focus:ring-purple-300'
                        placeholder='Enter your email'
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input type='number' id='phoneNumber'
                        className='h-10 rounded-md text-gray-700 px-5 text-md font-medium focus:outline-none hover:border-purple-800 focus:ring-4 focus:ring-purple-300' 
                        placeholder='Enter your phone number'
                        required
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    <input type='text' id='hobbies'
                        className='h-10 rounded-md text-gray-700 px-5 text-md font-medium focus:outline-none hover:border-purple-800 focus:ring-4 focus:ring-purple-300' 
                        placeholder='Enter your hobbies'
                        required
                        value={hobbies}
                        onChange={handleHobbiesChange}
                    />

                    <button className=' flex justify-center items-center py-4 gap-2 font-bold text-2xl focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-md rounded-lg px-14  mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'><Save/>Save</button>
                </form>
                <ToastContainer />
            </div>

            
        </div>
        
    </div>
  )
}

export default Popup
import React, { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import { IoClose } from "react-icons/io5";
import uploadFile from "../helper/uploadFile.js"
import axios from "axios"
import toast from "react-hot-toast";




export const Register = () => {
  const [userData , setUserData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })

  const [uploadPhoto, setUploadPhoto] = useState("")
    const navigate = useNavigate();

  const handleChange = (e) =>{
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  }
  // handle upload image
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file)
     setUserData((prev) => {
       return {
         ...prev,
         profile_pic: uploadPhoto?.url,
       };
     });

  }

  // handle clear photos
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);

  }
  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
      
         try {
        const res = await axios.post(URL,userData)
        
        toast.success(res.data.message)

        if(res.data.success){
            setUserData({
              name : "",
              email : "",
              password : "",
              profile_pic : ""
            })

            navigate('/email')

        }
    } catch (error) {
      console.log(error)
        toast.error(error?.response?.data?.message)
    }


  }
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <h3 className='text-center text-lg font-semibold my-2'>Welcome to Chat App</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          {/* name input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* email input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* password input */}

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* photos */}

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload profile photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold leading-relaxed tracking-wide">
            Register
          </button>
        </form>

        <p className="my-3 text-end">
          Already have account ?{" "}
          <Link to={"/email"} className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

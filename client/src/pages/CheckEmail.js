import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";


export const CheckEmail = () => {
  const [userData, setUserData] = useState({
    email: "",
    
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
 
  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/loginCheckEmail`;

    try {
      const res = await axios.post(URL, userData);

      toast.success(res.data.message);

      if (res.data.success) {
        setUserData({
          email: "",
         
        });

        navigate("/password", {state: res?.data?.data});
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <div className="flex justify-center items-center my-4">
          <FaRegUserCircle size={60} />
        </div>
        <h3 className="text-center text-lg font-semibold my-2">
          Welcome to Chat App
        </h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
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

          <button className="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold leading-relaxed tracking-wide">
            Let's go
          </button>
        </form>

        <p className="my-3 text-end">
          New User ?{" "}
          <Link to={"/register"} className="hover:text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default CheckEmail
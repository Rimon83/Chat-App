import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import {useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";


const CheckPassword = () => {
  const [userData, setUserData] = useState({
    password: "",
  });

  const navigate = useNavigate();
  // to grab all data that pass with url
  const location = useLocation();
  const dispatch = useDispatch()

  // if there is no name, redirect to email page
  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, [location?.state?.name, navigate]);

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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/loginCheckPassword`;

    try {
     const res = await axios({
       method: "post",
       url: URL,
       data: {
         userId: location?.state?._id,
         password: userData.password,
       },
       withCredentials: true,
     });

      toast.success(res.data.message);

      if (res.data.success) {
        dispatch(setToken(res?.data?.token))
        localStorage.setItem("token", res?.data?.token);
        setUserData({
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <div className="flex flex-col gap-2 justify-center items-center my-4">
          <Avatar
            width={60}
            height={60}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />

          <h2 className="font-semibold text-lg mt-1">
            {location?.state?.name}
          </h2>
        </div>
        <h3 className="text-center text-lg font-semibold my-2">
          Welcome to Chat App
        </h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
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

          <button className="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold leading-relaxed tracking-wide">
            Login
          </button>
        </form>

        <p className="my-3 text-end">
          {" "}
          <Link to={"/forgot-password"} className="hover:text-primary font-semibold">
            Forgot Password ?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPassword
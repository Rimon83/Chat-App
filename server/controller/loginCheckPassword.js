import User from "../database/models/User.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


const loginCheckPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;
    const user = await User.findById(userId)
    // verify the password
    const verifyPassword = await bcryptjs.compare(password,user.password )

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Please check password",
        error: true,
      });
    }


    const tokenData = {
     id: user._id,
     email: user.email

    }

    // for token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,  {expiresIn: "1d"})


    // for cookies
    const cookieOptions ={
     http: true,
     secure: true
    }
    return res.cookie('token', token, cookieOptions).status(200).json({
      message: "Login successfully",
      success: true,
      token: token
    });
 
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default loginCheckPassword;

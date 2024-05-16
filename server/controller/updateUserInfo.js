import User from "../database/models/User.js";
import checkToken from "../helper/checkToken.js";

const updateUserInfo = async (req, res) => {
 try {
  const token = req.cookies.token || "";
  const user = await checkToken(token);

   const { name, profile_pic } = req.body;

   const updateUser = await User.updateOne(
     { _id: user._id },
     {
       name,
       profile_pic,
     }
   );

   const userInformation = await User.findById(user._id);

   return res.json({
     message: "user update successfully",
     data: userInformation,
     success: true,
   });


  
 } catch (error) {
   return res.status(500).json({
     message: error.message || error,
     error: true,
   });
  
 }
}

export default updateUserInfo
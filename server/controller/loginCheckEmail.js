import User from "../database/models/User.js"
const loginCheckEmail = async(req, res) => {
 try {
  const {email} = req.body
  //"-password means grab all data from DB except password" 
  const checkEmail = await User.findOne({email}).select("-password")
  if (!checkEmail){
    return res.status(400).json({
      message: "User not exist",
      error: true,
    });
  }

   return res.status(200).json({
     message: "Email verify",
     success: true,
     data: checkEmail
   });
  
 } catch (error) {
  return res.status(500).json({
   message: error.message || error,
   error: true
  })
  
 }
}

export default loginCheckEmail
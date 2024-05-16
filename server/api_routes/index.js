import express from "express"
import registerUser from "../controller/registerUser.js"
import loginCheckEmail from "../controller/loginCheckEmail.js";
import loginCheckPassword from "../controller/loginCheckPassword.js";
import getUserInfoFromToken from "../controller/getUserInfoFromToken.js";
import logout from "../controller/logout.js";
import updateUserInfo from "../controller/updateUserInfo.js";
import searchUser from "../controller/searchUser.js";


const router = express.Router();
//create user registration api
router.post("/register", registerUser)
//check email
router.post("/loginCheckEmail", loginCheckEmail)
// check password
router.post("/loginCheckPassword", loginCheckPassword)
// user details 
router.get('/user-details', getUserInfoFromToken)
// user logout 
router.get("/logout", logout);
// update user info
router.post("/update-user", updateUserInfo)

// search user
router.post("/search-user", searchUser)


export default router
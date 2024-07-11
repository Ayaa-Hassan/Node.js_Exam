import { userModel } from "../../DB/models/user.model.js"



 export const checkEmail = async (req, res, next) => {
    let checkEmail = await userModel.findOne({ email: req.body.email })
    if (checkEmail) return res.json({msg:"This Email is already registered"})
    next()
 }
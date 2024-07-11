import express from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { hashPassword } from "../../middleware/hashPassword.js";
import { deleteUser, getAll, getOne, signin, signup, update} from "./user.controller.js";
import { signinSchema, signupSchema } from "./user.validation.js";
import { validation } from "../../middleware/validation.js";
import verifyToken from "../../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.post('/signup', validation(signupSchema), checkEmail, hashPassword, signup);
userRouter.post('/signin', validation(signinSchema), signin);
userRouter.get('/find/:userId', getOne);
userRouter.get('/allusers', getAll);
userRouter.put('/update/:userId', verifyToken, update);
userRouter.delete('/deleteUser/:userId',verifyToken, deleteUser )


























export default userRouter;
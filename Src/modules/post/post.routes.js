import express from "express";
import { deletePost, getAllPost, getOnePost, newPost, updatePost } from "./post.controller.js";
import verifyToken from "../../middleware/verifyToken.js";
import { validation } from "../../middleware/validation.js";
import { newPostSchema, updatePostSchema } from "./post.validation.js";




const postRouter = express.Router();

postRouter.get('/getAllPost',getAllPost)
postRouter.get('/getOnePost/:id', getOnePost)
postRouter.post('/addPost', validation(newPostSchema), verifyToken, newPost)
postRouter.put('/updatePost/:id', validation(updatePostSchema), verifyToken, updatePost)
postRouter.delete('/deletePost/:id', verifyToken, deletePost)














export default postRouter;
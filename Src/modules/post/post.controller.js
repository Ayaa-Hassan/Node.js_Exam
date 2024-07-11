import { postModel } from "../../../DB/models/post.model.js"
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";



//getAllPost
const getAllPost = catchError(async (req, res, next) => {
    const posts = await postModel.find({})
    res.json(posts)
    next(new AppError(error.message, 500))
});

// getOnePost
const getOnePost = catchError(async (req, res, next) => {
    const post = await postModel.findById(req.params.id)
    if (!post) return res.json({ msg: 'no such post, wrong id!' });
    res.json(post)
    next(new AppError(error.message, 500))
});

//createPost
const newPost = catchError(async (req, res, next) => {
    const newPost = await postModel.insertMany({ ...req.body, userId: req.user.id });
    res.json(newPost);
    next(new AppError(error.message, 500))
});

// update
const updatePost = catchError(async (req, res, next) => {
    const post = await postModel.findById(req.params.id)
    if (post.userId === req.user.id) {
        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        return res.json(updatedPost)
    } else {
        res.json({ msg: "You can update only your own post" })
    }
    next(new AppError(error.message, 500))
});

//  delete

const deletePost = catchError(async (req, res, next) => {
    const post = await postModel.findById(req.params.id)
    if (!post) {
        return res.json({ msg: "No such post" })
    } else if (post.userId !== req.user.id) {
        return res.json({ msg: "You can delete only your own posts" })
    } else {
        await postModel.findByIdAndDelete(req.params.id)
        res.json({ msg: "Post is successfully deleted" })
    }
    next(new AppError(error.message, 500))
});






























export {
    getAllPost,
    getOnePost,
    newPost,
    updatePost,
    deletePost,
}
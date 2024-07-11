
import jwt from "jsonwebtoken";
import { userModel } from "../../../DB/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError.js";

//Register

const signup = catchError(async (req, res) => {
    const newUser = await userModel.insertMany(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7h" });
    res.json({ msg: 'User created successfully', newUser, token })

});

// LOGIN 

const signin = catchError(async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7h" });
        return res.json({ msg: 'success', user, token })
    }
    next(new AppError(`Incorrect Email or Password`, 401))

});

//get one user

const getOne = catchError(async (req, res,next) => {
    const user = await userModel.findById(req.params.userId)
    if (!user) {
        return res.json({ msg: 'no such user, wrong id!' });
    } else {
        const { password, ...others } = user._doc
        res.json({ user: others })
    }
    next(new AppError(error.message, 500))
})

//get all users 

const getAll = catchError(async (req, res,next) => {
    const users = await userModel.find()
    
    const formattedUsers = users.map((user) => {
        return { userName: user.userName, email: user.email, _id: user._id, createdAt: user.createdAt };
    })
    
        res.json({ user:formattedUsers })
    
    next(new AppError(error.message, 500))
})


//update

const update = catchError(async (req, res, next) => {
    if (req.params.userId === req.user.id) {
        if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 8);
        const updatedUser = await userModel.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true })
        return res.json(updatedUser);
    }
    next(new AppError(`you can only change your own profile`, 403))
});

// deleteUser

const deleteUser = catchError(async (req, res, next) => {
    if (req.params.userId === req.user.id) {
        await userModel.findByIdAndDelete(req.params.userId)
        return res.json({ msg: `user has been successfully deleted` });
    }
    next(new AppError(`you can delete only  your own profile`, 403))
});





export {
    signup,
    signin,
    getOne,
    getAll,
    update,
    deleteUser, 
}


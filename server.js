process.on('uncaughtException', (err) => {
    console.log('error ', err);
})




import express from 'express'
import dotenv from "dotenv";
import { DBConnection } from './DB/dbConnection.js';
import userRouter from './Src/modules/user/user.routes.js';
import { globalError } from './Src/middleware/globalError.js';
import { AppError } from './Src/utils/AppError.js';
import postRouter from './Src/modules/post/post.routes.js';
dotenv.config();
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(userRouter)
app.use(postRouter)




app.use('*', (req, res, next) => {
    next(new AppError(`Can't find endPoint`, 404))
})

app.use(globalError)
DBConnection()
process.on('unhandledRejection', (err) => {
    console.log(`error`, err);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
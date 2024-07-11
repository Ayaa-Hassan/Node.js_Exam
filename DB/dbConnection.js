import mongoose from "mongoose";
export function DBConnection() {
    mongoose.connect("mongodb://127.0.0.1:27017/Exam").then(() => {
        console.log('connected to the database')
    }).catch((err) => {
        console.log(err);
    })
 }
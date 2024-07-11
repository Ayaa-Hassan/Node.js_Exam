import Joi from "joi";




const newPostSchema = Joi.object({
    title: Joi.string().min(4).max(20).required(),
    text: Joi.string().min(8).max(2000).required(),
});
const updatePostSchema = Joi.object({
    title: Joi.string().min(4).max(20).required(),
    text: Joi.string().min(8).max(2000).required(),
});







export {
    newPostSchema, 
    updatePostSchema
}
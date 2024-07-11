import Joi from "joi";




const signupSchema = Joi.object({
    userName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).required(),
    rePassword: Joi.valid(Joi.ref("password")).required(),
    age: Joi.number().integer().min(10).max(80).required()
});



const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).required()
});




export {
    signupSchema,
    signinSchema
}
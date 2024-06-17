import {z} from 'zod';

export const usernameValidation =z
.string()
.min(4,"Username must be atleast 2 character")
.max(20,"Usernmae must be atmost 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"username must not contain special character")

export const signUpSchema= z.object({
    username:usernameValidation,
    email:z.string().email({message:'Invalid email address'}),
    password: z.string().min(6,{message:"password must be at leaast 6 characters"})
})
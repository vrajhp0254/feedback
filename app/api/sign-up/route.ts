import dbConnect from "@/lib/dbConnect";
import UseModel from "@/models/User";
import bcryptjs from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmial";

export async function POST(request:Request){
    await dbConnect();
    

    try{
        const {username, email, password} = await request.json();
        
    }
    catch(err){
        console.error("Error registering user",err)
        return Response.json({
            success:false,
            message:"Error registering user"
        },{
            status:500
        })
    }

}
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Creentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
                { email: credentials.identifier },
                { username: credentials.identifier },]
          });
          if (!user) {
            throw new Error('No user found with this email');
          }

          if(!user.isVerified){
            throw new Error('Please verify your account first');
          }
          const isPasswordCorret = await bcrypt.compare(credentials.password,user.password)
          if (isPasswordCorret) {
            return user
            
          }else{
            throw new Error('Incorrect password ');
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages:{
    signIn:'/sign-in'
  }
};

import NextAuth from "next-auth/next";
import {authOptions} from "./option";

const handler = NextAuth(authOptions)
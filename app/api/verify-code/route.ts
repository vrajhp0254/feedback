import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodeUsername = decodeURIComponent(username);
    const decodeCode = decodeURIComponent(code);

    const user = await UserModel.findOne({ username: decodeUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }

    const isCodeValid = user.verifyCode === decodeCode;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeNotExpired && isCodeValid) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified Successfully",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification has expired,please sign up again to get new code",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Incorrect Verification Code",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log("Error in verifying username", error);
    return Response.json(
      {
        success: "false",
        message: "Error in verifying username",
      },
      {
        status: 500,
      }
    );
  }
}

import dbConnect from "@/lib/dbConnect";
import UseModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { log } from "console";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
  } catch (error) {
    console.log("Error in checking username", error);
    return Response.json(
      {
        success: "false",
        message: "Error in checking username",
      },
      {
        status: 500,
      }
    );
  }
}

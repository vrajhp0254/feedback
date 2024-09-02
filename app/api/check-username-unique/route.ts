import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  try {
    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameerror = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameerror?.length > 0
              ? usernameerror.join(",")
              : "Invalid query parameter",
        },
        {
          status: 400,
        }
      );
    }
    const { username } = result.data;

    const ExitingUserVerified = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (ExitingUserVerified) {
      return Response.json(
        {
          success: false,
          message: "username is already taken",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "username is available",
        },
        {
          status: 200,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "success",
      },
      {
        status: 200,
      }
    );
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

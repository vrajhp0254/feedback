// import { resend } from "@/lib/resend";
// import VerificationEmail from "@/emails/VerificationEmail";

// import { apiResponse } from "@/types/apiResponse";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifycode: string
// ): Promise<apiResponse> {
//   try {
//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: "Feedback | Verification code",
//       react: VerificationEmail({ username, otp: verifycode }),
//     });
//     return {
//       success: true,
//       message: "Verification email sent",
//     };
//   } catch (emailError) {
//     console.error("Error sending verification email", emailError);
//     return {
//       success: false,
//       message: "Failed to send verification email",
//     };
//   }
// }
import mailjet from 'node-mailjet';

export async function sendVerificationEmail(email: string,username: string, verifycode: string) {
  console.log("Sending verification email to", email);
  try {
    const mailjetClient = mailjet.apiConnect(process.env.MAILJET_API_KEY as string, process.env.MAILJET_SECRET_KEY as string);
    const request = mailjetClient.post("send", { 'version': 'v3.1' }).request({
      "Messages": [
        {
          "From": {
            "Email": "vrajhp0254@gmail.com",
            "Name": "Vraj Patel"
          },
          "To": [
            {
              "Email": `${email}`,
              "Name": `${username}`
            }
          ],
          "Subject": "Feedback | Verification code",
          "TextPart": `Dear ${username}, your verification code is ${verifycode}.`,
          "HTMLPart": `<h3>Dear ${username},</h3><p>Your verification code is <strong>${verifycode}</strong>.</p>`
        }
      ]
    });

    await request;
    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (emailError) {
    if (emailError instanceof Error && 'statusCode' in emailError) {
      console.error((emailError as any).statusCode);
    } else {
      console.error(emailError);
    }
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
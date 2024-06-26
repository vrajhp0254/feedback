import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";

import { apiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifycode: string
): Promise<apiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Feedback | Verification code",
      react: VerificationEmail({ username, otp: verifycode }),
    });
    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}

// import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
// import { NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = "edge";

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await openai.completions.create({
//       model: "gpt-3.5-turbo-instruct",
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = OpenAIStream(response);
//     console.log(stream);

//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       // OpenAI API error handling
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       // General error handling
//       console.error("An unexpected error occurred:", error);
//       throw error;
//     }
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function POST(req: Request) {
    try{
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string in double quotation. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return new NextResponse(text);
} catch (err) {
    // Type guard to check if err has a message property
    if (err instanceof Error) {
      console.error("An unexpected error occurred:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      console.error("An unexpected error occurred:", err);
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }

}
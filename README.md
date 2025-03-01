# True Feedback - Anonymous Feedback Application

True Feedback is a full-stack application built with Next.js that enables users to send and receive anonymous feedback. The platform incorporates AI capabilities to enhance the feedback experience and includes robust security features.

## Key Features

- **Anonymous Feedback**: Users can submit feedback anonymously, ensuring honest and unbiased responses
- **AI-Powered Suggestions**: Intelligent suggestion system using Gemini AI for generating contextual feedback prompts
- **Secure Authentication**: Email verification and OTP-based security system
- **Real-time Updates**: Instant feedback notifications and updates
- **User Dashboard**: Comprehensive dashboard to manage received feedback
- **Message Management**: Users can control their message acceptance settings

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Email Service**: Mailjet
- **AI Integration**: Google Gemini AI
- **Form Handling**: React Hook Form, Zod
- **API**: RESTful API endpoints

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance

## Environment Variables

Create a `.env` file in the root directory with the following variables:
- MONGODB_URI=your_mongodb_connection_string
- NEXTAUTH_SECRET=your_nextauth_secret
- NEXTAUTH_URL=http://localhost:3000
- MAILJET_API_KEY=your_mailjet_api_key
- MAILJET_SECRET_KEY=your_mailjet_secret_key
- GEMINI_API_KEY=your_gemini_api_key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/true-feedback.git
cd true-feedback
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js application routes and API endpoints
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/models` - MongoDB schema definitions
- `/schemas` - Zod validation schemas
- `/types` - TypeScript type definitions
- `/emails` - Email templates

## Contributing

We welcome contributions to True Feedback! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and ensure code quality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication powered by [NextAuth.js](https://next-auth.js.org/)
- AI capabilities by [Google Gemini](https://ai.google.dev/)


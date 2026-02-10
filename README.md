# echo-backend

# Echo - Backend API

This is the Node.js/Express proxy server for the Echo application. It serves as a secure bridge between the frontend client and the OpenAI API, ensuring that API credentials remain protected on the server side.

## 🛠️ Prerequisites

- **Node.js**: v22.20.0 (or higher)
- **NPM**: Included with Node.js
- **OpenAI API Key**: Required for AI responses

## 📂 Project Structure

```text
echo-backend/
├── server.js        # Express server logic & OpenAI integration
├── .env             # Environment variables (Private)
├── .gitignore       # Prevents sensitive files from being pushed
├── package.json     # Project dependencies & metadata
└── node_modules/    # Installed libraries

# Setup Instructions
1. Navigate to the backend directory:
- cd echo-backend
2. Install dependencies:
- npm install
3. Environment Configuration
- Create a .env file in the root directory
- touch .env
- Add the OPENAI_API_KEY=your_actual_api_key_here to the .env
4. Start the server:
- node server.js

📡 API Endpoints
POST /api/chat
Sends a user prompt to OpenAI and returns the AI-generated response.

- Body: { "prompt": "string" }
- Response: { "response": "string" }

GET /test
Health check endpoint to verify the server is running correctly.
```

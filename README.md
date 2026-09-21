# 🎙️ ShipraAi – Embeddable AI Voice Assistant for Websites

> **A full-stack AI voice agent built with the MERN stack that can be embedded into any website. It talks with visitors using voice, answers customer questions from business data, navigates website pages automatically, and works as a 24/7 AI customer support agent.**

<p align="center">

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-API-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI-8E75B2?logo=googlegemini)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?logo=firebase)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C65E9)

</p>

<p align="center">
  <a href="https://shipra-aiclient.onrender.com">🚀 Live Demo</a> •
  <a href="https://github.com/palak68">💻 GitHub</a> •
  <a href="https://portfolio-9zup-fthg57x5l-palak-sharmas-projects-395c690b.vercel.app/">🌐 Portfolio</a> •
  <a href="https://www.linkedin.com/in/palak-sharma-279548280/">💼 LinkedIn</a>
</p>

---

# 📖 Overview

**ShipraAi** is a modern SaaS-style AI voice assistant platform that lets anyone add a smart, voice-enabled virtual assistant to their website with a single script tag.

Visitors simply tap the mic button and speak. The assistant converts speech to text using the **Web Speech API**, sends the query to the backend, generates an intelligent answer using the **Google Gemini API** based on the business's own data, and replies back in natural voice. It can also understand navigation commands like *"take me to the pricing page"* and move the user to the right page automatically.

Website owners get a **Builder Dashboard** where they can track their current plan, Gemini status, and remaining messages, and copy their personal embed code. A **credit-based plan system** with secure **Razorpay** payments makes the platform scalable and easy to monetize.

🔗 **Try it live:** [https://shipra-aiclient.onrender.com](https://shipra-aiclient.onrender.com)

---

# ✨ Features

## 🎙️ AI Voice Conversation

* Talk to the assistant using your voice
* Speech-to-Text using Web Speech API
* Text-to-Speech voice replies
* Hands-free experience
* Floating mic button on every page
* Modern voice assistant popup UI

---

## 🤖 AI Customer Support Agent

* Answers customer questions instantly
* Works 24/7 without human support
* Understands business data
* Custom business knowledge support
* Real-time AI responses powered by Gemini

---

## 🧭 Voice Website Navigation

* Navigate website pages using voice commands
* Assistant redirects users to the right page automatically
* Helps visitors find information faster
* Improves user experience and accessibility

---

## 🔌 Embed Anywhere

* Add the assistant to any website with one script tag
* Personal embed code for every user
* Works with plain HTML, React, and other websites
* Just paste the script before the closing `</body>` tag

---

## 📊 Builder Dashboard

* View your current plan
* Check Gemini API status
* Track remaining messages
* Copy your personal embed script
* Simple instructions on where to paste the script

---

## 👤 Authentication

* Firebase Authentication
* Secure user login and logout
* Token-based sessions
* Protected routes

---

## 💳 Plans & Payments

* Razorpay payment gateway integration
* Secure online payments
* Message credit management
* Easy upgrade from Free to Pro

| | **Free Plan** | **Pro Plan** |
| --- | --- | --- |
| **Price** | ₹0 | ₹699 for 3 months |
| **AI Messages** | 200 | Unlimited |
| **Voice Assistant** | ✅ | ✅ |
| **Navigation Support** | ✅ | ✅ Unlimited |
| **Customization** | Basic | Advanced AI assistant |
| **Performance** | Standard | Priority |
| **Support** | Standard | Premium |

---

## 📱 Responsive UI

* Desktop
* Tablet
* Mobile Devices

---

# 🚀 Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Web Speech API (SpeechRecognition + SpeechSynthesis)
* Firebase Authentication

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* CORS
* dotenv

---

## Artificial Intelligence

* Google Gemini API

### AI Capabilities

* Natural Language Understanding
* Business-specific Question Answering
* Real-time Response Generation
* Navigation Intent Detection
* Customer Support Automation

---

## Database

* MongoDB

---

## Authentication

* Firebase Authentication

---

## Payments

* Razorpay

---

## Deployment

* Render

---

# ⚙️ Workflow

```text
User Registration/Login
          │
          ▼
Firebase Authentication
          │
          ▼
Builder Dashboard
          │
          ▼
Copy Personal Embed Script
          │
          ▼
Paste Script in Any Website
          │
          ▼
Visitor Opens Website
          │
          ▼
Floating Voice Assistant Loads
          │
          ▼
Visitor Speaks (Speech-to-Text)
          │
          ▼
Express REST API
          │
          ▼
Google Gemini API
(with Business Data)
          │
          ▼
AI Answer / Navigation Action
          │
          ▼
Text-to-Speech Voice Reply
          │
          ▼
Message Credits Updated
```

---

# 🏗️ System Architecture

```text
                     React Frontend
                            │
                            ▼
               Firebase Authentication
                            │
                            ▼
                    Express REST API
                            │
      ┌─────────────────────┼─────────────────────┐
      ▼                     ▼                     ▼
 Embed Script          Google Gemini           MongoDB
 (assistant.js)            API                     │
      │                     │                   Users
 Web Speech API      Answer Generation          Plans
 (Voice In/Out)      Navigation Intent          Messages Left
      │                     │                   Business Data
      └─────────────────────┼─────────────────────┘
                            ▼
              Voice Reply / Page Navigation
                            │
                            ▼
                Razorpay (Plan Upgrades)
```

---

# 📂 Project Structure

```bash
ShipraAi/

client/
│
├── public/
├── src/
│   ├── assets/
│   ├── Components/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env
├── eslint.config.js
├── index.html
└── package.json

server/
│
├── Configs/
│   ├── ConnectDB.js
│   ├── gemini.js
│   ├── razorpay.js
│   └── token.js
├── Controllers/
├── Middlewares/
├── Models/
├── Routes/
├── .env
├── index.js
└── package.json

screenshots/

README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/palak68/ShipraAi.git

cd ShipraAi
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

The app will run at **http://localhost:5173**

---

# 🔑 Environment Variables

## Server (.env)

```env
PORT=8000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id

RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## Client (.env)

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key

VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> ⚠️ Never commit your `.env` files to GitHub.
```

# 🔌 Embed the Assistant on Any Website

1. Login and open the **Builder** page
2. Copy your personal embed code
3. Paste it just before the closing `</body>` tag

```html
<body>

  <!-- Your website content -->

  <script
    src="https://shipra-aiclient.onrender.com/assistant.js"
    data-user-id="YOUR_USER_ID">
  </script>

</body>
```

The floating assistant button will appear on your website and visitors can start talking to it instantly.

---

# 📷 Screenshots

### 🏠 Landing Page with Voice Assistant

<img width="1366" height="768" alt="Screenshot (455)" src="https://github.com/user-attachments/assets/ab9f1b66-fa41-4577-bd66-27b4100fdaa2" />


### 📊 Builder Dashboard

<img width="1366" height="768" alt="Screenshot (456)" src="https://github.com/user-attachments/assets/5adfd209-d159-42a1-bcc6-9841379a1321" />


### 💳 Billing & Plans

<img width="1366" height="768" alt="Screenshot (458)" src="https://github.com/user-attachments/assets/95b4556b-0353-47a7-bce9-b40d9eb7970f" />
>

---

# 🧪 Browser Support

| Browser | Speech Recognition | Speech Synthesis |
| --- | --- | --- |
| Chrome | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Safari | ⚠️ Partial | ✅ |
| Firefox | ❌ | ✅ |

---

# 🔒 Security Features

* Firebase Authentication
* Token-based User Sessions
* Protected Routes & Middlewares
* Environment Variables for Secrets
* Secure Payments with Razorpay
* CORS Protection

---

# 🚀 Future Enhancements

* Multi-language Voice Support
* Conversation History & Analytics Dashboard
* Custom Voice & Assistant Personality
* File / PDF Upload for Knowledge Base
* Lead Capture & CRM Integrations
* Multi-tenant Workspace Management
* Custom Assistant Themes & Branding
* Real-time Voice Streaming

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👩‍💻 Author

## Palak Sharma

**Full Stack MERN Developer**

🌐 Portfolio: **https://portfolio-9zup-fthg57x5l-palak-sharmas-projects-395c690b.vercel.app/**

💼 LinkedIn: **https://www.linkedin.com/in/palak-sharma-279548280/**

💻 GitHub: **https://github.com/palak68**

🚀 Live Project: **https://shipra-aiclient.onrender.com**

---

# ⭐ Show Your Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future improvements.

---

# 📜 License

This project is licensed under the **MIT License**.

---

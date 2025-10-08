# 🧠 AI Resume Analyzer - Backend

This is the backend of the **AI Resume Analyzer App**,
built using **Node.js**, **Express**, **MongoDB**, 
**Cloudinary**, and **Google Gemini AI API**.  
It handles **authentication**, **file uploads**,
and **AI-powered resume analysis**.

---

## 🚀 Features

- 🔐 **JWT Authentication**
- 🔑 **Password Hashing (bcrypt)**
- ☁️ **Cloudinary Image Upload**
- 📄 **Resume Upload & AI Analysis**
- 💾 **MongoDB Atlas Database**
- 🤖 **Gemini AI Integration**
- ⚙️ **Multer for File Handling**

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT |
| File Upload | Multer + Cloudinary |
| AI | Google Gemini API |
| Environment | dotenv |

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/ai-resume-analyzer-backend.git
cd ai-resume-analyzer-backend

## npm install
# .env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Gemini AI
GOOGLE_API_KEY=your_gemini_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

├── config/
│   └── cloudinary.js        # Cloudinary configuration
├── model/
│   └── personModel.js       # User model schema
├── routes/
│   ├── personRoutes.js      # Signup, login, profile routes
│   └── resumeRoute.js       # Resume upload & AI analysis routes
├── db.js                    # MongoDB connection setup
├── jwt.js                   # JWT functions and middleware
├── index.js                 # Entry point
└── .env                     # Environment variables

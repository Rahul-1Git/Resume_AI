const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");
const router = express.Router();
const { jwtAuthMiddleware } = require("./../jwt");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

router.post(
  "/resume",
  jwtAuthMiddleware,
  upload.single("resume"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No resume file uploaded.");
    }

    try {
      const data = await pdf(req.file.buffer);
      const resumeText = data.text;

      const prompt = `Here is a resume text: ${resumeText}. Based on this, please provide a list of job roles this person is well-suited for. Also, give an overall assessment and suggest areas for improvement. Format the response clearly with headings and not exceed the word limit of 200 and score the resume out of 10 for current job market.`;

      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const geminiResponse = result.text;

      res
        .status(200)
        .json({ message: "here is your data", answer: geminiResponse });
      console.log(geminiResponse);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      res.status(500).send("An error occurred during resume analysis.");
    }
  }
);

module.exports = router;

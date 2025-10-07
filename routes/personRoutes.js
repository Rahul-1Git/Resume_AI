const express = require("express");
const router = express.Router();
const Person = require("./../model/personModel");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const { upload } = require("../config/cloudinary");

router.post("/signup", upload.single("photo"), async (req, res) => {
  try {
    console.log("Uploaded file object:", req.file);

    const { name, age, email, password } = req.body;

    const photoUrl = req.file?.path || null;

    const newPerson = new Person({
      name,
      age,
      email,
      password,
      photo: photoUrl,
    });

    const saved = await newPerson.save();

    const token = generateToken({
      id: saved._id,
      name: saved.name,
    });

    res.status(200).json({
      user: {
        id: saved._id,
        name: saved.name,
        email: saved.email,
        photo: saved.photo,
      },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.toString() });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await Person.findOne({ name });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

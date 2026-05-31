const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message from ${name || "Anonymous"}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    });

    res.json({ success: true, message: "Email sent successfully" });

  } catch (err) {
  console.log("EMAIL ERROR:", err);
  res.status(500).json({ success: false, error: err.message });
}
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
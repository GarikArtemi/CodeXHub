// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
  createAccessToken,
  createRefreshToken
} from "../utils/tokens.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hash
  });

  res.json({ message: "User created" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).send("User not found");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).send("Wrong password");

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false // production → true (HTTPS)
  });

  res.json({ accessToken });
});

// REFRESH TOKEN
router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken: token });
  if (!user) return res.sendStatus(403);

  const accessToken = createAccessToken(user);

  res.json({ accessToken });
});

// LOGOUT
router.post("/logout", async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

export default router;

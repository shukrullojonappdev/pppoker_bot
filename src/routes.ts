import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/balance", (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/balance.html"));
});

router.get("/hello", (req, res) => {
  return "hello";
});

export default router;

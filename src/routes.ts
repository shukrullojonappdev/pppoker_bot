import express from "express";
import path from "path";

const router = express.Router();

router.get("/", async (req, res) => {
  return await res.sendFile(
    path.join(__dirname, "../web-app/build/index.html")
  );
});

export default router;

import express from "express";
import path from "path";

const router = express.Router();

router.get("/", async (req, res) => {
  return await res.sendFile(
    path.join(__dirname, "../web-app/build/index.html")
  );
});

// router.get("/buyChips", async (req, res) => {
//   return await res.sendfile(path.join(__dirname, "../views/buyChips.html"));
// });

// router.get("/balance", async (req, res) => {
//   return await res.sendFile(path.join(__dirname, "../views/balance.html"));
// });

export default router;

import express from "express";
import { sample_call } from "../chatgpt.js";

const router = express.Router();

router.get("/:src/:dest", async (req, res) => {
  const output = await sample_call(req.params.src, req.params.dest);
  res.send(output);
});

export default router;

import express from "express";
import { sample_call } from "../controller/chatgpt.js";

const route = express.Router();

route.get("/:src/:dest", async (req, res) => {
  const output = await sample_call(req.params.src, req.params.dest);
  res.send(output);
});

export default route;

const express = require("express");
const runCompletion = require("../chatgpt.js").runCompletion;

const router = express.Router();

router.get("/:src/:dest", async (req, res) => {
  const output = await runCompletion(req.params.src, req.params.dest);
  res.send(output);
});

module.exports.router = router;

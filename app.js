import express from "express";
import { sample_call } from "./chatgpt.js";
import routes from "./routes/routes.js";

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server started at 3000");
});

app.use("/api", routes);

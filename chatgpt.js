import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const api = new ChatGPTAPI({ apiKey: process.env.API_KEY });

const sample_call = async (dest, src) => {
  let output = "";
  let res = await api.sendMessage(
    `Tell me about historical places to visit in ${dest} with their address.`
  );
  output += res.text;
  res = await api.sendMessage(`How can I travel to these places from ${src}?`, {
    parentMessageId: res.id,
  });
  output += res.text;
  return output;
};

export { sample_call };

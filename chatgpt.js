const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const runCompletion = async (src, dest) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Tell me everything about places can I visit in ${dest} and what are their addresses? What are the best ways to get there from ${src}?`,
    max_tokens: 2048,
  });
  return completion.data.choices[0].text;
};

module.exports.runCompletion = runCompletion;

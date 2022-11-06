const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const mockURL =
  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-80sbUWWHSlrHrgVQLbywop5J/user-UGcPbzvsQbB0rrqfVVsJ53dc/img-QIE9SNAkw8cPRruNNCQI0K2l.png?st=2022-11-06T04%3A41%3A01Z&se=2022-11-06T06%3A41%3A01Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-06T03%3A08%3A10Z&ske=2022-11-07T03%3A08%3A10Z&sks=b&skv=2021-08-06&sig=RpktFFTqA%2B5Iqx8Ra9bwnF2ldkyCEj5p5Tj0kVIonB8%3D";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let index = fs.readFileSync("template/index.html").toString();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AP_TOKEN,
});

const openai = new OpenAIApi(configuration);

async function getImage(text) {
  const response = await openai.createImage({
    prompt: text,
    n: 1,
    size: "256x256",
  });
  return response["data"]["data"][0];
}

app.get("/", (req, res) => {
  let html = index;
  html = html.replace("{{src}}", "");
  res.end(html);
});

app.post("/getImage", async (req, res) => {
  // const url = (await getImage(req.body.fname)).url;
  const url = mockURL;
  let html = index;
  html = html.replace("{{src}}", url);
  res.send(html);
});

const port = 3456;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});

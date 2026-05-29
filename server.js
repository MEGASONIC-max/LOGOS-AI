const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

const upload = multer({
dest: "uploads/"
});

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

// USE ROOT FOLDER
app.use(express.static(__dirname));

// MAIN PAGE
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});

// CHAT ROUTE
app.post("/chat", upload.single("image"), async (req, res) => {

try {

const message = req.body.message || "";

let content = [];

// USER TEXT
if(message){
content.push({
type: "text",
text: message
});
}

// USER IMAGE
if(req.file){

const imagePath = req.file.path;

const base64 = fs.readFileSync(imagePath, {
encoding: "base64"
});

content.push({
type: "image_url",
image_url: {
url: `data:image/jpeg;base64,${base64}`
}
});

// DELETE TEMP FILE
fs.unlinkSync(imagePath);

}

// SEND TO AI
const response = await client.chat.completions.create({

model: "gpt-4o-mini",

messages: [
{
role: "system",
content: `
You are ZEUS AI,
a smart, friendly,
advanced AI assistant.

Reply naturally like ChatGPT.
Be intelligent, conversational,
helpful and modern.
`
},
{
role: "user",
content: content
}
],

max_tokens: 1000

});

// SEND RESPONSE
res.json({
reply: response.choices[0].message.content
});

} catch (error) {

console.log(error);

res.json({
reply: "ZEUS AI encountered an error."
});

}

});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`ZEUS AI running on port ${PORT}`);

});

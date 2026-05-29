const express = require("express");
const multer = require("multer");
const fs = require("fs");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

const upload = multer({
dest:"uploads/"
});

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.use(express.static("public"));

app.post("/chat", upload.single("image"), async(req,res)=>{

try{

const message = req.body.message;

let content = [
{
type:"text",
text:message
}
];

if(req.file){

const base64 = fs.readFileSync(req.file.path,{
encoding:"base64"
});

content.push({
type:"image_url",
image_url:{
url:`data:image/jpeg;base64,${base64}`
}
});

}

const response = await client.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{
role:"user",
content:content
}
]

});

res.json({
reply:response.choices[0].message.content
});

}catch(err){

console.log(err);

res.json({
reply:"Server error."
});

}

});

app.listen(3000,()=>{
console.log("Server running");
});

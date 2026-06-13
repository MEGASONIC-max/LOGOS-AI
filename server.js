const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(express.static(__dirname));

// ===============================
// FILE UPLOAD
// ===============================

const upload = multer({
dest: "uploads/"
});

// ===============================
// MAIN PAGE
// ===============================

app.get("/", (req, res) => {

res.sendFile(
path.join(__dirname, "index.html")
);

});

// ===============================
// CHAT ROUTE
// ===============================

app.post(
"/chat",
upload.single("image"),

async (req, res) => {

try {

const userMessage =
req.body.message || "";

// ===============================
// GROQ API REQUEST
// ===============================

const response = await fetch(

"https://api.groq.com/openai/v1/chat/completions",

{

method: "POST",

headers: {

"Content-Type":
"application/json",

"Authorization":
`Bearer ${process.env.GROQ_API_KEY}`

},

body: JSON.stringify({

model:
"llama-3.1-8b-instant",

messages: [

{
role: "system",

content:
`
You are LOGOS AI,a fast and powerful assistant ready to help with any tasks.

Reply naturally,
clearly and helpfully
like ChatGPT.
`
},

{
role: "user",
content: userMessage
}

],

temperature: 0.7,

max_tokens: 1024

})

}

);

const data =
await response.json();

// ===============================
// ERROR CHECK
// ===============================

if(data.error){

console.log(data.error);

return res.json({

reply:
"Groq API Error ❌"

});

}

// ===============================
// SEND REPLY
// ===============================

res.json({

reply:
data.choices[0].message.content

});

}

catch(error){

console.log(error);

res.json({

reply:
"ZEUS AI encountered an error."

});

}

}

);

// ===============================
// PORT
// ===============================

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(
`LOGOS AI running on port ${PORT}`
);

});

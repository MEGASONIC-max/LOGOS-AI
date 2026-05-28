const chatBox = document.getElementById("chat-box");

const userInput = document.getElementById("user-input");

const sendBtn = document.getElementById("send-btn");


// =========================
// PUT YOUR GROQ API KEY
// =========================

const API_KEY = "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";


// =========================
// SYSTEM PROMPT
// =========================

const systemPrompt = `
You are ZEUS AI.

A powerful smart AI assistant similar to ChatGPT.

You are friendly, intelligent and helpful.

Reply naturally and clearly.

Keep answers short unless the user asks for details.

Never say you are ChatGPT.
`;


// =========================
// ADD MESSAGE FUNCTION
// =========================

function addMessage(sender, message){

    // Remove welcome screen
    const welcome = document.querySelector(".welcome");

    if(welcome){
        welcome.remove();
    }

    // Create message div
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    // User or bot style
    if(sender === "You"){
        messageDiv.classList.add("user");
    }else{
        messageDiv.classList.add("bot");
    }

    // Add text
    messageDiv.innerHTML = `
        <p>${message}</p>
    `;

    // Add to chat
    chatBox.appendChild(messageDiv);

    // Auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;
}


// =========================
// TYPING MESSAGE
// =========================

function showTyping(){

    const typingDiv = document.createElement("div");

    typingDiv.classList.add("message", "bot");

    typingDiv.id = "typing";

    typingDiv.innerHTML = `
        <p>Typing...</p>
    `;

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}


// =========================
// REMOVE TYPING
// =========================

function removeTyping(){

    const typing = document.getElementById("typing");

    if(typing){
        typing.remove();
    }

}


// =========================
// SEND MESSAGE
// =========================

async function sendMessage(){

    const message = userInput.value.trim();

    // Stop empty messages
    if(message === "") return;

    // Add user message
    addMessage("You", message);

    // Clear input
    userInput.value = "";

    // Show typing
    showTyping();

    try{

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${API_KEY}`
                },

                body:JSON.stringify({

                    model:"llama3-70b-8192",

                    messages:[

                        {
                            role:"system",
                            content:systemPrompt
                        },

                        {
                            role:"user",
                            content:message
                        }

                    ],

                    temperature:0.7,

                    max_tokens:500

                })

            }
        );

        const data = await response.json();

        // Remove typing
        removeTyping();

        // AI response
        if(data.choices && data.choices.length > 0){

            const aiReply = data.choices[0].message.content;

            addMessage("ZEUS AI", aiReply);

        }else{

            addMessage(
                "ZEUS AI",
                "Sorry, I couldn't understand that."
            );

        }

    }catch(error){

        console.error(error);

        removeTyping();

        addMessage(
            "ZEUS AI",
            "Error connecting to AI."
        );

    }

}


// =========================
// BUTTON CLICK
// =========================

sendBtn.addEventListener("click", sendMessage);


// =========================
// ENTER KEY SEND
// =========================

userInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        sendMessage();

    }

});

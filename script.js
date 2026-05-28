const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// YOUR GROQ API KEY
const API_KEY = "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";

// SYSTEM PROMPT
const systemPrompt = `
You are ZEUS AI, a smart Nigerian AI assistant.
Reply briefly, clearly and naturally.
Give direct answers.
Avoid unnecessary long explanations.
Be friendly and intelligent.
`;

function addMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    messageDiv.innerHTML = `
        <strong>${sender}:</strong>
        <p>${message}</p>
    `;

    chatBox.appendChild(messageDiv);

    // Auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") return;

    // Show user message
    addMessage("You", message);

    // Clear input
    userInput.value = "";

    // Show loading
    addMessage("ZEUS AI", "Typing...");

    try {

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },

            body: JSON.stringify({
                model: "llama3-70b-8192",

                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],

                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();

        // Remove typing
        const typingMessage = document.querySelectorAll(".message");
        typingMessage[typingMessage.length - 1].remove();

        if (data.choices && data.choices.length > 0) {

            const aiReply = data.choices[0].message.content;

            addMessage("ZEUS AI", aiReply);

        } else {

            addMessage("ZEUS AI", "Sorry, I couldn't understand that.");

        }

    } catch (error) {

        console.error(error);

        // Remove typing
        const typingMessage = document.querySelectorAll(".message");
        typingMessage[typingMessage.length - 1].remove();

        addMessage("ZEUS AI", "Error connecting to AI.");

    }
}

// Send button
sendBtn.addEventListener("click", sendMessage);

// Enter key
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

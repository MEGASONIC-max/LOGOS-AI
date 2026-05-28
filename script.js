const API_KEY = "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";

async function sendMessage() {

  const input = document.getElementById("user-input");
  const messages = document.getElementById("messages");

  const userText = input.value.trim();

  if (!userText) return;

  // USER MESSAGE

  messages.innerHTML += `
    <div class="message">
      <strong>You:</strong><br><br>
      ${userText}
    </div>
  `;

  input.value = "";

  // LOADING MESSAGE

  messages.innerHTML += `
    <div class="message" id="loading">
      <strong>ZEUS AI:</strong><br><br>
      Typing...
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;

  try {

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },

        body: JSON.stringify({

          model: "llama-3.1-8b-instant",

          messages: [
            {
              role: "system",
              content:
                "You are ZEUS AI, a futuristic smart assistant that replies to everything clearly and intelligently."
            },

            {
              role: "user",
              content: userText
            }
          ]

        })
      }
    );

    const data = await response.json();

    document.getElementById("loading").remove();

    if (data.error) {

      messages.innerHTML += `
        <div class="message">
          <strong>ZEUS AI:</strong><br><br>
          ${data.error.message} ❌
        </div>
      `;

      return;
    }

    const aiReply =
      data.choices[0].message.content;

    messages.innerHTML += `
      <div class="message">
        <strong>ZEUS AI:</strong><br><br>
        ${aiReply}
      </div>
    `;

    messages.scrollTop = messages.scrollHeight;

  } catch (error) {

    document.getElementById("loading").remove();

    messages.innerHTML += `
      <div class="message">
        <strong>ZEUS AI:</strong><br><br>
          Error connecting to Groq ❌
        </div>
    `;

    console.log(error);
  }
}

// ENTER KEY SUPPORT

document
  .getElementById("user-input")
  .addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
      sendMessage();
    }

});

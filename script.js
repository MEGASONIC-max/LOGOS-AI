const API_KEY = "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";

async function sendMessage() {

  const input = document.getElementById("user-input");
  const messages = document.getElementById("messages");

  const userMessage = input.value.trim();

  if (!userMessage) return;

  // USER MESSAGE

  messages.innerHTML += `
    <div class="message">
      <strong>You:</strong><br><br>
      ${userMessage}
    </div>
  `;

  input.value = "";

  // LOADING

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

          model: "llama3-8b-8192",

          messages: [

            {
              role: "system",
              content:
                "You are ZEUS AI, a futuristic smart AI assistant."
            },

            {
              role: "user",
              content: userMessage
            }

          ],

          temperature: 0.8

        })

      }
    );

    const data = await response.json();

    document.getElementById("loading").remove();

    if (data.error) {

      messages.innerHTML += `
        <div class="message">
          <strong>ZEUS AI:</strong><br><br>
          ${data.error.message}
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
        Error connecting to Groq API ❌
      </div>
    `;

    console.log(error);

  }

}

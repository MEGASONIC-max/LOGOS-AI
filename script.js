const API_KEY = "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";

async function sendMessage() {

  const input = document.getElementById("user-input");
  const messages = document.getElementById("messages");

  const userMessage = input.value.trim();

  if (!userMessage) return;

  // USER MESSAGE

  messages.innerHTML += `
    <div class="message user-message">
      <strong>You:</strong><br><br>
      ${userMessage}
    </div>
  `;

  input.value = "";

  // LOADING

  messages.innerHTML += `
    <div class="message bot-message" id="loading">
      <strong>ZEUS AI:</strong><br><br>
      Typing...
    </div>
  `;

  messages.scrollTop = messages.scrollHeight;

  try {

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },

        body: JSON.stringify({

          model: "gpt-3.5-turbo",

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
        <div class="message bot-message">
          <strong>ZEUS AI:</strong><br><br>
          ${data.error.message}
        </div>
      `;

      return;
    }

    const aiReply =
      data.choices[0].message.content;

    messages.innerHTML += `
      <div class="message bot-message">
        <strong>ZEUS AI:</strong><br><br>
        ${aiReply}
      </div>
    `;

    messages.scrollTop = messages.scrollHeight;

  } catch (error) {

    document.getElementById("loading").remove();

    messages.innerHTML += `
      <div class="message bot-message">
        <strong>ZEUS AI:</strong><br><br>
        Error connecting to OpenAI ❌
      </div>
    `;

    console.log(error);

  }

}

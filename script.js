// ===============================
// ZEUS AI CHATBOT
// ===============================

// GROQ API KEY

const API_KEY =
"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";

// ===============================
// SEND MESSAGE FUNCTION
// ===============================

async function sendMessage() {

  // INPUT + MESSAGE BOX

  const input =
  document.getElementById("user-input");

  const messages =
  document.getElementById("messages");

  // USER TEXT

  const userText =
  input.value.trim();

  // STOP EMPTY MESSAGE

  if (!userText) return;

  // ===============================
  // USER MESSAGE
  // ===============================

  messages.innerHTML += `

    <div class="message user-message">

      <div class="message-label">

        You

      </div>

      <div class="message-text">

        ${userText}

      </div>

    </div>

  `;

  // CLEAR INPUT

  input.value = "";

  // AUTO SCROLL

  messages.scrollTop =
  messages.scrollHeight;

  // ===============================
  // LOADING MESSAGE
  // ===============================

  messages.innerHTML += `

    <div
      class="message bot-message"
      id="loading"
    >

      <div class="message-label">

        ZEUS AI

      </div>

      <div class="message-text">

        Typing...

      </div>

    </div>

  `;

  // AUTO SCROLL

  messages.scrollTop =
  messages.scrollHeight;

  try {

    // ===============================
    // FETCH GROQ API
    // ===============================

    const response =
    await fetch(

      "https://api.groq.com/openai/v1/chat/completions",

      {

        method: "POST",

        headers: {

          "Content-Type":
          "application/json",

          "Authorization":
          `Bearer ${API_KEY}`

        },

        body: JSON.stringify({

          // MODEL

          model:
          "llama-3.1-8b-instant",

          // AI ROLE

          messages: [

            {
              role: "system",

              content:
              "You are ZEUS AI, a futuristic smart assistant that replies clearly, intelligently and professionally."
            },

            {
              role: "user",

              content: userText
            }

          ],

          temperature: 0.7,

          max_tokens: 1024

        })

      }

    );

    // ===============================
    // GET DATA
    // ===============================

    const data =
    await response.json();

    // REMOVE LOADING

    document
      .getElementById("loading")
      .remove();

    // ===============================
    // SHOW API ERROR
    // ===============================

    if (data.error) {

      messages.innerHTML += `

        <div class="message bot-message">

          <div class="message-label">

            ZEUS AI

          </div>

          <div class="message-text">

            ${data.error.message} ❌

          </div>

        </div>

      `;

      return;
    }

    // ===============================
    // AI REPLY
    // ===============================

    const aiReply =

    data
    .choices[0]
    .message
    .content;

    // SHOW MESSAGE

    messages.innerHTML += `

      <div class="message bot-message">

        <div class="message-label">

          ZEUS AI

        </div>

        <div class="message-text">

          ${aiReply}

        </div>

      </div>

    `;

    // AUTO SCROLL

    messages.scrollTop =
    messages.scrollHeight;

  }

  // ===============================
  // CONNECTION ERROR
  // ===============================

  catch (error) {

    // REMOVE LOADING

    document
      .getElementById("loading")
      .remove();

    // SHOW ERROR

    messages.innerHTML += `

      <div class="message bot-message">

        <div class="message-label">

          ZEUS AI

        </div>

        <div class="message-text">

          Error connecting to Groq ❌

        </div>

      </div>

    `;

    console.log(error);

  }

}

// ===============================
// ENTER KEY SUPPORT
// ===============================

document
.getElementById("user-input")
.addEventListener(

  "keypress",

  function(e) {

    if (e.key === "Enter") {

      sendMessage();

    }

  }

);

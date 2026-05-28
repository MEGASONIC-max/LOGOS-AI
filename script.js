// ===============================
// ZEUS AI CHATBOT
// ===============================

// GROQ API KEY

const API_KEY =
"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";

// SEND MESSAGE FUNCTION

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

    <div class="user-message">

      <span class="label">

        You:

      </span>

      ${userText}

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
      class="bot-message"
      id="loading"
    >

      <span class="label">

        ZEUS AI:

      </span>

      Typing...

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

        <div class="bot-message">

          <span class="label">

            ZEUS AI:

          </span>

          ${data.error.message} ❌

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

      <div class="bot-message">

        <span class="label">

          ZEUS AI:

        </span>

        ${aiReply}

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

      <div class="bot-message">

        <span class="label">

          ZEUS AI:

        </span>

        Error connecting to Groq ❌

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

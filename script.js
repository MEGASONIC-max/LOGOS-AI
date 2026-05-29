// ===============================
// ZEUS AI CHATBOT
// FULL SCRIPT.JS
// ===============================

// ===============================
// GROQ API KEY
// ===============================

const API_KEY =
"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";

// ===============================
// ELEMENTS
// ===============================

const input =
document.getElementById("user-input");

const messages =
document.getElementById("messages");

const imageInput =
document.getElementById("imageInput");

const sendBtn =
document.getElementById("send-btn");

// ===============================
// LOAD CHAT HISTORY
// ===============================

window.onload = function(){

  const savedChats =
  localStorage.getItem("zeus_chat");

  if(savedChats){

    messages.innerHTML =
    savedChats;

    messages.scrollTop =
    messages.scrollHeight;

  }

};

// ===============================
// SAVE CHAT HISTORY
// ===============================

function saveChat(){

  localStorage.setItem(

    "zeus_chat",

    messages.innerHTML

  );

}

// ===============================
// TYPE EFFECT
// ===============================

function typeText(element, text){

  let index = 0;

  element.innerHTML = "";

  const interval = setInterval(() => {

    if(index < text.length){

      // THIS FIXES THE HTML TAG ISSUE

      if(text.charAt(index) === "<"){

        const closeTag =
        text.indexOf(">", index);

        element.innerHTML +=
        text.substring(index, closeTag + 1);

        index =
        closeTag + 1;

      }

      else{

        element.innerHTML +=
        text.charAt(index);

        index++;

      }

      messages.scrollTop =
      messages.scrollHeight;

    }

    else{

      clearInterval(interval);

      saveChat();

    }

  }, 15);

}

// ===============================
// SEND MESSAGE
// ===============================

async function sendMessage() {

  // USER TEXT

  const userText =
  input.value.trim();

  // USER IMAGE

  const imageFile =
  imageInput.files[0];

  // STOP EMPTY MESSAGE

  if (!userText && !imageFile) return;

  // ===============================
  // USER IMAGE PREVIEW
  // ===============================

  let imageHTML = "";

  if (imageFile) {

    const imageURL =
    URL.createObjectURL(imageFile);

    imageHTML = `

      <img
        src="${imageURL}"
        class="preview-image"
      >

    `;

  }

  // ===============================
  // SHOW USER MESSAGE
  // ===============================

  messages.innerHTML += `

    <div class="message user-message">

      <div class="message-label">

        YOU

      </div>

      <div class="message-text">

        ${userText}

      </div>

      ${imageHTML}

    </div>

  `;

  // SAVE CHAT

  saveChat();

  // AUTO SCROLL

  messages.scrollTop =
  messages.scrollHeight;

  // CLEAR INPUTS

  input.value = "";

  imageInput.value = "";

  // ===============================
  // LOADING MESSAGE
  // ===============================

  messages.innerHTML += `

    <div
      class="message bot-message ai-message"
      id="loading"
    >

      <div class="message-label">

        ZEUS AI

      </div>

      <div class="message-text typing-animation">

        <span></span>
        <span></span>
        <span></span>

      </div>

    </div>

  `;

  // AUTO SCROLL

  messages.scrollTop =
  messages.scrollHeight;

  try {

    // ===============================
    // GROQ API DIRECT REQUEST
    // ===============================

    let finalMessage = userText;

    if(imageFile){

      finalMessage +=
      "\n\n[User also uploaded an image]";

    }

    const response =
    await fetch(

      "https://api.groq.com/openai/v1/chat/completions",

      {
        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "Authorization":
          `Bearer ${API_KEY}`

        },

        body: JSON.stringify({

          model: "llama3-70b-8192",

          messages: [

            {
              role: "system",
              content:
              "You are ZEUS AI, a smart and futuristic AI assistant."
            },

            {
              role: "user",
              content: finalMessage
            }

          ],

          temperature: 0.7,

          max_tokens: 2000

        })

      }

    );

    const data =
    await response.json();

    // REMOVE LOADING

    document
    .getElementById("loading")
    .remove();

    // ===============================
    // SHOW API ERROR
    // ===============================

    if(data.error){

      messages.innerHTML += `

        <div class="message bot-message">

          <div class="message-label">

            ZEUS AI

          </div>

          <div class="message-text">

            ${data.error.message}

          </div>

        </div>

      `;

      saveChat();

      return;

    }

    // ===============================
    // AI REPLY
    // ===============================

    const aiReply =

      data.choices?.[0]?.message?.content

      || "No reply";

    // ===============================
    // AI RESPONSE CONTAINER
    // ===============================

    messages.innerHTML += `

      <div class="message bot-message ai-message">

        <div class="message-label">

          ZEUS AI

        </div>

        <div
          class="message-text"
          id="typingText"
        >

        </div>

      </div>

    `

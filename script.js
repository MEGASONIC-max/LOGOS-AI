// ===============================
// ZEUS AI CHATBOT
// FULL FIXED SCRIPT.JS
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

window.onload = function () {

  const savedChats =
  localStorage.getItem("zeus_chat");

  if (savedChats) {

    messages.innerHTML =
    savedChats;

    scrollToBottom();

  }

};

// ===============================
// SAVE CHAT HISTORY
// ===============================

function saveChat() {

  localStorage.setItem(
    "zeus_chat",
    messages.innerHTML
  );

}

// ===============================
// AUTO SCROLL
// ===============================

function scrollToBottom() {

  setTimeout(() => {

    messages.scrollTop =
    messages.scrollHeight;

  }, 50);

}

// ===============================
// TYPE EFFECT
// ===============================

function typeText(element, text) {

  let index = 0;

  element.innerHTML = "";

  const interval =
  setInterval(() => {

    if (index < text.length) {

      // FIX HTML TAG ISSUE

      if (text.charAt(index) === "<") {

        const closeTag =
        text.indexOf(">", index);

        element.innerHTML +=
        text.substring(
          index,
          closeTag + 1
        );

        index =
        closeTag + 1;

      }

      else {

        element.innerHTML +=
        text.charAt(index);

        index++;

      }

      scrollToBottom();

    }

    else {

      clearInterval(interval);

      saveChat();

      scrollToBottom();

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

  if (!userText && !imageFile)
  return;

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
  // USER MESSAGE HTML
  // ===============================

  const userMessage = `

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

  // ADD USER MESSAGE

  messages.insertAdjacentHTML(
    "beforeend",
    userMessage
  );

  // SAVE

  saveChat();

  // SCROLL

  scrollToBottom();

  // CLEAR INPUTS

  input.value = "";

  imageInput.value = "";

  // ===============================
  // CREATE UNIQUE BOT ID
  // ===============================

  const botId =
  "bot-" + Date.now();

  // ===============================
  // LOADING MESSAGE
  // ===============================

  const loadingHTML = `

    <div
      class="message bot-message ai-message"
      id="${botId}"
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

  // IMPORTANT FIX:
  // ADD LOADING DIRECTLY AFTER USER MESSAGE

  messages.insertAdjacentHTML(
    "beforeend",
    loadingHTML
  );

  scrollToBottom();

  try {

    // ===============================
    // FINAL MESSAGE
    // ===============================

    let finalMessage =
    userText;

    if (imageFile) {

      finalMessage +=
      "\n\n[User uploaded an image]";

    }

    // ===============================
    // API REQUEST
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

          model:
          "llama-3.3-70b-versatile",

          messages: [

            {

              role: "system",

              content:
              "You are ZEUS AI, a smart futuristic AI assistant. Keep replies short unless user asks for details."

            },

            {

              role: "user",

              content:
              finalMessage

            }

          ],

          temperature: 0.7,

          max_tokens: 120

        })

      }

    );

    // ===============================
    // RESPONSE ERROR
    // ===============================

    if (!response.ok) {

      throw new Error(
        "API Error"
      );

    }

    const data =
    await response.json();

    // ===============================
    // AI REPLY
    // ===============================

    const aiReply =

      data.choices?.[0]
      ?.message?.content

      || "No reply";

    // ===============================
    // SHORT REPLY
    // ===============================

    const shortReply =

      aiReply
      .split(". ")
      .slice(0, 4)
      .join(". ");

    // ===============================
    // MARKDOWN FORMAT
    // ===============================

    const formattedReply =

      marked.parse(shortReply);

    // ===============================
    // REPLACE LOADING MESSAGE
    // ===============================

    const loadingElement =
    document.getElementById(botId);

    // IMPORTANT FIX:
    // REPLACE ONLY THIS BOT MESSAGE

    loadingElement.innerHTML = `

      <div class="message-label">
        ZEUS AI
      </div>

      <div
        class="message-text"
        id="typing-${botId}"
      >

      </div>

    `;

    // ===============================
    // TYPE RESPONSE
    // ===============================

    const typingElement =
    document.getElementById(
      `typing-${botId}`
    );

    typeText(
      typingElement,
      formattedReply
    );

    scrollToBottom();

  }

  // ===============================
  // CONNECTION ERROR
  // ===============================

  catch (error) {

    console.log(error);

    const loadingElement =
    document.getElementById(botId);

    if (loadingElement) {

      loadingElement.innerHTML = `

        <div class="message-label">
          ZEUS AI
        </div>

        <div class="message-text">

          Error connecting
          to server ❌

        </div>

      `;

    }

    saveChat();

    scrollToBottom();

  }

}

// ===============================
// ENTER KEY SUPPORT
// ===============================

input.addEventListener(

  "keypress",

  function (e) {

    if (e.key === "Enter") {

      e.preventDefault();

      sendMessage();

    }

  }

);

// ===============================
// BUTTON CLICK
// ===============================

sendBtn.addEventListener(

  "click",

  function () {

    sendMessage();

  }

);

// ===============================
// IMAGE PREVIEW
// ===============================

imageInput.addEventListener(

  "change",

  function () {

    if (imageInput.files[0]) {

      console.log(

        "Image selected:",

        imageInput.files[0].name

      );

    }

  }

);

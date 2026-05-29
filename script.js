// ===============================
// ZEUS AI CHATBOT
// FULL SCRIPT.JS
// ===============================

// ===============================
// GROQ API KEY
// ===============================

const API_KEY =
"YOUR_GROQ_API_KEY_HERE";

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

      element.innerHTML +=
      text.charAt(index);

      index++;

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

        You

      </div>

      <div class="message-text">

        ${marked.parse(userText)}

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
    // SEND TO YOUR SERVER
    // ===============================

    const formData =
    new FormData();

    formData.append(
      "message",
      userText
    );

    if (imageFile) {

      formData.append(
        "image",
        imageFile
      );

    }

    const response =
    await fetch(

      "/chat",

      {
        method: "POST",
        body: formData
      }

    );

    const data =
    await response.json();

    // REMOVE LOADING

    document
    .getElementById("loading")
    .remove();

    // ===============================
    // SHOW SERVER ERROR
    // ===============================

    if(data.error){

      messages.innerHTML += `

        <div class="message bot-message">

          <div class="message-label">

            ZEUS AI

          </div>

          <div class="message-text">

            ${data.error}

          </div>

        </div>

      `;

      saveChat();

      return;

    }

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

    `;

    // AUTO SCROLL

    messages.scrollTop =
    messages.scrollHeight;

    // ===============================
    // TYPE RESPONSE
    // ===============================

    const typingElement =
    document.getElementById(
      "typingText"
    );

    const formattedReply =
    marked.parse(data.reply);

    typeText(

      typingElement,

      formattedReply

    );

  }

  // ===============================
  // CONNECTION ERROR
  // ===============================

  catch(error){

    // REMOVE LOADING

    const loading =
    document.getElementById("loading");

    if(loading){

      loading.remove();

    }

    // SHOW ERROR

    messages.innerHTML += `

      <div class="message bot-message">

        <div class="message-label">

          ZEUS AI

        </div>

        <div class="message-text">

          Error connecting to server ❌

        </div>

      </div>

    `;

    saveChat();

    console.log(error);

  }

}

// ===============================
// ENTER KEY SUPPORT
// ===============================

input.addEventListener(

  "keypress",

  function(e){

    if(e.key === "Enter"){

      sendMessage();

    }

  }

);

// ===============================
// BUTTON CLICK
// ===============================

sendBtn.addEventListener(

  "click",

  function(){

    sendMessage();

  }

);

// ===============================
// IMAGE PREVIEW NAME
// ===============================

imageInput.addEventListener(

  "change",

  function(){

    if(imageInput.files[0]){

      console.log(
        "Image selected:",
        imageInput.files[0].name
      );

    }

  }

);

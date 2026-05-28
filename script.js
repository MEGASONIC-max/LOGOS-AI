function sendMessage(){

  const input = document.getElementById("user-input");
  const messages = document.getElementById("messages");

  const text = input.value;

  // Prevent empty messages
  if(text.trim() === ""){
    return;
  }

  // User Message
  const userMessage = document.createElement("div");

  userMessage.className = "message";

  userMessage.innerHTML = `
    <strong>You:</strong><br><br>
    ${text}
  `;

  messages.appendChild(userMessage);

  // Auto Scroll
  messages.scrollTop = messages.scrollHeight;

  // Clear Input
  input.value = "";

  // Fake AI Typing Effect
  const botTyping = document.createElement("div");

  botTyping.className = "message";

  botTyping.innerHTML = `
    <strong>ZEUS AI:</strong><br><br>
    Typing...
  `;

  messages.appendChild(botTyping);

  messages.scrollTop = messages.scrollHeight;

  // Fake AI Reply
  setTimeout(() => {

    const replies = [

      "Hello 👋 I am ZEUS AI. How can I help you today?",

      "ZEUS AI is currently running without OpenAI API integration.",

      "You can connect OpenAI API later for real AI responses.",

      "Thanks for using ZEUS Chatbot 🚀",

      "Owner Contact: +2349066760078",

      "Special thanks to +2348062285862 ❤️"

    ];

    const randomReply =
      replies[Math.floor(Math.random() * replies.length)];

    botTyping.innerHTML = `
      <strong>ZEUS AI:</strong><br><br>
      ${randomReply}
    `;

    messages.scrollTop = messages.scrollHeight;

  },1500);

}

/* ENTER KEY SUPPORT */

document
  .getElementById("user-input")
  .addEventListener("keypress",function(event){

    if(event.key === "Enter"){
      sendMessage();
    }

});

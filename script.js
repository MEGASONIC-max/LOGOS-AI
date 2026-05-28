function sendMessage(){

  const input =
  document.getElementById("user-input");

  const messages =
  document.getElementById("messages");

  const text =
  input.value.trim();

  if(text === ""){
    return;
  }

  // USER MESSAGE

  const userMessage =
  document.createElement("div");

  userMessage.className =
  "message";

  userMessage.innerHTML = `
    <strong>You:</strong><br><br>
    ${text}
  `;

  messages.appendChild(userMessage);

  // BOT MESSAGE

  const botMessage =
  document.createElement("div");

  botMessage.className =
  "message";

  botMessage.innerHTML = `
    <strong>ZEUS AI:</strong><br><br>
    Message received successfully 🚀
  `;

  messages.appendChild(botMessage);

  // CLEAR INPUT

  input.value = "";

}

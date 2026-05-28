```javascript id="v5wyec"
function sendMessage(){

  const input = document.getElementById("user-input");
  const messages = document.getElementById("messages");

  const text = input.value;

  const lowerText = text.toLowerCase();

  if(text.trim() === ""){
    return;
  }

  // USER MESSAGE

  const userMessage = document.createElement("div");

  userMessage.className = "message";

  userMessage.innerHTML =     <strong>You:</strong><br><br>     ${text}  ;

  messages.appendChild(userMessage);

  input.value = "";

  messages.scrollTop = messages.scrollHeight;

  // BOT TYPING

  const botMessage = document.createElement("div");

  botMessage.className = "message";

  botMessage.innerHTML = `
    <strong>ZEUS AI:</strong><br><br>
    Typing...
  `;

  messages.appendChild(botMessage);

  messages.scrollTop = messages.scrollHeight;

  // BOT REPLY

  setTimeout(() => {

    let reply = "";

    // Greetings

    if(
      lowerText.includes("hi") ||
      lowerText.includes("hello") ||
      lowerText.includes("hey")
    ){

      reply = "Hello 👋 Welcome to ZEUS AI.";

    }

    // How are you

    else if(
      lowerText.includes("how are you")
    ){

      reply = "I am doing great 🚀 How can I assist you today?";

    }

    // Name

    else if(
      lowerText.includes("your name")
    ){

      reply = "My name is ZEUS AI.";

    }

    // Date

    else if(
      lowerText.includes("date")
    ){

      const today = new Date();

      reply =
      "Today's date is " +
      today.toDateString();

    }

    // Time

    else if(
      lowerText.includes("time")
    ){

      const now = new Date();

      reply =
      "Current time is " +
      now.toLocaleTimeString();

    }

    // Owner

    else if(
      lowerText.includes("owner")
    ){

      reply =
      "Owner Contact: +2349066760078";

    }

    // Numbers

    else if(
      lowerText.includes("1 to 10")
    ){

      reply =
      "1 2 3 4 5 6 7 8 9 10";

    }

    // Love

    else if(
      lowerText.includes("love")
    ){

      reply =
      "Love is a beautiful thing ❤️";

    }

    // Joke

    else if(
      lowerText.includes("joke")
    ){

      reply =
      "Why did the programmer quit his job? Because he didn't get arrays 😂";

    }

    // Weather

    else if(
      lowerText.includes("weather")
    ){

      reply =
      "I cannot check live weather yet because API is not connected.";

    }

    // Help

    else if(
      lowerText.includes("help")
    ){

      reply =
      "I can chat, answer simple questions, tell jokes, time, date and more.";

    }

    // Bye

    else if(
      lowerText.includes("bye")
    ){

      reply =
      "Goodbye 👋 See you again.";

    }

    // Thanks

    else if(
      lowerText.includes("thank")
    ){

      reply =
      "You're welcome ❤️";

    }

    // Math Detection

    else if(
      lowerText.includes("+") ||
      lowerText.includes("-") ||
      lowerText.includes("*") ||
      lowerText.includes("/")
    ){

      try{

        reply =
        "Answer: " +
        eval(lowerText);

      }catch{

        reply =
        "I could not solve that calculation.";

      }

    }

    // Default Smart Replies

    else{

      const randomReplies = [

        "Interesting question 👀",

        "ZEUS AI is still learning new things every day 🚀",

        "I understand what you said.",

        "Can you explain more?",

        "That sounds amazing 🔥",

        "I am currently running without OpenAI API.",

        "I will become smarter once AI API is connected.",

        "Tell me more about that.",

        "That is a good question.",

        "I am here to assist you anytime."

      ];

      reply =
      randomReplies[
        Math.floor(
          Math.random() * randomReplies.length
        )
      ];

    }

    // SHOW REPLY

    botMessage.innerHTML = `
      <strong>ZEUS AI:</strong><br><br>
      ${reply}
    `;

    messages.scrollTop = messages.scrollHeight;

  },1000);

}

// ENTER KEY SUPPORT

document
.getElementById("user-input")
.addEventListener("keypress",function(event){

  if(event.key === "Enter"){
    sendMessage();
  }

});
``

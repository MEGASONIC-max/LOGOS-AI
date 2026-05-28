const OPENAI_API_KEY = "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";

async function sendMessage(){

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

  input.value = "";

  // BOT MESSAGE

  const botMessage =
  document.createElement("div");

  botMessage.className =
  "message";

  botMessage.innerHTML = `
    <strong>ZEUS AI:</strong><br><br>
    Thinking...
  `;

  messages.appendChild(botMessage);

  try{

    const response = await fetch(

      "https://api.openai.com/v1/chat/completions",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",

          "Authorization":
          `Bearer ${OPENAI_API_KEY}`
        },

        body:JSON.stringify({

          model:"gpt-4o-mini",

          messages:[

            {
              role:"system",

              content:
              "You are ZEUS AI, a futuristic smart assistant."
            },

            {
              role:"user",

              content:text
            }

          ]

        })

      }

    );

    const data =
    await response.json();

    console.log(data);

    // CHECK ERRORS

    if(data.error){

      botMessage.innerHTML = `
        <strong>ZEUS AI:</strong><br><br>
        ${data.error.message}
      `;

      return;
    }

    botMessage.innerHTML = `
      <strong>ZEUS AI:</strong><br><br>
      ${data.choices[0].message.content}
    `;

  }

  catch(error){

    console.log(error);

    botMessage.innerHTML = `
      <strong>ZEUS AI:</strong><br><br>
      Failed to connect to OpenAI.
    `;

  }

}

// ENTER KEY SUPPORT

document
.getElementById("user-input")
.addEventListener("keypress", function(event){

  if(event.key === "Enter"){

    sendMessage();

  }

});

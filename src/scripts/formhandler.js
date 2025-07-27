let tg = {
    token: "BOT_TOKEN", // Your bot's token that got from @BotFather
    chat_id: "CHAT_ID" // The user's (that you want to send a message) telegram chat id
  }
  
  function sendMessage(text) {
    const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${text}`; // The url to request
    const xht = new XMLHttpRequest();
    xht.open("GET", url);
    xht.send();
  }
  
  window.onload = function() {
    document.getElementById('sendButton').addEventListener('click', function() {
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phoneNumber = document.getElementById('phoneNumber').value;
      const message = document.getElementById('message').value;
  
      const text = `Full Name: ${fullName}, Email: ${email}, Phone Number: ${phoneNumber}, Message: ${message}`;
      sendMessage(text);
    });
  }
  
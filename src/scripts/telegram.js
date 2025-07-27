// Telegram bot sendMessage logic for React migration
// To be refactored into ContactForm component

// Example usage in vanilla JS (to be converted to React):
// let tg = {
//     token: "BOT_TOKEN",
//     chat_id: "CHAT_ID"
// }
// function sendMessage(text) {
//   const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${text}`;
//   const xht = new XMLHttpRequest();
//   xht.open("GET", url);
//   xht.send();
// }
// window.onload = function() {
//   document.getElementById('sendButton').addEventListener('click', function() {
//     const fullName = document.getElementById('fullName').value;
//     const email = document.getElementById('email').value;
//     const phoneNumber = document.getElementById('phoneNumber').value;
//     const message = document.getElementById('message').value;
//     const text = `Full Name: ${fullName}, Email: ${email}, Phone Number: ${phoneNumber}, Message: ${message}`;
//     sendMessage(text);
//   });
// } 
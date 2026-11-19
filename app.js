function getBotReply(input) {
  input = input.toLowerCase();
  if (input.includes("hello") || input.includes("hi") || input.includes("hey")) return "Hello! 👋 I'm Mythrri AI. How can I help you today? Ask me about AI, Python, or UK studies!";
  if (input.includes("who is mythrri") || input.includes("your creator") || input.includes("who made you")) return "I was built by Mythrri! 👩‍💻 She is from Karnataka, India and is preparing for MSc AI in UK. She has built 6 projects including me!";
  if (input.includes("what is ai")) return "AI = Artificial Intelligence. It means making computers think like humans - to learn, understand language, see images and make decisions. Examples: ChatGPT, Siri, Google Translate.";
  if (input.includes("python")) return "Python is the #1 language for AI! 🐍 It's easy to learn, has libraries like TensorFlow, and is used by Google, Netflix, Instagram. Mythrri is learning Python for her MSc!";
  if (input.includes("javascript") || input.includes("js")) return "JavaScript makes websites interactive! This chatbot itself is built with JavaScript. Without JS, websites would be just boring text.";
  if (input.includes("uk") || input.includes("university") || input.includes("msc")) return "Best UK Universities for MSc AI: 🇬🇧 1. Oxford 2. Cambridge 3. Imperial College London 4. UCL 5. University of Edinburgh. Mythrri is aiming for one of these!";
  if (input.includes("joke")) return "Why did the developer go broke? 😂 Because he used up all his cache! Or... Why do programmers prefer dark mode? Because light attracts bugs!";
  if (input.includes("expense") || input.includes("money")) return "Mythrri also built an Expense Tracker app! It helps you track daily spending. You can check it on her GitHub.";
  if (input.includes("todo") || input.includes("task")) return "Mythrri also built a To-Do List App to plan her day! It has Add, Done, Delete and Filter features.";
  if (input.includes("how are you")) return "I'm doing great! Running on code and coffee ☕ How are you? Are you learning coding too?";
  if (input.includes("thank")) return "You're most welcome! ❤️ Thanks for chatting with me. Please follow Mythrri on LinkedIn!";
  if (input.includes("bye")) return "Bye bye! 👋 Come back soon. Good luck with your learning!";
  if (input.includes("weather")) return "I can't check live weather yet, but in Chikodi, Karnataka it's usually warm! ☀️ Mythrri will add live weather feature in Version 2.";
  if (input.includes("your name")) return "My name is Mythrri AI! 🤖 Named after my creator.";
  return "Interesting! 🤔 I am still learning. I know a lot about AI, Python, JavaScript, UK Universities, Mythrri and jokes. Try asking 'What is AI?' or 'Who is Mythrri?'";
}

function sendMessage() {
  let input = document.getElementById('userInput');
  let text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = "";
  // Typing effect
  let typingId = addMessage("Typing... ⏳", 'bot');
  setTimeout(() => {
    document.getElementById(typingId).querySelector('.text').innerText = getBotReply(text);
  }, 800);
}

function addMessage(text, sender) {
  let box = document.getElementById('chatBox');
  // Hide welcome on first message
  let welcome = box.querySelector('.welcome');
  if (welcome) welcome.remove();
  let id = 'msg-' + Date.now() + Math.random();
  let div = document.createElement('div');
  div.className = 'msg ' + sender;
  div.id = id;
  div.innerHTML = `<div class="icon">${sender === 'user' ? 'M' : '🤖'}</div><div class="text">${text}</div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return id;
}

function askSuggestion(q) {
  document.getElementById('userInput').value = q;
  sendMessage();
}
function newChat() { location.reload(); }
function toggleDark() { document.body.classList.toggle('dark'); }

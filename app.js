async function getBotReply(input) {
  let lower = input.toLowerCase();
  if (lower.includes("who is mythrri")) return "I was built by Mythrri! 👩‍💻 She is from Karnataka, India. She is a developer who built 6 projects including me!";
  if (lower.includes("your name")) return "My name is Mythrri AI! 🤖";

  try {
    let response = await fetch(`https://text.pollinations.ai/${encodeURIComponent("You are Mythrri AI, friendly assistant. Answer short and simple: " + input)}`);
    let text = await response.text();
    return text;
  } catch (e) {
    return "Sorry, AI is busy right now. Try again! 😅";
  }
}

async function sendMessage() {
  let input = document.getElementById('userInput');
  let text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = "";
  let typingId = addMessage("Typing... ⏳", 'bot');
  let reply = await getBotReply(text);
  document.getElementById(typingId).querySelector('.text').innerText = reply;
}

function addMessage(text, sender) {
  let box = document.getElementById('chatBox');
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
function askSuggestion(q) { document.getElementById('userInput').value = q; sendMessage(); }
function newChat() { location.reload(); }
function toggleDark() { document.body.classList.toggle('dark'); }

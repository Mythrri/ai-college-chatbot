async function getBotReply(input) {
  let lower = input.toLowerCase();
if (lower.includes("dhoni")) return "Yes! MS Dhoni retired from IPL on Nov 17, 2026! 🏏 He played 18 years for CSK, won 5 IPL titles. Now from IPL 2027, he is CSK's Team Mentor, not a player. He retired from international cricket in 2020.";
if (lower.includes("ipl 2027")) return "IPL 2027 schedule is not announced yet! But big news: MS Dhoni retired and will be CSK Mentor. Auction is on Dec 16 in Goa. Stay tuned!";

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

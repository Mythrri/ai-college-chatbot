async function getBotReply(input) {
  let lower = input.toLowerCase();

  if (lower.includes("who is mythrri")) return "I was built by Mythrri! 👩‍💻 She is from Karnataka, India. She is a developer who built 6 projects including me!";
  if (lower.includes("your name")) return "My name is Mythrri AI! 🤖";

  // 1. TRY WIKIPEDIA FIRST - For Who is / Is / What is questions
  // This makes bot correct for Dhoni, Kohli, anyone - without pasting code for each!
  try {
    let topic = input.replace(/who is|is |are |what is|tell me about|about/gi, "").trim().replace(/\?/g, "");
    if (topic.length > 2 && topic.length < 30) {
      let w = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
      let data = await w.json();
      if (data.extract) {
        return data.extract.split(". ").slice(0, 3).join(". ") + ".";
      }
    }
  } catch(e) {}

  // 2. If Wikipedia fails, ask Free AI (for poems, stories, jokes, coding)
  try {
    let r = await fetch(`https://text.pollinations.ai/${encodeURIComponent("You are Mythrri AI, friendly assistant. Answer short and simple: " + input)}`);
    let text = await r.text();
    if (text.includes("Free limit")) return "Please wait 45 seconds and ask again! Free AI is resting a bit 😅";
    return text;
  } catch (e) { return "Sorry, AI is busy. Try again! 😅"; }
}

async function sendMessage() {
  let input = document.getElementById('userInput');
  let text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user'); input.value = "";
  let id = addMessage("Typing... ⏳", 'bot');
  let reply = await getBotReply(text);
  document.getElementById(id).querySelector('.text').innerText = reply;
}

function addMessage(text, sender) {
  let box = document.getElementById('chatBox');
  let w = box.querySelector('.welcome'); if (w) w.remove();
  let id = 'msg-' + Date.now() + Math.random();
  let d = document.createElement('div'); d.className = 'msg ' + sender; d.id = id;
  d.innerHTML = `<div class="icon">${sender==='user'?'M':'🤖'}</div><div class="text">${text}</div>`;
  box.appendChild(d); box.scrollTop = box.scrollHeight; return id;
}

function askSuggestion(q){ document.getElementById('userInput').value=q; sendMessage(); }
function newChat(){ location.reload(); }
function toggleDark(){ document.body.classList.toggle('dark'); }

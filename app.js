async function getBotReply(input) {
  let lower = input.toLowerCase();

  // --- MYTHRRI'S SPECIAL CORRECT ANSWERS ---
  if (lower.includes("who is mythrri")) return "I was built by Mythrri! 👩‍💻 She is from Karnataka, India. She is a developer who built 6 projects including me!";
  if (lower.includes("your name")) return "My name is Mythrri AI! 🤖";
  
  // DHONI - CORRECT NEWS - Nov 17, 2026
  if (lower.includes("dhoni")) return "No, MS Dhoni is NOT playing IPL 2027 as a player! 🏏 He retired from IPL on Nov 17, 2026 after 18 years for CSK. He won 5 IPL titles. Now from IPL 2027, he will be CSK's Team Mentor. He retired from international cricket in 2020.";
  if (lower.includes("ipl 2027")) return "IPL 2027 schedule is not announced yet! But big news: MS Dhoni retired and will be CSK Mentor. Auction is on Dec 16 in Goa.";
  if (lower.includes("ipl")) return "IPL 2027 is coming! MS Dhoni has retired as player and is now CSK Mentor. Auction on Dec 16 in Goa. Who is your favourite team? CSK? RCB? MI?";

  // --- FOR ALL OTHER QUESTIONS, ASK FREE AI ---
  try {
    let r = await fetch(`https://text.pollinations.ai/${encodeURIComponent("You are Mythrri AI, friendly assistant. Answer short and simple: " + input)}`);
    let text = await r.text();
    // If AI gives limit message, show friendly message
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

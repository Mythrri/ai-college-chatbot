async function getBotReply(input) {
  let lower = input.toLowerCase();
  // GCU COLLEGE ANSWERS - Check these FIRST
if (lower.includes("course") || lower.includes("bca") || lower.includes("bba")) return "At Garden City University, we offer BCA, BBA, B.Com, BSc, BA, MBA, MCA and many more! Which course are you interested in?";
if (lower.includes("admission") || lower.includes("apply") || lower.includes("join")) return "For Admission at GCU: You need 10+2 with 50% marks. You can apply online on gcuniversity.edu.in or visit the campus in Bangalore. Want to know about fees?";
if (lower.includes("timing") || lower.includes("time") || lower.includes("open")) return "Garden City University timings: Monday to Friday, 9:00 AM to 4:30 PM. Saturday: 9:00 AM to 1:00 PM. Library is open till 6 PM!";
if (lower.includes("fee") || lower.includes("fees") || lower.includes("cost")) return "Fees at GCU depend on course. BCA is approx Rs. 1,50,000 per year. For exact fees, contact admissions: admissions@gcuniversity.edu.in";
if (lower.includes("faculty") || lower.includes("teacher") || lower.includes("professor")) return "GCU has experienced faculty with PhD and industry experience. Each department has HODs and mentors to guide you!";
if (lower.includes("hostel") || lower.includes("placement") || lower.includes("location")) return "GCU is located in Bangalore, Karnataka. Yes, we have hostel facility and placement cell with 90%+ placements!";
if (lower.includes("hi") || lower.includes("hello")) return "Hello! 👋 Welcome to Garden City University! I'm your AI Assistant. Ask me about Courses, Admissions, Timings or Fees!";m

if (lower.includes("who is mythrri")) return "I was built by Mythrri! She is a student at Garden City University, Karnataka. She built me with HTML, CSS & JS.";
if (lower.includes("your name")) return "My name is AI Assistant! I am the official assistant for Garden City University.";

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
    let r = await fetch(`https://text.pollinations.ai/${encodeURIComponent(""You are AI Assistant for Garden City University, friendly assistant.... Answer short and simple: " + input)}`);
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
// FIX - Make Enter + Button work always
document.addEventListener('DOMContentLoaded', function() {
  let input = document.getElementById('userInput');
  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') sendMessage();
    });
  }
  let btn = document.querySelector('button');
  if (btn) btn.onclick = sendMessage;
});

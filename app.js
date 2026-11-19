function sendMessage() {
  let input = document.getElementById('userInput');
  let text = input.value.toLowerCase();
  if (!text) return;

  let chat = document.getElementById('chat');
  chat.innerHTML += `<div class="user-msg">${input.value}</div>`;

  let reply = getBotReply(text);
  setTimeout(() => {
    chat.innerHTML += `<div class="bot-msg">🤖 ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }, 500);

  input.value = '';
}

function getBotReply(text) {
  if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
    return "Hello! How can I help you? Ask about fees, courses, hostel, placement.";
  }
  if (text.includes('fees') || text.includes('fee')) {
    return "BSc Computer Science Fees is ₹60,000 per year. MBA Fees is ₹1,20,000 per year.";
  }
  if (text.includes('course') || text.includes('courses')) {
    return "We offer BSc CS, BCA, MBA, MCA, BTech AI. Which course are you interested in?";
  }
  if (text.includes('hostel')) {
    return "Yes, hostel available. ₹80,000 per year with food, WiFi and AC room.";
  }
  if (text.includes('placement') || text.includes('job')) {
    return "Our placement is 92%. Top package is 12 LPA. Companies: TCS, Infosys, Wipro.";
  }
  if (text.includes('admission') || text.includes('apply')) {
    return "Admission is open! You need 10th + 12th marksheets and Aadhaar. Last date is 30th June.";
  }
  if (text.includes('thank')) {
    return "You're welcome! All the best for your studies 😊";
  }
  if (text.includes('bye')) {
    return "Bye! Come back anytime.";
  }
  return "Sorry, I didn't understand. Try asking: fees, courses, hostel, placement, admission";
}

// Allow Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

// Welcome message
window.onload = function() {
  document.getElementById('chat').innerHTML = `<div class="bot-msg">🤖 Hi! I'm your AI College Assistant. Ask me anything about our college!</div>`;
}

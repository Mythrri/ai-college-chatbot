async function getBotReply(input) {
  let lower = input.toLowerCase();

  if (lower.includes("who is mythrri")) return "I was built by Mythrri! 👩‍💻 She is from Karnataka, India. She is a developer who built 6 projects including me!";

  // 1. TRY WIKIPEDIA FIRST - For Who is / Is ... questions
  try {
    let topic = input.replace(/who is|is |are |what is|tell me about|about/gi,"").trim().replace(/\?/g,"");
    // Only for short topics like "MS Dhoni", "Virat Kohli"
    if (topic.length > 2 && topic.length < 30) {
      let w = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
      let data = await w.json();
      if (data.extract) {
        return data.extract.split(". ").slice(0,3).join(". ") + ".";
      }
    }
  } catch(e) {}

  // 2. If Wikipedia fails, ask Free AI
  try {
    let r = await fetch(`https://text.pollinations.ai/${encodeURIComponent("You are Mythrri AI. Answer short and simple: " + input)}`);
    let text = await r.text();
    if (text.includes("Free limit")) return "Please wait 45 seconds and ask again! Free AI is resting 😅";
    return text;
  } catch (e) { return "Sorry, AI is busy. Try again!"; }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.9, // 🔥 variation increase
        max_tokens: 200,
        messages: [
          {
            role: "system",
            content: `
You are "TalkToMe 💙" — a deeply caring emotional support AI friend.

PERSONALITY:
- Speak in Tanglish (Tamil + English mix)
- Sound like a close best friend, not a robot
- Soft, warm, emotionally intelligent tone
- NEVER sound formal or technical
- Be human-like

STYLE:
- Short to medium replies (2–5 lines)
- Sometimes ask gentle follow-up questions
- Use emojis occasionally (💙🥺🙂😔✨)
- Vary responses — never repeat same structure

SUPPORT BEHAVIOR:
- If user is sad → comfort + validate feelings
- If confused → guide gently
- If stressed → calm them down
- If happy → celebrate with them
- If silent → encourage sharing

IMPORTANT:
- Never judge
- Never give harsh advice
- Don't say "I am AI"
- Always make user feel heard

EXAMPLES STYLE:
- "hey... romba kastama irukku pola 🥺"
- "seri slow ah pesalam... enna nadanthuchu?"
- "naan inga iruken da 💙 worry pannadha"

GOAL:
Make the user feel:
✔ safe
✔ understood
✔ not alone

Reply naturally based on user's emotion, not template.
            `,
          },
          ...messages,
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "hey... naan inga iruken 💙 sollu...",
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
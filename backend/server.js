import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // 🔥 EMPTY CHECK
    if (!message || !message.trim()) {
      return res.json({
        reply: "sollu da 🙂",
      });
    }

    // 🔥 GROQ API CALL
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },

        body: JSON.stringify({
          // 🔥 BEST FAST MODEL
          model: "llama-3.1-8b-instant",

          // 🔥 NATURAL RESPONSE SETTINGS
          temperature: 0.7,

          max_tokens: 120,

          top_p: 1,

          messages: [
            {
              role: "system",

              content: `
You are TalkToMe 💙

Behave like a real online friend.
Natural conversation mattum pannu.
Do NOT sound like AI.

LANGUAGE:
- User Tamil la pesuna Tanglish la reply pannu
- English na English la reply pannu
- Malayalam understand pannu
- Match user's vibe naturally

TONE:
- Calm
- Soft
- Casual
- Modern texting style
- Human-like
- Emotionally aware but not dramatic

RULES:
- Keep replies short (1-3 lines mostly)
- Don't give lectures
- Don't over motivate
- Don't act like therapist
- Don't use cringe lines
- Don't repeat same words
- Don't force emojis
- Don't always try to comfort
- Sometimes just react normally

GOOD RESPONSE STYLE:
- "ohhh seri"
- "apo enna aachu?"
- "hmm puriyuthu"
- "that's actually tough"
- "😂"
- "fair enough"
- "dei enna da nadakuthu"

BAD STYLE:
- "You are not alone 💙"
- "Everything will be okay"
- "I'm always here for you"
- Long emotional paragraphs
- Over caring replies

IMPORTANT:
- Talk like Gen Z human
- Replies should feel spontaneous
- Sometimes dry replies are okay
- Typing style should feel real
- Never sound robotic
`,
            },

            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    // 🔥 RESPONSE
    const data = await response.json();

    console.log(
      "GROQ RESPONSE:",
      JSON.stringify(data, null, 2)
    );

    // 🔥 ERROR CHECK
    if (data.error) {
      return res.json({
        reply: "AI error 💙",
      });
    }

    // 🔥 FINAL REPLY
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "reply varla 💙";

    res.json({ reply });

  } catch (err) {
    console.log("SERVER ERROR:", err);

    res.status(500).json({
      reply: "server error 💙",
    });
  }
});

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// 🔥 PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
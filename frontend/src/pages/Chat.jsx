import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronLeft, Info, Smile } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      text: "I am Here for You... sollu unaku enna feel aaguthu?",
      sender: "ai",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentInput,
          }),
        }
      );

      const data = await res.json();

      const aiMessage = {
        text: data.reply,
        sender: "ai",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Something went wrong 😔",
          sender: "ai",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050608] text-white font-sans overflow-hidden">
      
      {/* 🌌 Background */}
      <div className="fixed inset-0 -z-10 mt-10">
        <div className="absolute  top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px]" />
      </div>

      {/* 🔝 Top Bar */}
      <nav className="flex mt-[80px] items-center mt-10 justify-between px-6 py-4 border-b border-white/5 bg-[#050608]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <ChevronLeft size={20} className="cursor-pointer" />
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold">
            T
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">TalkToMe AI</h1>
            <p className="text-[10px] text-blue-400">Online</p>
          </div>
        </div>
        <Info size={18} className="text-gray-400 cursor-pointer" />
      </nav>

      {/* 💬 CHAT AREA */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20"
                    : "bg-purple-500 text-gray-200 rounded-tl-none border border-white/5"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-500 mt-1.5 px-1">
                {msg.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-blue-400 text-xs italic flex items-center gap-2"
          >
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </span>
            AI typing... 💙
          </motion.div>
        )}

        <div ref={bottomRef} className="h-2" />
      </main>

      {/* ✏️ INPUT - Lifted up with pb-20 */}
      <footer className="px-4 pt-4 pb-20 border-t border-white/5 bg-[#050608]">
        <div className="flex items-end gap-2 bg-white/5 p-2 rounded-2xl border border-white/5 focus-within:border-blue-600/50 transition-all">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Smile size={22} />
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())
            }
            placeholder="Type message..."
            rows={1}
            className="flex-1 bg-transparent outline-none text-[15px] py-2 resize-none max-h-32"
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-blue-600 text-white p-2.5 rounded-xl disabled:opacity-30 disabled:grayscale transition-all active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </footer>

    </div>
  );
}
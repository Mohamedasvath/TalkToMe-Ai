import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingAIButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        duration: 0.4,
      }}
      onClick={() => navigate("/chat")}
      className="
        fixed
        bottom-24
        right-5
        z-[120]
        w-16
        h-16
        rounded-full
        bg-gradient-to-br
        from-indigo-500
        to-pink-500
        shadow-[0_0_40px_rgba(99,102,241,0.5)]
        flex
        items-center
        justify-center
        text-white
      "
    >
      <MessageCircleHeart size={28} />

      {/* Pulse */}
      <span className="absolute inset-0 rounded-full animate-ping bg-indigo-400/30" />
    </motion.button>
  );
}
import { motion } from "framer-motion";

const items = [
  {
    title: "Calm",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    color: "from-blue-500/30",
  },
  {
    title: "Focus",
    img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
    color: "from-purple-500/30",
  },
  {
    title: "Sleep",
    img: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
    color: "from-indigo-500/30",
  },
  {
    title: "Meditation",
    img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
    color: "from-emerald-500/30",
  },
];

const Horizontal = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-white tracking-tight">
      Explore
    </h3>

    <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
      {items.map((i) => (
        <motion.div
          key={i.title}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="relative min-w-[240px] h-48 rounded-2xl overflow-hidden cursor-pointer snap-start group"
        >
          {/* Image */}
          <img
            src={i.img}
            alt={i.title}
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Soft glow effect */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-t ${i.color} to-transparent`}
          />

          {/* Content */}
          <div className="absolute bottom-3 left-3 right-3">
            <h4 className="text-white text-lg font-semibold">
              {i.title}
            </h4>
            <p className="text-xs text-gray-300">
              Tap to start session
            </p>
          </div>

          {/* Border glow */}
          <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/30 transition" />
        </motion.div>
      ))}
    </div>
  </div>
);

export default Horizontal;
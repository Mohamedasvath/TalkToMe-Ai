export default function Community() {
  const quotes = [
    "You’re stronger than you think 💙",
    "This feeling is temporary 🌿",
    "Take one step at a time 🚶‍♂️",
    "You are not alone 🤝",
    "It’s okay to not be okay sometimes 💫",
  ];

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">

      {/* Header */}
      <h1 className="text-xl font-semibold">Community 💙</h1>

      {/* Quote Cards */}
      {quotes.map((quote, index) => (
        <div
          key={index}
          className="p-4 bg-gray-900 rounded-2xl shadow-md"
        >
          <p className="text-sm text-gray-300 italic">
            “{quote}”
          </p>
        </div>
      ))}

    </div>
  );
}
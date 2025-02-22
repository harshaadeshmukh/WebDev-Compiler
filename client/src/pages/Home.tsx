export default function Home() {
  return (
    <div
      className="w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center border-2 flex-col gap-5"
      style={{
        backgroundColor: "#000", // Optional: Dark background for better glow contrast
      }}
    >
      {/* Glowing Heading */}
      <h1
        className="text-6xl font-bold"
        style={{
          textShadow:
            "0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(0, 255, 255, 0.6), 0 0 24px rgba(0, 255, 255, 0.4)",
        }}
      >
        Web Compiler
      </h1>

      {/* Glowing Paragraph */}
      <p
        className="text-gray-500 text-center"
        style={{
          textShadow: "0 0 5px rgba(200, 200, 255, 0.5)",
        }}
      >
        Compile HTML, CSS, JavaScript code on the go and share it with your friends
      </p>
    </div>
  );
}

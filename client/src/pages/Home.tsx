import { FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";

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
        Compile HTML, CSS, and JavaScript code on the go and share it with your
        friends.
      </p>

      {/* Learning Resources Section */}
      <div className="mt-8 text-center">
        <h2
          className="text-4xl font-semibold mb-4"
          style={{
            textShadow:
              "0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(0, 255, 255, 0.6), 0 0 24px rgba(0, 255, 255, 0.4)",
          }}
        >
          Learn HTML, CSS, and JavaScript
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          New to web development? Check out these tutorials on GeeksforGeeks to
          get started:
        </p>

        <div className="flex justify-center items-center gap-x-12">
          <a
            href="https://www.w3schools.com/html/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <FaHtml5 size={50} color="#E34F26" />
          </a>
          <a
            href="https://www.w3schools.com/css/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <FaCss3Alt size={50} color="#1572B6" />
          </a>
          <a
            href="https://www.w3schools.com/js/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <FaJsSquare size={50} color="#F7DF1E" />
          </a>
        </div>
      </div>
    </div>
  );
}

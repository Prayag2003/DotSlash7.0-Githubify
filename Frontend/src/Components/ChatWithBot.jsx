import { useState } from "react";

const ChatWithBot = () => {
  const [userInput, setUserInput] = useState("Hello World 👋");
  const [botResponse, setBotResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleChatWithBot = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask_question", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // credentials: 'include',
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setBotResponse(data.answer);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while processing the request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer className="text-gray-600 body-font h-96">
        <div className="text-center w-full mb-20">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              id="user_input"
              name="user_input"
              value={userInput}
              onChange={handleInputChange}
              className="w-full bg-opacity-50 rounded-2xl border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <button
              onClick={handleChatWithBot}
              className="text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded text-md mb-4 mt-4"
            >
              Go
            </button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {botResponse && (
              <div className="mt-4 text-2xl text-gray-900">
                Bot Response: {botResponse}
              </div>
            )}
          </div>
        </div>
      </footer>
    </>
  );
};

export default ChatWithBot;

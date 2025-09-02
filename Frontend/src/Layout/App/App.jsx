import { useState, useEffect } from "react";
import { useMessageStore } from "../../store";
import "./App.css";
import InputZone from "../inputZone/InputZone";
import ChatList from "../ChatList/ChatList";
import AssistantAnswer from "../AssistantAnswer/AssistantAnswer";

function App() {
  const {
    addMessage,
    getCurrentMessages,
    animatedMessages,
    markMessageAsAnimated,
  } = useMessageStore();

  const currentMessages = getCurrentMessages();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }, [currentMessages]);

  const fetchAnswer = async () => {
    if (!inputValue.trim()) return;

    addMessage({ text: inputValue, role: "User" });
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b:free",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: inputValue,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const responseText =
        data.choices?.[0]?.message?.content || "No answer received";
      addMessage({ text: responseText, role: "Assistant" });
    } catch (error) {
      console.error("Error fetching answer:", error);
      addMessage({ text: "Error getting response", role: "Assistant" });
    } finally {
      setInputValue("");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <div className="dialogWindow">
        {currentMessages.map((message, index) => (
          <div key={index} className={"message" + " " + "From" + message.role}>
            {message.role === "Assistant" ? (
              <AssistantAnswer
                text={message.text}
                messageId={message.id || index}
                isAnimated={animatedMessages.has(message.id || index)}
                onAnimationComplete={() =>
                  markMessageAsAnimated(message.id || index)
                }
              />
            ) : (
              message.text
            )}
          </div>
        ))}
      </div>

      <InputZone
        fetchAnswer={fetchAnswer}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
      />
      <ChatList />
    </div>
  );
}
import Logo from "../AssistantAnswer/AssistantAnswer";

export default App;

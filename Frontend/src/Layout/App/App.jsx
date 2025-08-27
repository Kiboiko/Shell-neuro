import { useState } from "react";
import { Input, message, Button, Space, List } from "antd";
import { useMessageStore } from "../../store";
import "./App.css";
import InputZone from "../InputZone";
import ChatList from "../ChatList/ChatList";

function App() {
  const {
    chats,
    currentChatId,
    createChat,
    deleteChat,
    setCurrentChat,
    renameChat,
    addMessage,
    getCurrentChat,
    getCurrentMessages,
    getChatsList,
  } = useMessageStore();

  const currentChat = getCurrentChat();
  const currentMessages = getCurrentMessages();

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnswer = async () => {
    addMessage({ text: inputValue, role: "User" });
    setIsLoading(true);
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
                  text: inputValue || "How are you?",
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
    setInputValue("");
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <div className="dialogWindow">
        {currentMessages.map((message, index) => (
          <div key={index} className={"message" + " " + "From" + message.role}>
            <strong>{message.role}:</strong> {message.text}
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

export default App;

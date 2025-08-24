import { useState } from "react";
import { Input, message } from "antd";
import "./App.css";

function App() {
  const [dialog, setDialog] = useState([
    {
      text: "Hello,World!",
      role: "Assistant",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (newMessage) => {
    setDialog((prevDialog) => [...prevDialog, newMessage]);
  };
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
        {dialog.map((message, index) => (
          <div key={index} className={"message" + " " + "From" + message.role}>
            <strong>{message.role}:</strong> {message.text}
          </div>
        ))}
      </div>
      <Input
        placeholder="Basic usage"
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={fetchAnswer}
        disabled={isLoading}
        style={{
          width: "70%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </div>
  );
}

export default App;

import { ArrowUpOutlined } from "@ant-design/icons";
import { Input, message, Button, Space } from "antd";
import "./InputZone.css";
export default function InputZone({
  fetchAnswer,
  inputValue,
  handleInputChange,
  isLoading,
}) {
  return (
    <div className="inputZone">
      <Input.TextArea
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={fetchAnswer}
        disabled={isLoading}
        autoSize
        style={{
          minHeight: "5vh",
          maxHeight: "20vh",
          backgroundColor: "#4C5C68",
          color: isLoading ? "#46494C" : "#DCDCDD",
        }}
        variant="borderless"
        placeholder="Message neuro"
        size="large"
      />
      <Button
        type="primary"
        style={{
          width: "5vh",
          height: "5vh",
          marginBottom: "0",
          marginTop: "auto",
          borderRadius: "50%",
          backgroundColor: inputValue.length > 0 ? "#1985A1" : null,
          color: "#DCDCDD",
        }}
        onClick={fetchAnswer}
        disabled={isLoading || inputValue.length <= 0}
      >
        <ArrowUpOutlined />
      </Button>
    </div>
  );
}

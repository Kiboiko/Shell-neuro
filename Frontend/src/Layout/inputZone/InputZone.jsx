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
    <div style={{}} className="inputZone">
      <Input.TextArea
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={fetchAnswer}
        disabled={isLoading}
        autoSize
        style={{
          minHeight: "5vh",
          maxHeight: "20vh",
          backgroundColor: "#9DB5B2",
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
        }}
        onClick={fetchAnswer}
        disabled={!(inputValue.length > 0)}
      >
        <ArrowUpOutlined />
      </Button>
    </div>
  );
}

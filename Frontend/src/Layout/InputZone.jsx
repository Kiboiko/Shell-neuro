import { ArrowUpOutlined } from "@ant-design/icons";
import { Input, message, Button, Space } from "antd";

export default function InputZone({
  fetchAnswer,
  inputValue,
  handleInputChange,
  isLoading,
}) {
  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "stretch",
        minHeight: "5vh",
        marginBottom: "5vh",
        border: "1px solid black",
        justifyContent: "center",
      }}
    >
      <Input.TextArea
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={fetchAnswer}
        disabled={isLoading}
        autoSize
        style={{ minHeight: "5vh", maxHeight: "20vh" }}
      />
      <Button
        type="primary"
        style={{
          width: "10%",
          height: "5vh",
          marginBottom: "auto",
          marginTop: "auto",
        }}
        onClick={fetchAnswer}
      >
        <ArrowUpOutlined />
      </Button>
    </div>
  );
}

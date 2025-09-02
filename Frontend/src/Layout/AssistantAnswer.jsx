const logoStyle = {
  display: "inline-block",
  border: "1px solid #C5C3C6",
  padding: "7px",
  borderRadius: "50%",
  width: "1rem",
  height: "1rem",
  textAlign: "center",
  backgroundColor: "#1985A1",
  color: "#C5C3C6",
};

const textStyle = {
  position: "relative",
  left: "calc(1rem + 20px)",
  top: "calc(-1rem - 7px)",
};

export default function AssistantAnswer({ text }) {
  return (
    <>
      <div style={logoStyle}>N</div>
      <div style={textStyle}>{text}</div>
    </>
  );
}

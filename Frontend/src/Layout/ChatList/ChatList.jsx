import { List, Button, Space, Dropdown } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useMessageStore } from "../../store";
import "./chatList.css";

export default function ChatList() {
  const { chats, createChat, deleteChat, setCurrentChat, getChatsList } =
    useMessageStore();

  const getMenuItems = (chat) => [
    {
      key: "open",
      label: "Открыть",
      icon: <EyeOutlined />,
      onClick: () => setCurrentChat(chat.id),
    },
    {
      key: "delete",
      label: "Удалить",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => deleteChat(chat.id),
    },
  ];

  return (
    <div className="sideBar">
      <Button
        onClick={createChat}
        type="dashed"
        style={{ marginTop: "10px", width: "100%" }}
      >
        + Создать новый чат
      </Button>

      <List
        bordered
        dataSource={getChatsList()}
        renderItem={(chat) => (
          <List.Item
            style={{ padding: "8px 12px" }}
            actions={[
              <Dropdown
                menu={{ items: getMenuItems(chat) }}
                trigger={["click"]}
                placement="bottomLeft"
                key="dropdown"
              >
                <Button
                  type="text"
                  icon={<MoreOutlined />}
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>,
            ]}
          >
            <div
              style={{
                cursor: "pointer",
                width: "100%",
                padding: "4px 0",
              }}
              onClick={() => setCurrentChat(chat.id)}
            >
              <Space direction="vertical" size={2} style={{ width: "100%" }}>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {chat.title}
                </span>
                <span style={{ color: "#666", fontSize: "12px" }}>
                  {chat.messages.length} сообщений
                </span>
              </Space>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

import { List, Button, Space, Dropdown, Input } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useMessageStore } from "../../store";
import "./chatList.css";

export default function ChatList() {
  const {
    chats,
    createChat,
    deleteChat,
    setCurrentChat,
    getChatsList,
    renameChat,
    getCurrentChat,
  } = useMessageStore();

  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const startEditing = (chat) => {
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
  };

  const saveEdit = () => {
    if (editTitle.trim() && editingChatId) {
      renameChat(editingChatId, editTitle.trim());
      setEditingChatId(null);
      setEditTitle("");
    }
  };

  const cancelEdit = () => {
    setEditingChatId(null);
    setEditTitle("");
  };

  const getMenuItems = (chat) => [
    {
      key: "open",
      label: "Открыть",
      icon: <EyeOutlined />,
      onClick: () => setCurrentChat(chat.id),
    },
    {
      key: "rename",
      label: "Переименовать",
      icon: <EditOutlined />,
      onClick: () => startEditing(chat),
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
      <h1>Neuro</h1>
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
            style={{
              padding: "8px 12px",
              backgroundColor:
                chat.id === getCurrentChat().id ? "grey" : "white",
            }}
            actions={[
              editingChatId === chat.id ? (
                <Space>
                  <Button
                    type="text"
                    icon={<CheckOutlined />}
                    size="small"
                    onClick={saveEdit}
                    style={{ color: "#52c41a" }}
                  />
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    size="small"
                    onClick={cancelEdit}
                    style={{ color: "#ff4d4f" }}
                  />
                </Space>
              ) : (
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
                </Dropdown>
              ),
            ]}
          >
            <div
              style={{
                cursor: editingChatId === chat.id ? "default" : "pointer",
                width: "100%",
                padding: "4px 0",
              }}
              onClick={
                editingChatId === chat.id
                  ? undefined
                  : () => setCurrentChat(chat.id)
              }
            >
              <Space direction="vertical" size={2} style={{ width: "100%" }}>
                {editingChatId === chat.id ? (
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onPressEnter={saveEdit}
                    onBlur={saveEdit}
                    autoFocus
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                  />
                ) : (
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {chat.title}
                  </div>
                )}
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

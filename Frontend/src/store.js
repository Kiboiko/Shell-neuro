import { message } from "antd";
import { create } from "zustand";

export const useMessageStore = create((set, get) => ({
  chats: [
    {
      id: 1,
      title: "1 чат",
      messages: [
        {
          // text: "Hello, World!",
          // role: "Assistant",
        },
      ],
    },
  ],
  animatedMessages: new Set(),
  currentChatId: 1,
  createChat: (title = "Новый чат") =>
    set((state) => {
      const newChatId =
        state.chats.length > 0
          ? Math.max(...state.chats.map((chat) => chat.id)) + 1
          : 1;

      const newChat = {
        id: newChatId,
        title: String(newChatId) + " чат",
        messages: [],
      };

      return {
        chats: [...state.chats, newChat],
        currentChatId: newChatId,
      };
    }),
  deleteChat: (chatId) =>
    set((state) => {
      const filteredChats = state.chats.filter((chat) => chat.id !== chatId);
      const newCurrentChatId =
        filteredChats.length > 0 ? filteredChats[0].id : null;

      return {
        chats: filteredChats,
        currentChatId: newCurrentChatId,
      };
    }),

  setCurrentChat: (chatId) =>
    set({
      currentChatId: chatId,
    }),

  renameChat: (chatId, newTitle) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      ),
    })),

  addMessage: (message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === state.currentChatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    })),

  getCurrentChat: () => {
    const { chats, currentChatId } = get();
    return chats.find((chat) => chat.id === currentChatId);
  },

  getCurrentMessages: () => {
    const currentChat = get().getCurrentChat();
    return currentChat ? currentChat.messages : [];
  },

  getChatsList: () => {
    const { chats } = get();
    return chats;
  },

  markMessageAsAnimated: (messageId) => {
    set((state) => {
      const newAnimatedMessages = new Set(state.animatedMessages);
      newAnimatedMessages.add(messageId);
      return { animatedMessages: newAnimatedMessages };
    });
  },

  clearAnimatedMessages: () => {
    set({ animatedMessages: new Set() });
  },
}));

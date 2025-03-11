import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  currentChatId: null,
  chatCount: 0,
  tokenInfo: null,
  maxChats: 7,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state) => {
      if (state.chats.length < state.maxChats) {
        state.chatCount++;
        const newChat = {
          id: nanoid(),
          name: `Chat ${state.chatCount}`,
          messages: [],
        };
        state.chats.push(newChat);
        state.currentChatId = newChat.id;
      }
    },
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message, type } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.messages.push({ text: message, type: type });
      }
    },
    updateLastBotMessage: (state, action) => {
      const { chatId, newMessage } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat && chat.messages.length > 0) {
        const lastMessageIndex = chat.messages.length - 1;
        if (chat.messages[lastMessageIndex].type === "bot") {
          chat.messages[lastMessageIndex].text = newMessage;
        }
      }
    },
    deleteChat: (state, action) => {
      const chatIdToDelete = action.payload;

      // Prevent deleting Chat 1
      if (state.chats.length > 1 && state.chats[0].id !== chatIdToDelete) {
        state.chats = state.chats.filter((chat) => chat.id !== chatIdToDelete);

        // Recalculate chat numbers
        state.chats.forEach((chat, index) => {
          chat.name = `Chat ${index + 1}`;
        });
        state.chatCount = state.chats.length;

        if (state.currentChatId === chatIdToDelete) {
          state.currentChatId =
            state.chats.length > 0 ? state.chats[0].id : null;
        }
      }
    },
    clearChat: (state, action) => {
      const chatIdToClear = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatIdToClear);
      if (chat) {
        chat.messages = []; // Clear the messages array
      }
    },
    setTokenInfo: (state, action) => {
      state.tokenInfo = action.payload;
    },
    reorderChatNumbers: (state) => {
      state.chats.forEach((chat, index) => {
        chat.name = `Chat ${index + 1}`;
      });
      state.chatCount = state.chats.length; // Update chatCount to match the reordered chats
    },
    initializeChat: (state) => {
      if (state.chats.length === 0) {
        state.chatCount = 1;
        const newChat = {
          id: nanoid(),
          name: `Chat ${state.chatCount}`,
          messages: [],
        };
        state.chats.push(newChat);
        state.currentChatId = newChat.id;
      } else {
        state.currentChatId = state.chats[0].id;
      }
    },
  },
});

export const {
  addChat,
  setCurrentChat,
  addMessage,
  updateLastBotMessage,
  deleteChat,
  clearChat, // Export the new clearChat action
  setTokenInfo,
  reorderChatNumbers,
  initializeChat,
} = chatSlice.actions;

export const selectChats = (state) => state.chat.chats;
export const selectCurrentChatId = (state) => state.chat.currentChatId;
export const selectCurrentChat = (state) => {
  if (!state.chat.currentChatId) return null;
  return state.chat.chats.find((chat) => chat.id === state.chat.currentChatId);
};

export const selectTokenInfo = (state) => state.chat.tokenInfo;

export default chatSlice.reducer;

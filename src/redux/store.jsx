import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import toolReducer from "./toolSlice";
import historyReducer from "./historySlice";


const authPersistConfig = {
  key: "tool",
  storage,
};

const chatPersistConfig = {
  key: "chat",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  chat: persistedChatReducer,
  tool: toolReducer,
  history: historyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counterSlice';

// 创建 Redux store
const store = configureStore({
  reducer: {
    counter: counterReducer,  // 添加 reducer
  },
});

// 定义 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
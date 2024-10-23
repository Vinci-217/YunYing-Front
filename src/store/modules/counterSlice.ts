import { createSlice } from '@reduxjs/toolkit';

// 定义 Counter 状态的类型
interface CounterState {
  value: number;
}

// 设置初始状态
const initialState: CounterState = {
  value: 0,
};

// 创建 counterSlice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 导出 actions 和 reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
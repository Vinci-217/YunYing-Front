import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { increment, decrement } from '@/store/modules/counterSlice'

const Home: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value); // 获取状态
  const dispatch = useAppDispatch();  // 获取 dispatch
  const navigate = useNavigate();  // 使用 useNavigate 钩子

  const goToAbout = () => {
    navigate('/about');  // 跳转到 /about
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <p>count: {count}</p>
      <button onClick={goToAbout}>go to About</button>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Home;
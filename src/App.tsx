import React from 'react';
import './App.scss';
import AppRouter from '@/router/index';  // 引入 router 配置
import { ConfigProvider } from 'antd';

const App: React.FC = () => {
  return (
    <div className="App">
      <ConfigProvider theme={{ 
          token: { 
            colorPrimary: '#1677ff' ,
            borderRadius: 8,
          } 
        }}>
        <AppRouter />
      </ConfigProvider>
    </div>
  );
}

export default App;

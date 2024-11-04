import React from 'react';
import './App.scss';
import AppRouter from '@/router/index';  // 引入 router 配置
import { ConfigProvider } from 'antd';
import { ThemeProvider } from '@/hooks/theme';

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider>
        <ConfigProvider theme={{ 
            token: { 
              colorPrimary: '#1677ff' ,
              borderRadius: 8,
            } 
          }}>
          <AppRouter />
        </ConfigProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

// ThemeToggle.tsx
// 封装一个主题颜色切换按钮（深色和浅色两种模式）
import React, { useState, useEffect } from 'react';
import './ThemeToggle.scss';
import logoIcons from '@/assets/logo';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    // 将主题色配置存入浏览器本地
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='toggle-btn' onClick={toggleTheme}>
      {
        isDarkMode ? 
          (<div className='dark-mode'>
            <div className='img'>
              <img src={logoIcons['darkMode']} 
                style={{width: '100%', height: '100%', paddingTop: '5px'}}></img>
            </div>
          </div>)
          : 
          (<div className='light-mode'>
            <div className='img'>
              <img src={logoIcons['lightMode']} 
                style={{width: '100%', height: '100%', paddingTop: '5px'}}></img>
            </div>
          </div>)
      }
    </div>)
};

export default ThemeToggle;
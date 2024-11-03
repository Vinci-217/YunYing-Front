// Logo.tsx
// 封装Logo组件，用于svg图切换
import React, { useEffect, useState } from 'react';
import './Logo.scss';

interface LogoProps {
  darkLogo: string;
  lightLogo: string;
  altText?: string; // 可选的alt属性文本
}

const Logo: React.FC<LogoProps> = ({ darkLogo, lightLogo, altText = 'Logo' }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    });
   
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <img
      src={isDarkMode ? darkLogo : lightLogo}
      alt={altText}
      className="logo"
    />
  );
};

export default Logo;
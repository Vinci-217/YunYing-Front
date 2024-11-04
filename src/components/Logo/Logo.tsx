// Logo.tsx
// 封装Logo组件，用于svg图切换
import React from 'react';
import './Logo.scss';
import { useTheme } from '@/hooks/theme';

interface LogoProps {
  darkLogo: string;
  lightLogo: string;
  altText?: string; // 可选的alt属性文本
}

const Logo: React.FC<LogoProps> = ({ darkLogo, lightLogo, altText = 'Logo' }) => {
  const { isDarkMode } = useTheme();

  return (
    <img
      src={isDarkMode ? darkLogo : lightLogo}
      alt={altText}
      className="logo"
    />
  );
};

export default Logo;
// lottie动画组件

import React from 'react';
import Player from 'lottie-react';

interface LottieAnimationProps {
    animationData: object; // Lottie 动画的 JSON 数据
    width?: string;        // 动画宽度
    height?: string;       // 动画高度
    loop?: boolean;        // 是否循环播放
    autoplay?: boolean;    // 是否自动播放
    minWidth?: string;     // 最小宽度
    maxWidth?: string;     // 最大宽度
    className?: string;    // 类名
    onClick?: () => void;  // 点击事件处理函数
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
    animationData,
    width = '50vw',
    height = 'auto',
    loop = true,
    autoplay = true,
    minWidth = '100px',
    maxWidth = '300px',
    className = '',
    onClick = () => {}
}) => {
    return (
      <div onClick={onClick} className={className} style={{ width, height, minWidth, maxWidth, overflow: 'hidden' }}>
        <Player
            autoplay={autoplay}
            loop={loop}
            animationData={animationData}
            style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
};

export default LottieAnimation;
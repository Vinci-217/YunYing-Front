// 开发者排名页面

import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import './index.scss'

// 导入icon
import icons from '@/assets/icons/index';

// 导入lottie动画
import LottieAnimation from '@/components/LottieAnimation/LottieAnimation';
import AnimationCrown from '@/assets/lottie-animation/animation-crown.json'; 
import AnimationSilverCoin from '@/assets/lottie-animation/animation-silver-coin.json';
import AnimationBronzeCoin from '@/assets/lottie-animation/animation-bronze-coin.json';
import AnimationCongratulation from '@/assets/lottie-animation/animation-congratulation.json';
import AnimationGoldMedal from '@/assets/lottie-animation/animation-gold-medal.json';
import AnimationSilverMedal from '@/assets/lottie-animation/animation-silver-medal.json';
import AnimationBronzeMedal from '@/assets/lottie-animation/animation-bronze-medal.json';


// 导入自定义组件
import DeveloperCard from '@/components/DeveloperCard/DeveloperCard';

const { Header, Sider, Content } = Layout;

interface SelectedItemsState {
  field: string | null;
  country: string | null;
}

interface Developer {
  rank?: number;
  avatar?: string;
  name?: string;
  followers?: number;
  rate?: number;
  grade?: string;
  repo?: number;
}

const TalentRank: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 模拟获取数据的函数
  const fetchMoreDevelopers = async () => {
    console.log('获取数据');  
  };

  // 检测是否滚动到右边界
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    if (scrollWidth - scrollLeft <= clientWidth + 5) { // 接近右边界时加载
        fetchMoreDevelopers();
    }
  };

  useEffect(() => {
    fetchMoreDevelopers(); // 初始加载数据
  }, []);

  const {
    token: { colorPrimaryBg, borderRadiusLG, colorPrimaryHover },
  } = theme.useToken();
  

  const [selectedItems, setSelectedItems] = useState<SelectedItemsState>({
    field: null,
    country: null,
  });

  const handleClick = (category: 'field' | 'country', key: string) => {    
    setSelectedItems((prevState) => {
      if (prevState[category] === key) {
        return {
         ...prevState,
          [category]: null,
        };
      }
      return{
      ...prevState,
      [category]: key,}
    });
  };

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  const [collapsed, setCollapsed] = useState(false);

  const [developers, setDevelopers] = useState<Developer[]>([
    {
      rank: 1,
      avatar: 'https://avatars.githubusercontent.com/u/10245193?s=200&v=4',
      name: '鱿鱼洗',
      followers:100000,
      rate: 5,
      grade: 's',
      repo: 1000,
    },
    {
      rank: 2,
      avatar: 'https://avatars.githubusercontent.com/u/10245193?s=200&v=4',
      name: '卡松哇',
      followers:100,
      rate: 4.5,
      grade: 's',
      repo: 1000,
    },
    {
      rank: 3,
      avatar: 'https://avatars.githubusercontent.com/u/10245193?s=200&v=4',
      name: '卡松',
      followers:900,
      rate: 4,
      grade:'s',
      repo: 1000,
    },
    {
      rank: 4,
      avatar: 'https://avatars.githubusercontent.com/u/10245193?s=200&v=4',
      name: '卡松哥哥',
      followers:900,
      rate: 3.5,
      grade:'a',
      repo: 1000,
    },
    {
      rank: 5,
      avatar: 'https://avatars.githubusercontent.com/u/10245193?s=200&v=4',
      name: '鱿鱼洗净',
      followers:900,
      rate: 3,
      grade:'a',
      repo: 1000,
    },
    {
      rank: 6,
      avatar: 'https://avatars.githubusercontent.com/u/10245193?s=200&v=4',
      name: '尤雨溪',
      followers:900,
      rate: 2.5,
      grade:'b',
      repo: 1000,
    },
    {
      rank: 7,
      avatar: 'https://avatars.githubusercontent.com/u/10245193?s=200&v=4',
      name: '尤雨溪大佬',
      followers:900,
      rate: 1.5,
      grade:'c',
      repo: 1000,
    },
    {
      rank: 8,
      avatar: 'https://avatars.githubusercontent.com/u/10245193?s=200&v=4',
      name: '卡颂大佬',
      followers:900,
      rate: 1,
      grade:'d',
      repo: 1000,
    },
  ]);

  // 使用 items 定义菜单项
  const items: MenuProps['items'] = [
    {
      key: 'field',
      label: '按领域筛选',
      icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
      children: [
        {
          key: 'frontend',
          label: '前端开发',
          icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
          onClick: () => handleClick('field', 'frontend'),
        },
        {
          key: 'backend',
          label: '后端开发',
          icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
          onClick: () => handleClick('field', 'backend'),
        },
        {
          key: 'blockchain',
          label: '区块链',
          icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
          onClick: () => handleClick('field', 'blockchain'),
        },
        {
          key: 'ai',
          label: '人工智能',
          icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
          onClick: () => handleClick('field', 'ai'),
        },
      ],
    },
    {
      key: 'country',
      label: '按国家筛选',
      icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
      children: [
        {
          key: 'china',
          label: '中国',
          icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
          onClick: () => handleClick('country', 'china'),
        },
        {
          key: 'usa',
          label: '美国',
          icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
          onClick: () => handleClick('country', 'usa'),
        },
        {
          key: 'japan',
          label: '日本',
          icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
          onClick: () => handleClick('country', 'japan'),
        },
        {
          key: 'uk',
          label: '英国',
          icon: <img src={icons['lingyu']} alt="frontend" style={{ width: 16, height: 16 }} />,
          onClick: () => handleClick('country', 'uk'),
        },
      ],
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className='header' style={{
        background: colorPrimaryHover,
      }}>
          <div className='left'></div>
          <div className='center'></div>
          <div className='right'></div>
      </Header>
      <Layout>
        <Sider width={200} 
          theme='light'
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[selectedItems.field, selectedItems.country].filter((key): key is string => key !== null)}
            items={items} // 使用 items 属性
          />
        </Sider>

        <Content style={{ padding: '10px', background: '#fff'}}>
          <div className='outer' style={{
            background: colorPrimaryBg,
            borderRadius: borderRadiusLG,
          }}>
            {/* top3开发者 */}
            <div className='top'>
              <div className='rank2 rank'>
                <LottieAnimation className='silver-coin' animationData={AnimationSilverCoin} width='200px'></LottieAnimation>
                <div className='avatar'>
                  <img src="https://avatars.githubusercontent.com/u/10245193?s=200&v=4"/>
                </div>
                <div className='name'>{developers[1].name}</div>
                <LottieAnimation className='silver-medal' animationData={AnimationSilverMedal} width='120px'></LottieAnimation>
              </div>
              <div className='rank1 rank'>
                <LottieAnimation className='crown' animationData={AnimationCrown} width='200px'></LottieAnimation>
                <div className='avatar'>
                  <img src="https://avatars.githubusercontent.com/u/10245193?s=200&v=4"/>
                </div>
                <div className='name'>{developers[0].name}</div>
                <LottieAnimation className='gold-medal' animationData={AnimationGoldMedal} width='140px'></LottieAnimation>
                <LottieAnimation className='congratulation' animationData={AnimationCongratulation} width='100%'></LottieAnimation>
              </div>
              <div className='rank3 rank'>
                <LottieAnimation className='bronze-coin' animationData={AnimationBronzeCoin} width='200px'></LottieAnimation>
                <div className='avatar'>
                  <img src="https://avatars.githubusercontent.com/u/10245193?s=200&v=4"/>
                </div>
                <div className='name'>{developers[2].name}</div>
                <LottieAnimation className='bronze-medal' animationData={AnimationBronzeMedal} width='120px'></LottieAnimation>
              </div>
              {/* <LottieAnimation animationData={AnimationCrown} width='20%'/> */}
            </div>
            {/* 开发者rank */}
            <div className='bottom'
              ref={containerRef}
              onScroll={handleScroll}>
              {developers.map((dev, index) => (
                <DeveloperCard key={index} className='developer' {...dev} />
              ))}
            </div>
          </div>
         
        </Content>
      </Layout>
    </Layout>
  );
};

export default TalentRank;
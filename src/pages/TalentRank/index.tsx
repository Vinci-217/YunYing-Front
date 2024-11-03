// 开发者排名页面

import React, { useState, useRef, useEffect } from 'react';
import { Select, theme } from 'antd';
import './index.scss'
import Logo from '@/components/Logo/Logo';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { Result } from '@/types/Result';
import { Developer } from '@/types/TalentRank';

import { getFieldList, getNationList, getDeveloperList } from '@/api/path/talentrank';

// 导入icon
import icons from '@/assets/icons/index';
import logoIcons from '@/assets/logo';

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

const { Option } = Select;

interface Developer1 {
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

  // 开发者列表
  const [developers, setDevelopers] = useState<Developer1[]>([
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

  // 分页参数（页码）
  const page: number = 1;

  // 分页参数（数量）
  const pageSize: number = 20;

  const [test, setTest] = useState<Developer[]>([])

  // 获取开发者列表
  const fetchMoreDevelopers = async () => {
    console.log('获取数据');  
    try {
      const result: Result<Developer[]>  = await getDeveloperList(field, nation, page, pageSize);
      console.log('开发者', result);
      // setDevelopers(prevDevelopers => [...prevDevelopers,...result.data]);
    } catch (err) {
      console.error(err);
    }
  };

  // 检测是否滚动到右边界
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    if (scrollWidth - scrollLeft <= clientWidth + 5) { // 接近右边界时加载
        fetchMoreDevelopers();
    }
  };

  // 领域列表
  const [fieldList, setFieldList] = useState<string[]>([]);

  // 获取领域列表
  const fetchFieldList = async () => {
    try {
      const result: Result<string[]>  = await getFieldList();
      console.log('领域', result);
      setFieldList(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 国家列表
  const [nationList, setNationList] = useState<string[]>([]);

  // 获取国家列表
  const fetchNationList = async () => {
    try {
      const result: Result<string[]>  = await getNationList();
      console.log('国家',result);
      setNationList(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMoreDevelopers(); // 初始加载数据

    fetchFieldList();
    fetchNationList();
    console.log(1);
  }, []);

  const fields = ['Frontend', 'Backend', 'Blockchain'];
  const countries = ['China', 'USA', 'UK', 'Germany'];

  // 筛选条件（领域）
  const [field, setField] = useState<string>('');

  // 筛选条件（国家）
  const [nation, setNation] = useState<string>('');

  // 选择器的事件处理函数
  const handleFieldChange = (value: string) => {
    console.log('Selected field:', value);
    // 处理筛选逻辑
  };

  const handleNationChange = (value: string) => {
    console.log('Selected country:', value);
    // 处理筛选逻辑
  };

  return (
    <div className='layout'
      ref={containerRef}
      onScroll={handleScroll}>
      <div className='title'>
        <div className='left'></div>
        <div className='center'>
          <div className='logo1'>
            <Logo darkLogo={logoIcons['githubDark']} lightLogo={logoIcons['githubLight']}></Logo>
          </div>
          <div className='text'>
            Github开发者能力排行榜
          </div>
          <div className='logo2'>
            <Logo darkLogo={logoIcons['rankDark']} lightLogo={logoIcons['rankLight']}></Logo>
          </div>
        </div>
        <div className='right'>
          <ThemeToggle></ThemeToggle>
        </div>
      </div>
      <div className="selector-bar">
        <Select
          placeholder="选择领域"
          onChange={handleFieldChange}
          className='selector'
          style={{marginRight: '10px'}}
        >
          {fields.map((field) => (
            <Option key={field} value={field}>
              {field}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="选择国籍"
          onChange={handleNationChange}
          className='selector'
          style={{marginLeft: '10px'}}
        >
          {countries.map((country) => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Select>
      </div>
      <div className='top3-title'>
        <div className='top3-logo'>
          <Logo darkLogo={logoIcons['top3Dark']} lightLogo={logoIcons['top3Light']}></Logo>
        </div>
        <div className='text'>Top3开发者</div>
      </div>
      <div className='outer'>
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
            <LottieAnimation className='congratulation' animationData={AnimationCongratulation} width='250px' height='350px'></LottieAnimation>
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
        <div className='ranking-title'>
        <div className='ranking-logo'>
          <Logo darkLogo={logoIcons['rankingDark']} lightLogo={logoIcons['rankingLight']}></Logo>
        </div>
        <div className='text'>开发者能力排行榜</div>
      </div>
        {/* 开发者rank */}
        <div className='bottom'>
          <div className='grid'>
            {developers.map((dev, index) => (
              <DeveloperCard key={index} className='developer' {...dev} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentRank;
// 开发者排名页面

import React, { useState, useRef, useEffect } from 'react';
import { Select, Spin } from 'antd';
import './index.scss'
import Logo from '@/components/Logo/Logo';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { Result } from '@/types/Result';
import { Developer } from '@/types/TalentRank';
import { useTheme } from '@/hooks/theme';
import { useNavigate } from 'react-router-dom';

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
import { current } from '@reduxjs/toolkit';

const { Option } = Select;

const TalentRank: React.FC = () => {
  const {isDarkMode} = useTheme();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement | null>(null);

  // 存储上一次滚动位置
  const previousScrollTop = useRef<number>(0);

  // 开发者列表
  const [developers, setDevelopers] = useState<Developer[]>([]);

  // 分页参数（页码）
  const page = useRef<number>(1)

  // 分页参数（数量）
  const pageSize = useRef<number>(20)

  // 开发者列表是否加载中(控制显示加载小图标)
  const [developerLoading, setDeveloperLoading] = useState(false);
  // 是否允许加载（避免频繁调用接口）
  const allowFetchMoreDevelopers = useRef<boolean>(true);
  // 开发者列表骨架屏显示
  const [developerSkeleton, setDeveloperSkeleton] = useState(true);

  // 获取开发者列表
  const fetchMoreDevelopers = async () => {
    console.log('获取数据');  
    try {
      const result: Result<Developer[]>  = await getDeveloperList(field.current, nation.current, page.current, pageSize.current);
      console.log('开发者', result);
      page.current +=1;
      setDevelopers(prevDevelopers => [...prevDevelopers,...result.data]);
    } catch (err) {
      console.error(err);
    } finally{
      setDeveloperLoading(false);
      allowFetchMoreDevelopers.current = true;
      setDeveloperSkeleton(false);
    }
  };

  // 检测是否滚动到了底部
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    // 当前滚动位置
    const currentScrollTop = container.scrollTop;

    // 判断是否滚动方向是向下
    if (currentScrollTop <= previousScrollTop.current) {
      // 更新上一次滚动位置
      previousScrollTop.current = currentScrollTop;
      // 如果是向上滚动，直接返回
      return;
    }

    // 更新上一次滚动位置
    previousScrollTop.current = currentScrollTop;

    console.log('滚动', allowFetchMoreDevelopers.current);
    if(!allowFetchMoreDevelopers.current) return;
    if (container) {
      console.log('scrollHeight', container.scrollHeight);
      console.log('scrollTop', container.scrollTop);
      console.log('clientHeight', container.clientHeight);
      
      const isBottom = container.scrollHeight - container.scrollTop < container.clientHeight+50;
      if (isBottom) {
        // 滚动到底部，加载数据
        console.log('到底部了');
        allowFetchMoreDevelopers.current = false;
        setDeveloperLoading(true);
        // setTimeout(fetchMoreDevelopers, 800);
        fetchMoreDevelopers();
      }
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
  const field = useRef<string>('');

  // 筛选条件（国家）
  const nation = useRef<string>('');

  // 选择器的事件处理函数
  const handleFieldChange = (value: string) => {
    console.log('Selected field:', value);
    // 处理筛选逻辑
    field.current = value;
    page.current = 1;
    allowFetchMoreDevelopers.current = false
    // setDeveloperSkeleton(true);
    fetchMoreDevelopers();
  };

  const handleNationChange = (value: string) => {
    console.log('Selected country:', value);
    // 处理筛选逻辑
    nation.current = value;
    page.current = 1;
    allowFetchMoreDevelopers.current = false
    // setDeveloperSkeleton(true);
    fetchMoreDevelopers();
  };

  return (
    <div className='layout'
      ref={containerRef}
      onScroll={handleScroll}>
      <div className='title'>
        <div className='left'>
          <div className='home-btn' onClick={() => navigate('/')}>
            {
              isDarkMode ? 
                (<div className='dark-mode'>
                  <div className='img'>
                    <img src={logoIcons['homeDark']} 
                      style={{width: '100%', height: '100%', paddingTop: '5px'}}></img>
                  </div>
                </div>)
                : 
                (<div className='light-mode'>
                  <div className='img'>
                    <img src={logoIcons['homeLight']} 
                      style={{width: '100%', height: '100%', paddingTop: '5px'}}></img>
                  </div>
                </div>)
            }
          </div>
        </div>
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
            {/* top3开发者rank2骨架屏 */}
            {developerSkeleton?(
              <div className='avatar-skeleton skeleton-ani'></div>
            ):(
              <div className='avatar'>
                  <img src="https://avatars.githubusercontent.com/u/10245193?s=200&v=4"/>
                </div>
            )}
            {developerSkeleton?(
              <div className='name-skeleton skeleton-ani'></div>
            ):(
              <div className='name'>{developers[0].dev_login}</div>
            )}
            <LottieAnimation className='silver-medal' animationData={AnimationSilverMedal} width='120px'></LottieAnimation>
          </div>
          <div className='rank1 rank'>
            <LottieAnimation className='crown' animationData={AnimationCrown} width='200px'></LottieAnimation>
            {/* top3开发者rank1骨架屏 */}
            {developerSkeleton?(
              <div className='avatar-skeleton skeleton-ani'></div>
            ):(
              <div className='avatar'>
                  <img src="https://avatars.githubusercontent.com/u/10245193?s=200&v=4"/>
                </div>
            )}
            {developerSkeleton?(
              <div className='name-skeleton skeleton-ani'></div>
            ):(
              <div className='name'>{developers[0].dev_login}</div>
            )}
            <LottieAnimation className='gold-medal' animationData={AnimationGoldMedal} width='140px'></LottieAnimation>
            <LottieAnimation className='congratulation' animationData={AnimationCongratulation} width='250px' height='350px'></LottieAnimation>
          </div>
          <div className='rank3 rank'>
            <LottieAnimation className='bronze-coin' animationData={AnimationBronzeCoin} width='200px'></LottieAnimation>
            {/* top3开发者rank3骨架屏 */}
            {developerSkeleton?(
              <div className='avatar-skeleton skeleton-ani'></div>
            ):(
              <div className='avatar'>
                  <img src="https://avatars.githubusercontent.com/u/10245193?s=200&v=4"/>
                </div>
            )}
            {developerSkeleton?(
              <div className='name-skeleton skeleton-ani'></div>
            ):(
              <div className='name'>{developers[0].dev_login}</div>
            )}
            <LottieAnimation className='bronze-medal' animationData={AnimationBronzeMedal} width='120px'></LottieAnimation>
          </div>
        </div>
        <div className='ranking-title'>
        <div className='ranking-logo'>
          <Logo darkLogo={logoIcons['rankingDark']} lightLogo={logoIcons['rankingLight']}></Logo>
        </div>
        <div className='text'>开发者能力排行榜</div>
        </div>
        {/* 开发者rank */}
        <div className='bottom'>
          {/* 开发者卡片列表骨架屏 */}
          {developerSkeleton?(
            <div className='grid'>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
              <div className='developer-skeleton skeleton-ani'></div>
            </div>
          ):(
            <div className='grid'>
              {
                developers.map((dev, index) => (
                  <DeveloperCard key={index} className='developer' rank={index+1} {...dev} />
                ))
              }
            </div>
          )}
        </div>
        {/* 加载动画 */}
        {developerLoading && (
          <div className='loading-icon'><Spin size="large" /></div>
        )}
      </div>
    </div>
  );
};

export default TalentRank;
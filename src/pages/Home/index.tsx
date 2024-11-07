import './index.scss';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { useState, useMemo, useEffect } from 'react';
import Logo from '@/components/Logo/Logo';
import logoIcons from '@/assets/logo';
import { useNavigate } from 'react-router-dom';
import { Input, Spin } from 'antd';
import type { GetProps } from 'antd';
import { useTheme } from '@/hooks/theme';
import { queryDeveloper, insertDeveloper } from '@/api/path/home';
// 导入lottie动画
import LottieAnimation from '@/components/LottieAnimation/LottieAnimation';
import AnimationGithub from '@/assets/lottie-animation/animation-github.json';
import AnimationHomeInsert0 from '@/assets/lottie-animation/animation-home-insert0.json';
import AnimationHomeInsert1 from '@/assets/lottie-animation/animation-home-insert1.json';

import { message } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const Home: React.FC = () => {
  const {isDarkMode} = useTheme();

  // 模式：0-介绍页面 1-搜索开发者 2-添加开发者 3-添加开发者加载动画
  const [mode, setMode] = useState<number>(0);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 添加开发者接口等待动画切换
  const [animationIdx, setAnimationIdx] = useState<number>(0);

  // 查询开发者
  const queryDeveloperByLogin = async (login: string) => {
    try{
      const res = await queryDeveloper(login);
      console.log(res);
      if(res.code === 200){
        navigate('/developer?id='+res.data);
      }else{
        message.error('无该开发者评估报告，请自行添加！');
      }
    }catch(e){
      console.log(e);
    }finally{
      setIsLoading(false);
    }
  }

  // 添加开发者
  const insertDeveloperByLogin = async (login: string) => {
    try{
      setMode(3);
      let interval = setInterval(()=>{
        // setAnimationIdx((animationIdx+1)%2); 这样更新不行！
        setAnimationIdx((prevIdx) => (prevIdx + 1) % 2); // 使用函数式更新
      }, 2000);
      const res = await insertDeveloper({devLogin: login});
      console.log(res);
      clearInterval(interval);
      if(res.code === 200){
        navigate('/developer?id='+res.data);
      }else{
        message.error('添加开发者失败！');
        setMode(2);
      }
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    console.log(animationIdx);
    
  }, [animationIdx])

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if(value === ''){
      message.warning('开发者login不能为空哦～');
      return;
    }
    console.log(value);
    if(mode ===1){
      setIsLoading(true);
      queryDeveloperByLogin(value);
    }else{
      insertDeveloperByLogin(value);
    }
  };

  return (
    <div className='home-layout'>

      {/* 加载动画（查询开发者） */}
      {isLoading && (
        <div className='loading'>
          <Spin size="large">
          </Spin>
        </div>
      )}
      <div className='title'>
        <div className='left'></div>
        <div className='right'>
          <ThemeToggle></ThemeToggle>
        </div>
      </div>
      <div className='content'>
        {mode === 0?(
          // 介绍页面
          <div className='mode0' key='mode0'>
            <div className='animation-outer'>
              <div className='animation-wrapper'>
                <LottieAnimation onClick={()=>navigate('/talentrank')} className='animation-github' animationData={AnimationGithub} width='120px'></LottieAnimation>
                <div className='speech-bubble'>
                  <img src={`${isDarkMode?logoIcons['speechDark']:logoIcons['speechLight']}`}
                    style={{width: '100%', height: '100%'}}></img>
                  <div className='speech-content'>
                    <p>点击我可前往github开发者排行榜页面哦～</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='title'>
              <div className='logo'>
                <Logo darkLogo={logoIcons['githubDark']} lightLogo={logoIcons['githubLight']}></Logo>
              </div>
              <div className='text'>欢迎来到 Github 开发者能力评估应用</div>
            </div>
            <div className='introduction'>
              <p>
                这是由云影1024团队开发的一款基于 GitHub 开源项目数据的开发者评估应用<br/>
                您可以选择通过输入 GitHub Login 来查看该开发者的能力评估报告<br/>
                也可以选择添加您想评估的开发者，我们的算法将快速为您生成评估报告<br/>
                您还可以浏览不同国家不同领域的开发者能力排行榜<br/>
                我们将持续为您提供更全面的开发者能力评估服务，期待您的使用！
              </p>
            </div>
            <div className='btns'>
              <div className='btn1 btn' onClick={() => setMode(1)}>
                查看开发者评估报告
              </div>
              <div className='btn2 btn' onClick={() => setMode(2)}>
                添加开发者评估报告
              </div>
            </div>
          </div>
        ): mode === 1 ?(
          // 搜索开发者
          <div className='mode1' key='mode1'>
            <div className='title'>
              <div>查看开发者评估报告</div>
            </div>
            <div className='introduction'>
              <p>
                在下方输入框输入您要查看的开发者login<br/>
                您将获取到该开发者的能力评估报告
              </p>
            </div>
            <div className='search-wrapper'>
              <Search className='search' placeholder="请输入开发者login" onSearch={onSearch} enterButton 
              size="large"/>
            </div>
            <div className='btns'>
              <div className='btn1 btn' onClick={() => navigate('/talentrank')}>
                查看开发者能力排行榜
              </div>
              <div className='btn2 btn' onClick={() => setMode(2)}>
                添加开发者评估报告
              </div>
            </div>
          </div>
        ): mode === 2 ?(
          // 添加开发者
          <div className='mode2' key='mode2'>
            <div className='title'>
              <div>添加开发者评估报告</div>
            </div>
            <div className='introduction'>
              <p>
                在下方输入框输入您要查看的开发者login<br/>
                我们的算法将为您生成开发者能力评估报告
              </p>
            </div>
            <div className='search-wrapper'>
              <Search className='search' placeholder="请输入开发者login" onSearch={onSearch} enterButton 
              size="large"/>
            </div>
            <div className='btns'>
              <div className='btn1 btn' onClick={() => navigate('/talentrank')}>
                查看开发者能力排行榜
              </div>
              <div className='btn2 btn' onClick={() => setMode(1)}>
                查看开发者评估报告
              </div>
            </div>
          </div>
        ):(
          <div className='mode3' key='mode3'>
            {
              animationIdx === 0?(
                <div className='animation-wrapper'>
                  <LottieAnimation animationData={AnimationHomeInsert0} width='300px' className='ani'></LottieAnimation>
                  <div className='text'>我们的算法正在为您火速生成该开发者评估报告</div>
                </div>
              ):(
                <div className='animation-wrapper'>
                  <LottieAnimation animationData={AnimationHomeInsert1} width='300px' className='ani'></LottieAnimation>
                  <div className='text'>能力评估报告马上生成！请耐心等候～</div>
                </div>
              )
            }
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Home;
import './index.scss';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { useState, useMemo } from 'react';
import Logo from '@/components/Logo/Logo';
import logoIcons from '@/assets/logo';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useTheme } from '@/hooks/theme';
import { queryDeveloper, insertDeveloper } from '@/api/path/home';
// 导入lottie动画
import LottieAnimation from '@/components/LottieAnimation/LottieAnimation';
import AnimationGithub from '@/assets/lottie-animation/animation-github.json';
import { message } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const Home: React.FC = () => {
  const {isDarkMode} = useTheme();

  // 模式：0-介绍页面 1-搜索开发者 2-添加开发者
  const [mode, setMode] = useState<number>(0);

  const navigate = useNavigate();

  // 查询开发者
  const queryDeveloperByLogin = async (login: string) => {
    try{
      const res = await queryDeveloper(login);
      console.log(res);
    }catch(e){
      console.log(e);
    }
  }

  // 添加开发者
  const insertDeveloperByLogin = async (login: string) => {
    try{
      const res = await insertDeveloper({login});
      console.log(res);
    }catch(e){
      console.log(e);
    }
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if(value === ''){
      message.warning('开发者login不能为空哦～');
      return;
    }
    console.log(value);
    if(mode ===1){
      queryDeveloperByLogin(value);
    }else{
      insertDeveloperByLogin(value);
    }
  };

  return (
    <div className='home-layout'>
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
        ):(
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
        )}
      </div>
    </div>
  );
};

export default Home;
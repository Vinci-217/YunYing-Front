import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout, Card, Typography, Space, Row, Col, Avatar, Button, Drawer,Tabs  } from 'antd';
import { GithubOutlined, BarChartOutlined, SunOutlined, OpenAIOutlined, DoubleRightOutlined, UserOutlined, GlobalOutlined, MailOutlined, CodeOutlined, UsergroupAddOutlined, TeamOutlined, StarOutlined, CheckCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import './index.scss';
import ActivityGraph from '@/components/ActivityGraph/ActivityGraph';
import GitHubActivityGraph from '@/components/GitHubActivityGraph/GitHubActivityGraph';
import * as echarts from 'echarts';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import GitHubProductiveTime from '@/components/GitHubProductiveTime/GitHubProductiveTime';
import ReactECharts from 'echarts-for-react';
import RepositoryCard from '@/components/RepositoryCard/RepositoryCard';
import { useNavigate } from 'react-router-dom';
import { text } from 'stream/consumers';


const { Text, Title } = Typography;
const { Header } = Layout;
const { TabPane } = Tabs;
interface PersonalInfo {
  name: string;
  bio: string;
  email: string;
  github: string;
  nation: string;
  followers: number;
  following: number;
  talentRank: number;
  confidence: number;
  skills: string[];
  avatarUrl: string;
}

interface Project {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  commits: number; // 每个项目的提交数量
}

const personalInfo: PersonalInfo = {
  name: 'Vinci-217',
  bio: '个人简介：热爱编程，喜欢开源。',
  email: 'user@example.com',
  github: 'https://github.com/Vinci-217',
  nation: '美国',
  followers: 150,
  following: 100,
  talentRank: 85,
  confidence: 90,
  skills: ['前端开发', '后端开发', '全栈开发'],
  avatarUrl: "https://avatars.githubusercontent.com/u/115935217?v=4",
};

const projects: Project[] = [
  { name: '项目1', description: '描述信息1', stars: 150, forks: 30, url: 'https://github.com/project1', commits: 120 },
  { name: '项目2', description: '描述信息2', stars: 200, forks: 40, url: 'https://github.com/project2', commits: 200 },
  { name: '项目3', description: '描述信息3', stars: 100, forks: 20, url: 'https://github.com/project3', commits: 80 },
  { name: '项目4', description: '描述信息4', stars: 250, forks: 50, url: 'https://github.com/project4', commits: 150 },
  { name: '项目5', description: '描述信息5', stars: 180, forks: 25, url: 'https://github.com/project5', commits: 90 },
];

// 雷达图的数据(commits)
const radarOption = {
  
 
  radar: {
    top:'5%',
    indicator: projects.map(project => ({
      name: project.name,
      max: Math.max(...projects.map(p => p.commits)) // 最大值为所有项目的最大提交数
    }))
  },
  series: [
    {
      top:'15%',
      name: '项目提交数量',
      type: 'radar',
      data: [
        {
          value: projects.map(project => project.commits),
          name: '提交数量'
        }
      ]
    }
  ]
};

//饼图数据(语言)
const pieOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: '使用语言',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'JavaScript' },
        { value: 735, name: 'Python' },
        { value: 580, name: 'Java' },
        { value: 484, name: 'C++' },
        { value: 300, name: 'Ruby' },
      ],
    },
  ],
};
//玫瑰图数据(starts)
const roseoption = {
  legend: {
    button:'auto'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  
  series: [
    {
      name: '项目星级分布',
      type: 'pie',
      radius: [20, 140],
      center: ['50%', '50%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: projects.map(project => ({
        value: project.stars,
        name: project.name
      }))
    }
  ]
};
//柱状图数据(pr)
const columnaroption = {
  
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textStyle: {
      color: '#fff'
    }
  },
  legend: {
    data: ['pr数量'],
    textStyle: {
      color: '#333'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  xAxis: {
    type: 'category',
    data: projects.map(project => project.name), // 横坐标显示项目名称
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    },
    axisLabel: {
      color: '#666'
    }
  },
  yAxis: {
    type: 'value',
    name: 'pr数量',
    nameTextStyle: {
      color: '#333'
    },
    axisLine: {
      lineStyle: {
        color: '#ddd'
      }
    },
    axisLabel: {
      color: '#666'
    }
  },
  series: [
    {
      name: 'pr数量',
      type: 'bar',
      data: projects.map((project, index) => {
        return {
          value: project.forks,
          itemStyle: {
            // 动态颜色设置
            color: (function() {
              const colorList = ['#FFB74D', '#FF7043', '#42a5f5', '#333', '#4caf50']; 
              return colorList[index % colorList.length]; // 根据索引循环使用颜色
            })()
          }
        };
      }),
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
        lineStyle: {
          type: 'dashed',
          color: '#888'
        }
      }
    }
  ]
};


const Developer: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const fullText = "这里是抽屉的内容，具有打字机特效。";
        
  const navigate = useNavigate();
   // 主题状态：包括 ActivityGraph, GitHubActivityGraph, GitHubProductiveTime 各自的主题
   const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [activityGraphTheme, setActivityGraphTheme] = useState('minimal');
  const [githubActivityGraphTheme, setGitHubActivityGraphTheme] = useState('default');
  const [githubProductiveTimeTheme, setGitHubProductiveTimeTheme] = useState('default');

  // 切换主题的函数
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);

    // 切换 ActivityGraph 主题
    setActivityGraphTheme((prev) => (prev === 'minimal' ? 'react' : 'minimal'));

    // 切换 GitHubActivityGraph 主题
    setGitHubActivityGraphTheme((prev) => (prev === 'default' ? 'nord_dark' : 'default'));

    // 切换 GitHubProductiveTime 主题
    setGitHubProductiveTimeTheme((prev) => (prev === 'default' ? 'nord_dark' : 'default'));
  };
  const showDrawer = () => {
    setDrawerVisible(true);
    setDisplayedText(''); // 重置显示文本
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const typeText = (text: string, index: number = 0) => {
    if (index < text.length) {
      setDisplayedText(prev => prev + text[index]);
      setTimeout(() => typeText(text, index + 1), 200); // 每200毫秒打一个字符
    }
  };

  useEffect(() => {
    if (drawerVisible) {
      typeText(fullText); // 开始打字
    }
  }, [drawerVisible]);

  return (
    <Layout>
      <Header style={{ background:'#121212',display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <OpenAIOutlined
            style={{ color: 'white', marginRight: '8px', fontSize: '24px' }}
            onClick={showDrawer}
          />
          <Button
            type="primary"
            icon={<DoubleRightOutlined />}
            ghost
            style={{
              color: 'white',
              borderColor: 'white',
              transition: 'background-color 0.3s, border-color 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => navigate('/talentrank')}
          >
            排行
          </Button>
        </div>

        <div style={{ lineHeight: '30px' }}>
        <ThemeToggle toggleTheme={toggleTheme}/>
      </div>
        
      </Header>
      <Layout style={{ backgroundColor: 'var(--bg-color)', transition: 'background-color 0.3s ease', minHeight: '100vh', padding: '20px' }}>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Card bordered={false} style={{ height: '100%', backgroundColor: 'var(--border-color)', transition: 'background-color 0.3s ease' }}>
              <Space direction="vertical" size="middle" style={{ alignItems: 'center' }}>
                <Avatar size={64} src={personalInfo.avatarUrl} style={{ border: '2px solid black', borderRadius: '50%' }} />
                <Text strong style={{ fontSize: '18px', textAlign: 'center', color: 'var(--text-color)', transition: 'color 0.3s ease' }}><UserOutlined /> {personalInfo.name}</Text>
                <Text type="secondary" style={{ textAlign: 'center', color: 'var(--secondary-text-color)', transition: 'color 0.3s ease' }}>{personalInfo.bio}</Text>
                <Row justify="center" style={{ width: '100%' }}>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><MailOutlined /> {personalInfo.email}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><GithubOutlined /> <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text className="flex items-center" style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}>
                      <GlobalOutlined className="mr-1" /> 国籍：
                      <span className="flex items-center">
                        <img src="/static/media/China.8214ce135867ed3a09cf923c95048840.svg" alt="中国国旗" style={{
                          width: '20px',
                          height: '15px',
                          marginRight: '5px',
                          position: 'relative',
                          top: '3px'
                        }} />
                        {personalInfo.nation}
                      </span> | <CheckCircleOutlined className="ml-1" /> 置信度：{personalInfo.confidence}%
                    </Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><UsergroupAddOutlined /> 粉丝：{personalInfo.followers} | <TeamOutlined /> 关注：{personalInfo.following}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><StarOutlined /> Talentrank：{personalInfo.talentRank}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><AppstoreAddOutlined /> 领域：{personalInfo.skills.join(', ')}</Text>
                  </Col>
                </Row>
              </Space>
              
            </Card>
          </Col>

          <Col xs={24} md={18} style={{ display: 'flex', flexDirection: 'column' }}>
            <Row gutter={[16, 16]} style={{ flex: 1 }}>
              <Col span={24}>
                <Card bordered={false} style={{ height: '100%', backgroundColor: 'var(--border-color)', transition: 'background-color 0.3s ease' }}>
                  <Title level={3} style={{ marginBottom: '10px', marginTop: '-5px', color: 'var(--text-color)', transition: 'color 0.3s ease' }}>
                    <CodeOutlined /> 项目展示
                  </Title>
                  <div style={{ maxHeight: '300px', overflowY: 'hidden', padding: '8px' }}>
                    <Row gutter={[16, 16]}>
                      {projects.slice(0, 4).map((project, index) => (
                        <Col span={12} key={index}>
                          <RepositoryCard
                            name={project.name}
                            description={project.description}
                            stars={project.stars}
                            forks={project.forks}
                            onClick={() => window.open(project.url)}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Card bordered={false} style={{ marginTop: '20px', backgroundColor: 'var(--border-color)', transition: 'background-color 0.3s ease' }}>
          <Title style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}} className="text-2xl font-semibold mb-4 flex items-center">
            <BarChartOutlined className="mr-2" />
            可视化分析
          </Title>
            
          <ConfigProvider 
            theme={{
              components: {
                Tabs: {
                  cardBg: 'var(--card-color)',
                  itemColor: 'var(--text-color)'
                }
              }
            }}>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Commits统计" key="1">
                <Card title="各项目的Commits" style={{ backgroundColor: 'var(--card-color)', transition: 'background-color 0.3s ease' }}>
                  <ReactECharts option={radarOption}/>
                </Card>
              </TabPane>
              <TabPane tab="language统计" key="2">
                <Card title="项目所用语言占比" style={{ backgroundColor: 'var(--card-color)', transition: 'background-color 0.3s ease' }}>
                  <ReactECharts option={pieOption} />
                </Card>
              </TabPane>
              <TabPane tab="Starts统计" key="3">
                <Card title="各项目的Starts占比" style={{ backgroundColor: 'var(--card-color)', transition: 'background-color 0.3s ease' }}>
                  <ReactECharts option={roseoption} />
                </Card>
              </TabPane>
              <TabPane tab="pr统计" key="4">
                <Card title="各项目的pr统计" style={{ backgroundColor: 'var(--card-color)', transition: 'background-color 0.3s ease' }}>
                  <ReactECharts option={columnaroption} />
                </Card>
              </TabPane>
            </Tabs>
          </ConfigProvider>
          
          <Card style={{ marginTop: '20px', backgroundColor: 'var(--card-color)', transition: 'background-color 0.3s ease' }}>
          <ActivityGraph username={personalInfo.name} theme={activityGraphTheme || 'minimal'} />
        <GitHubActivityGraph username={personalInfo.name} theme={githubActivityGraphTheme || 'default'} />
        <GitHubProductiveTime username={personalInfo.name} theme={githubProductiveTimeTheme || 'default'} />
          </Card>
        </Card>

        {/* 抽屉组件 */}
        <Drawer
          title="AI报告"
          placement="left"
          closable={true}
          onClose={onClose}
          visible={drawerVisible}
        >
          <p style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{displayedText}</p>
        </Drawer>
      </Layout>
    </Layout>
  );
};

export default Developer;
























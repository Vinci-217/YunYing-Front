import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Space, Row, Col, Avatar, Button, Drawer } from 'antd';
import { GithubOutlined, BarChartOutlined, SunOutlined, OpenAIOutlined, DoubleRightOutlined, UserOutlined, GlobalOutlined, MailOutlined, CodeOutlined, UsergroupAddOutlined, TeamOutlined, StarOutlined, CheckCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import './index.scss';
import ActivityGraph from '@/components/ActivityGraph/ActivityGraph';
import GitHubActivityGraph from '@/components/GitHubActivityGraph/GitHubActivityGraph';
import * as echarts from 'echarts';

import GitHubProductiveTime from '@/components/GitHubProductiveTime/GitHubProductiveTime';

import RepositoryCard from '@/components/RepositoryCard/RepositoryCard';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { useTheme } from '@/hooks/theme';
import ReactECharts from 'echarts-for-react';
import { getLineHeight } from 'antd/es/theme/internal';

const { Text, Title } = Typography;
const { Header } = Layout;

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
  title: {
    top:'5%',
    text: '各项目commit数雷达图',
    left: 'center',
  },
  legend: {
    top:'5%',
    data: ['提交数量']
  },
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
  title: {
    text: '项目所用语言占比',
   
    left: 'center',
  },
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
  title: {
    text: '各项目Starts',
   
    left: 'center',
  },
  legend: {
    
    top: 'bottom'
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
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: projects.map(project => ({
        value: project.stars,
        name: project.name
      }))
    }
  ]
};
//柱状图数据(fork到时候是pr)
const columnaroption = {
  title: {
    text: '各项目的 Fork 数量',
    left:'center',
    textStyle: {
      color: '#333',
      fontSize: 18,
      fontWeight: 'bold'
    },
    subtextStyle: {
      color: '#777',
      fontSize: 14
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textStyle: {
      color: '#fff'
    }
  },
  legend: {
    data: ['Fork 数量'],
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
    name: 'Fork 数量',
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
      name: 'Fork 数量',
      type: 'bar',
      data: projects.map((project, index) => {
        return {
          value: project.forks,
          itemStyle: {
            // 动态颜色设置
            color: (function() {
              const colorList = ['#FFB74D', '#FF7043', '#42a5f5', '#333', '#4caf50']; // 这里你可以自己设置颜色
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
  const { isDarkMode } = useTheme();
  const fullText = "这里是抽屉的内容，具有打字机特效。";
  const navigate = useNavigate();

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
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
 
      </Header>
      <Layout style={{ background: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Card bordered={false} style={{ height: '100%' }}>
              <Space direction="vertical" size="middle" style={{ alignItems: 'center' }}>
                <Avatar size={64} src={personalInfo.avatarUrl} style={{ border: '2px solid black', borderRadius: '50%' }} />
                <Text strong style={{ fontSize: '18px', textAlign: 'center' }}><UserOutlined /> {personalInfo.name}</Text>
                <Text type="secondary" style={{ textAlign: 'center' }}>{personalInfo.bio}</Text>
                <Row justify="center" style={{ width: '100%' }}>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text><MailOutlined /> {personalInfo.email}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text><GithubOutlined /> <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text className="flex items-center">
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
                    <Text><UsergroupAddOutlined /> 粉丝：{personalInfo.followers} | <TeamOutlined /> 关注：{personalInfo.following}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text><StarOutlined /> Talentrank：{personalInfo.talentRank}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text><AppstoreAddOutlined /> 领域：{personalInfo.skills.join(', ')}</Text>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={18} style={{ display: 'flex', flexDirection: 'column' }}>
            <Row gutter={[16, 16]} style={{ flex: 1 }}>
              <Col span={24}>
                <Card bordered={false} style={{ height: '100%' }}>
                  <Title level={3} style={{ marginBottom: '10px', marginTop: '-5px' }}>
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

        <Card bordered={false} style={{ marginTop: '20px' }}>
          <Title className="text-2xl font-semibold mb-4 flex items-center">
            <BarChartOutlined className="mr-2" />
            可视化分析
          </Title>
            <Card style={{height:'700px'}}>
            <ReactECharts option={radarOption} />
            </Card>
            
            <ReactECharts option={pieOption} />
            <ReactECharts option={roseoption}/>
            <ReactECharts option={columnaroption} />
            
            <ActivityGraph username='Vinci-217'/>
            <GitHubActivityGraph username='Vinci-217'/>
            <GitHubProductiveTime username='Vinci-217'/>

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






















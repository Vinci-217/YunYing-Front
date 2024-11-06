import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout, Card, Typography, Space, Row, Col, Avatar, Button, Drawer, Tabs } from 'antd';
import { GithubOutlined, LoadingOutlined,BarChartOutlined, SunOutlined, OpenAIOutlined, DoubleRightOutlined, UserOutlined, GlobalOutlined, MailOutlined, CodeOutlined, UsergroupAddOutlined, TeamOutlined, StarOutlined, CheckCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import './index.scss';
import ActivityGraph from '@/components/ActivityGraph/ActivityGraph';
import GitHubActivityGraph from '@/components/GitHubActivityGraph/GitHubActivityGraph';
import DeveloperCharts from '@/components/DeveloperCharts/DeveloperCharts';
import * as echarts from 'echarts';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import GitHubProductiveTime from '@/components/GitHubProductiveTime/GitHubProductiveTime';
import ReactECharts from 'echarts-for-react';
import RepositoryCard from '@/components/RepositoryCard/RepositoryCard';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/theme';
import axios from 'axios';
import { Spin } from 'antd';


const { Text, Title } = Typography;
const { Header } = Layout;
const { TabPane } = Tabs;

const Developer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const [developerInfo, setDeveloperInfo] = useState<any>(null);
  const [aiReport, setAiReport] = useState<string>('');
  const [projects, setProjects] = useState<any[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  
  const fullText = "这里是抽屉的内容，具有打字机特效。";
  
  // 请求开发者信息
  const fetchDeveloperInfo = async () => {
    try {
      const response = await axios.get('/developer/select/1');
      setDeveloperInfo(response.data);
    } catch (error) {
      console.error('获取开发者信息失败:', error);
    }
  };

  // 请求 AI 报告
  const fetchAiReport = async () => {
    try {
      const response = await axios.get('/developer/select/ai-report/1');
      setAiReport(response.data.report);
    } catch (error) {
      console.error('获取AI报告失败:', error);
    }
  };

  // 请求贡献项目列表
  const fetchProjects = async () => {
    try {
      const response = await axios.get('/developer/select/contribution/1');
      setProjects(response.data.projects);
    } catch (error) {
      console.error('获取项目列表失败:', error);
    }
  };



  // 显示抽屉并启动打字机效果
  const showDrawer = () => {
    setDrawerVisible(true);
    setDisplayedText('');
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const typeText = (text: string, index: number = 0) => {
    if (index < text.length) {
      setDisplayedText(prev => prev + text[index]);
      setTimeout(() => typeText(text, index + 1), 200);
    }
  };

  useEffect(() => {
    fetchDeveloperInfo();
    fetchAiReport();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (drawerVisible) {
      typeText(fullText);
    }
  }, [drawerVisible]);
// 加载中的环形加载条组件
  const Loading = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin  />} />
    </div>
  );
};


if (!developerInfo || !projects.length) {
    return <Loading />;
  }


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
        <ThemeToggle />
      </Header>
      <Layout style={{ backgroundColor: 'var(--bg-color)', transition: 'background-color 0.3s ease', minHeight: '100vh', padding: '20px' }}>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Card bordered={false} style={{ height: '100%', backgroundColor: 'var(--border-color)', transition: 'background-color 0.3s ease' }}>
              <Space direction="vertical" size="middle" style={{ alignItems: 'center' }}>
                <Avatar size={64} src={developerInfo.avatarUrl} style={{ border: '2px solid black', borderRadius: '50%' }} />
                <Text strong style={{ fontSize: '18px', textAlign: 'center', color: 'var(--text-color)', transition: 'color 0.3s ease' }}><UserOutlined /> {developerInfo.name}</Text>
                <Text type="secondary" style={{ textAlign: 'center', color: 'var(--secondary-text-color)', transition: 'color 0.3s ease' }}>{developerInfo.bio}</Text>
                <Row justify="center" style={{ width: '100%' }}>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><MailOutlined /> {developerInfo.email}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><GithubOutlined /> <a href={developerInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text className="flex items-center" style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}>
                      <GlobalOutlined className="mr-1" /> 国籍：{developerInfo.nation} | <CheckCircleOutlined className="ml-1" /> 置信度：{developerInfo.confidence}%
                    </Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><UsergroupAddOutlined /> 粉丝：{developerInfo.followers} | <TeamOutlined /> 关注：{developerInfo.following}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><StarOutlined /> Talentrank：{developerInfo.talentRank}</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><AppstoreAddOutlined /> 领域：{developerInfo.skills.join(', ')}</Text>
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
                            
                            onClick={() => window.open(project.url, '_blank')}
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
        <ConfigProvider 
            theme={{
              components: {
                Tabs: {
                  cardBg: 'var(--card-color)',
                  itemColor: 'var(--text-color)'
                }
              }
            }}>
        <DeveloperCharts/>
        </ConfigProvider>
        <Card style={{ marginTop: '20px', backgroundColor: 'var(--card-color)', transition: 'background-color 0.3s ease' }}>
          <ActivityGraph username={developerInfo.name} theme={isDarkMode?'react':'minimal'} />
          <GitHubActivityGraph username={developerInfo.name} theme={isDarkMode?'nord_dark':'default'} />
          <GitHubProductiveTime username={developerInfo.name} theme={isDarkMode?'nord_dark':'default'} />
          </Card>
        

      
      {/* 抽屉显示AI报告 */}
      <Drawer
        title="AI 报告"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}
        width={500}
      >
        <div>
          <Text>{aiReport}</Text>
        </div>
      </Drawer>
    </Layout>
    </Layout>
  );
};

export default Developer;
























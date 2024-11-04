import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Space, Row, Col, Avatar, Button, Drawer } from 'antd';
import { GithubOutlined, BarChartOutlined, SunOutlined, OpenAIOutlined, DoubleRightOutlined, UserOutlined, GlobalOutlined, MailOutlined, CodeOutlined, UsergroupAddOutlined, TeamOutlined, StarOutlined, CheckCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import './index.scss';
import ActivityGraph from '@/components/ActivityGraph/ActivityGraph';
import GitHubActivityGraph from '@/components/GitHubActivityGraph/GitHubActivityGraph';
import GitHubStats from '@/components/GitHubStats/GitHubStats';
import GitHubProductiveTime from '@/components/GitHubProductiveTime/GitHubProductiveTime';
import GitHubTopLangs from '@/components/GitHubTopLangs/GitHubTopLangs';
import GitHubStreak from '@/components/GitHubStreak/GitHubStreak';
import RepositoryCard from '@/components/RepositoryCard/RepositoryCard';
import { useNavigate } from 'react-router-dom';
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
  { name: '项目1', description: '描述信息1', stars: 150, forks: 30, url: 'https://github.com/project1' },
  { name: '项目2', description: '描述信息2', stars: 200, forks: 40, url: 'https://github.com/project2' },
  { name: '项目3', description: '描述信息3', stars: 100, forks: 20, url: 'https://github.com/project3' },
  { name: '项目4', description: '描述信息4', stars: 250, forks: 50, url: 'https://github.com/project4' },
  { name: '项目5', description: '描述信息5', stars: 180, forks: 25, url: 'https://github.com/project5' },
];

const Developer: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "这里是抽屉的内容，具有打字机特效。";
  const navigate = useNavigate();
  const showDrawer = () => {
    setDrawerVisible(true);
    setDisplayedText(''); // 重置显示文本
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    if (drawerVisible) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(prev => prev + fullText[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 200); // 每100毫秒打一个字符

      return () => clearInterval(interval); // 清理定时器
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
            onClick={() => navigate('/talentrank')} // 示例点击事件
          >
            排行
          </Button>
        </div>
        <Button 
          type="primary" 
          icon={<SunOutlined />} 
          ghost 
          style={{ 
            color: 'white',
            borderColor: 'white',
            transition: 'background-color 0.3s, border-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={() => console.log('换肤 clicked')} // 示例点击事件
        >
          换肤
        </Button>
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
        <div className="space-y-4">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <GitHubActivityGraph username="Vinci-217" />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
            <GitHubProductiveTime username="Vinci-217" />
              
            </Col>
            <Col xs={24} md={12}>
            
            <GitHubTopLangs username="Vinci-217" />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <GitHubStreak username="Vinci-217" />
            </Col>
            <Col xs={24} md={12}>
            <GitHubStats username="Vinci-217" />
           
              
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ActivityGraph username='Vinci-217' />
            </Col>
          </Row>
        </div>
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

















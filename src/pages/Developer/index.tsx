import React from 'react';
import { Layout, Card, Typography, Space, Row, Col, Avatar } from 'antd';
import { GithubOutlined, UserOutlined,GlobalOutlined, MailOutlined, CodeOutlined, UsergroupAddOutlined, TeamOutlined, StarOutlined, CheckCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import './index.scss';
import ActivityGraph from '@/components/ActivityGraph/ActivityGraph';
import GitHubActivityGraph from '@/components/GitHubActivityGraph/GitHubActivityGraph';
import GitHubStats from '@/components/GitHubStats/GitHubStats';
import GitHubProductiveTime from '@/components/GitHubProductiveTime/GitHubProductiveTime';
import GitHubTopLangs from '@/components/GitHubTopLangs/GitHubTopLangs';
import GitHubStreak from '@/components/GitHubStreak/GitHubStreak';

const { Text, Title } = Typography;

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

const personalInfo: PersonalInfo = {
  name: 'Vinci',
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


const Developer: React.FC = () => {
  return (
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
                    <GlobalOutlined className="mr-1" />
                    国籍：
                    <span className="flex items-center">
                      <img src="/static/media/China.8214ce135867ed3a09cf923c95048840.svg" alt="中国国旗" style={{ 
                          width: '20px', 
                          height: '15px', 
                          marginRight: '5px', 
                          position: 'relative', 
                          top: '3px' 
                        }}  />
                      {personalInfo.nation}
                    </span>
                    | <CheckCircleOutlined className="ml-1" /> 置信度：{personalInfo.confidence}%
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
            <Text>项目描述内容：这里可以写关于项目的详细描述，技术栈，贡献情况等。</Text>
          </Card>


            </Col>
          </Row>
        </Col>
      </Row>

      <Card bordered={false} style={{ marginTop: '20px' }}>
        <Title level={3}><GithubOutlined /> 可视化分析</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <GitHubStats username="Vinci-217" />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <GitHubProductiveTime username="Vinci-217" />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <GitHubTopLangs username="Vinci-217" />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <GitHubStreak username="Vinci-217" />
          </Col>
          <Col span={24}>
            <GitHubActivityGraph username="Vinci-217" />
          </Col>
          <Col span={24}>
            <ActivityGraph username='Vinci-217' />
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

export default Developer;


import React from 'react';
import { Layout, Card, Typography, Space, Row, Col } from 'antd';
import { GithubOutlined, UserOutlined, MailOutlined, CodeOutlined } from '@ant-design/icons';
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
  skills: string[];
}

const personalInfo: PersonalInfo = {
  name: 'Zero',
  bio: '个人简介：热爱编程，喜欢开源。',
  email: 'user@example.com',
  github: 'https://github.com/Vinci-217',
  skills: ['Java', 'React', 'Node.js', 'TypeScript', 'Ant Design'],
};

const Developer: React.FC = () => {
  return (
    <Layout style={{ background: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card bordered={false} style={{ height: '100%' }}>
            <Space direction="vertical" size="middle">
              <Text strong style={{ fontSize: '18px' }}><UserOutlined /> {personalInfo.name}</Text>
              <Text type="secondary">{personalInfo.bio}</Text>
              <Text><MailOutlined /> {personalInfo.email}</Text>
              <Text><GithubOutlined /> <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></Text>
              <Text>技能：{personalInfo.skills.join(', ')}</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={18} style={{ display: 'flex', flexDirection: 'column' }}>
          <Row gutter={[16, 16]} style={{ flex: 1 }}>
            <Col span={24}>
              <Card bordered={false} style={{ height: '100%' }}>
                <Title level={4}><CodeOutlined /> 项目展示</Title>
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
              <ActivityGraph username='Vinci-217'/>
            </Col>
          </Row>
      </Card>
    </Layout>
  );
};

export default Developer;


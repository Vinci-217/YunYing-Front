import React from 'react';
import { Layout, Card, Typography } from 'antd';
import './index.scss'; // 引入样式
import ActivityGraph from '@/components/ActivityGraph/ActivityGraph';
import GitHubActivityGraph from '@/components/GitHubActivityGraph/GitHubActivityGraph';
import GitHubStats from '@/components/GitHubStats/GitHubStats';
import GitHubProductiveTime from '@/components/GitHubProductiveTime/GitHubProductiveTime';
import GitHubTopLangs from '@/components/GitHubTopLangs/GitHubTopLangs';
import GitHubStreak from '@/components/GitHubStreak/GitHubStreak';

const { Sider, Content, Footer } = Layout;
const { Paragraph } = Typography;



const personalInfo = {
  name: '用户名',
  bio: '个人简介',
  email: 'user@example.com',
};



const Developer = () => {

  return (
    <Layout >
      <Layout className='layout'>
        <Sider width="25%" className='sider'>
          <Card title="个人信息" bordered={false}>
            <Paragraph strong>{personalInfo.name}</Paragraph>
            <Paragraph>{personalInfo.bio}</Paragraph>
            <Paragraph>{personalInfo.email}</Paragraph>
          </Card>
        </Sider>
        <Content className='content'>
          
          <Card title="项目名称 1" style={{ marginBottom: '20px' }}>
            <p>项目描述内容</p>
          </Card>
          <Card title="项目名称 2">
            <p>项目描述内容</p>
          </Card>
        </Content>
      </Layout>
      <Footer >
       <Card title="可视化分析">
        <div>
        
        <GitHubStats username="Vinci-217" />
        <GitHubProductiveTime username="Vinci-217" />
        <GitHubTopLangs username="Vinci-217" />
        <GitHubStreak username="Vinci-217" />
        <GitHubActivityGraph username="Vinci-217" />
        </div>
        <div>
          <ActivityGraph username='Vinci-217'/>
        </div>
       </Card>
        
      </Footer>
    </Layout>
  );
};

export default Developer;



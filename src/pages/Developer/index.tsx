import React from 'react';
import { Layout, Avatar, Card, Col, Row, Carousel } from 'antd';
import ReactECharts from 'echarts-for-react';
import './index.scss';
import RepositoryCard from '@/components/RepositoryCard/RepositoryCard';

const { Sider, Content } = Layout;

const Developer: React.FC = () => {
  const developerInfo = {
    avatarUrl: "https://example.com/avatar.jpg",
    nickname: "DevUser",
    followers: 300,
    following: 150,
    email: "devuser@example.com",
    blogUrl: "https://exampleblog.com",
    nation: "China",
    selfIntroduction: "Experienced developer in frontend and backend.",
    skills: ["Frontend", "Backend", "AI"],
  };

  const chartOptions = {
    codeContribution: {
      xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
      yAxis: { type: 'value' },
      series: [{ data: [10, 22, 28, 43, 49], type: 'bar' }],
    },
    communityParticipation: {
      xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
      yAxis: { type: 'value' },
      series: [{ data: [5, 15, 10, 20, 25], type: 'bar' }], // 示例数据
    },
    followerTrend: {
      xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
      yAxis: { type: 'value' },
      series: [{ data: [50, 80, 100, 130, 150], type: 'line' }],
    },
    projectParticipation: {
      radar: {
        indicator: [
          { name: 'Project A', max: 100 },
          { name: 'Project B', max: 100 },
          { name: 'Project C', max: 100 },
        ],
      },
      series: [
        {
          name: '贡献比例',
          type: 'radar',
          data: [
            {
              value: [30, 20, 50],
              name: '开发者贡献',
            },
          ],
        },
      ],
    },
  };

  return (
    <Layout className="developer-layout">
      <Sider width="25%" className="developer-sider">
        <div className="developer-info">
          <Avatar size={100} src={developerInfo.avatarUrl} />
          <h2>{developerInfo.nickname}</h2>
          <p>粉丝数量: {developerInfo.followers}</p>
          <p>关注人数: {developerInfo.following}</p>
          <p>邮箱: {developerInfo.email}</p>
          <a href={developerInfo.blogUrl} target="_blank" rel="noopener noreferrer">博客链接</a>
          <p>国家: {developerInfo.nation}</p>
          <p>自我介绍: {developerInfo.selfIntroduction}</p>
          <p>领域标签: {developerInfo.skills.join(', ')}</p>
        </div>
      </Sider>
     
      <Layout>
        <Content style={{ padding: '20px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="AI 报告">
                <h3>技术擅长</h3>
                <p>内容...</p>
                <h3>项目经验</h3>
                <p>内容...</p>
                <h3>创新能力</h3>
                <p>内容...</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="置信度展示">
                <h3>技术擅长</h3>
                <p>内容...</p>
                <h3>项目经验</h3>
                <p>内容...</p>
                <h3>创新能力</h3>
                <p>内容...</p>
              </Card>
            </Col>
          </Row>
          
          <Card title="Echarts 数据可视化" style={{ marginTop: '20px' }}>
            <Carousel autoplay>
              <div>
                <ReactECharts option={chartOptions.codeContribution} />
              </div>
              <div>
                <ReactECharts option={chartOptions.communityParticipation} />
              </div>
              <div>
                <ReactECharts option={chartOptions.followerTrend} />
              </div>
              <div>
                <ReactECharts option={chartOptions.projectParticipation} />
              </div>
            </Carousel>
          </Card>
        
          <Card title="项目展示" style={{ marginTop: '20px' }}>
            <RepositoryCard name="项目1" description="描述信息" stars={150} forks={30} onClick={() => window.open('https://github.com/project1')} />
            <RepositoryCard name="项目2" description="描述信息" stars={200} forks={40} onClick={() => window.open('https://github.com/project2')} />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Developer;

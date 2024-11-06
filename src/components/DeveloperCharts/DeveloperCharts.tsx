import React, { useEffect, useState } from 'react';
import { Tabs, Spin,Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const { TabPane } = Tabs;

// 定义项目和语言的接口
interface Project {
  name: string;
  commits: number;
  stars: number;
  forks: number;
}

interface Language {
  name: string;
  value: number;
}

const DeveloperCharts: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 获取贡献项目数据
  const fetchContributionData = async () => {
    try {
      const response = await axios.get('/developer/select/contribution/1');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching contribution data', error);
    }
  };

  // 获取开发者使用语言数据
  const fetchLanguageData = async () => {
    try {
      const response = await axios.get('/developer/select/language/1');
      setLanguages(response.data);
    } catch (error) {
      console.error('Error fetching language data', error);
    }
  };

  useEffect(() => {
    fetchContributionData();
    fetchLanguageData();
  }, []);

  useEffect(() => {
    if (projects.length && languages.length) {
      setLoading(false); // 数据加载完成，停止加载状态
    }
  }, [projects, languages]);


  // 雷达图数据
  const radarOption = {
    radar: {
      top: '5%',
      indicator: projects.map((project) => ({
        name: project.name,
        max: Math.max(...projects.map((p) => p.commits)), // 最大提交数量
      })),
    },
    series: [
      {
        top: '15%',
        name: '项目提交数量',
        type: 'radar',
        data: [
          {
            value: projects.map((project) => project.commits),
            name: '提交数量',
          },
        ],
      },
    ],
  };

  // 饼图数据 (开发者使用语言)
  const pieOption = {
    tooltip: { trigger: 'item' },
    legend: { top: '5%', left: 'center' },
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
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 40, fontWeight: 'bold' } },
        labelLine: { show: false },
        data: languages.map((language) => ({
          value: language.value,
          name: language.name,
        })),
      },
    ],
  };

  // 玫瑰图数据
  const roseOption = {
    legend: { button: 'auto' },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: '项目星级分布',
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: { borderRadius: 5 },
        label: { show: false },
        emphasis: { label: { show: true } },
        data: projects.map((project) => ({
          value: project.stars,
          name: project.name,
        })),
      },
    ],
  };

  // 柱状图数据 (PR数量)
  const columnarOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      textStyle: { color: '#fff' },
    },
    legend: { data: ['pr数量'], textStyle: { color: '#333' } },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      type: 'category',
      data: projects.map((project) => project.name),
      axisLine: { lineStyle: { color: '#ddd' } },
      axisLabel: { color: '#666' },
    },
    yAxis: {
      type: 'value',
      name: 'pr数量',
      nameTextStyle: { color: '#333' },
      axisLine: { lineStyle: { color: '#ddd' } },
      axisLabel: { color: '#666' },
    },
    series: [
      {
        name: 'pr数量',
        type: 'bar',
        data: projects.map((project, index) => ({
          value: project.forks,
          itemStyle: {
            color: (() => {
              const colorList = ['#FFB74D', '#FF7043', '#42a5f5', '#333', '#4caf50'];
              return colorList[index % colorList.length];
            })(),
          },
        })),
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
          lineStyle: { type: 'dashed', color: '#888' },
        },
      },
    ],
  };

  return (
    
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
          <ReactECharts option={roseOption} />
        </Card>
      </TabPane>
      <TabPane tab="pr统计" key="4">
        <Card title="各项目的pr统计" style={{ backgroundColor: 'var(--card-color)', transition: 'background-color 0.3s ease' }}>
          <ReactECharts option={columnarOption} />
        </Card>
      </TabPane>
    </Tabs>
  
   );
};

export default DeveloperCharts;



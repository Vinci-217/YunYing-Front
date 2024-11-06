import React from 'react';
import { Card, Typography, Space } from 'antd';
import { StarOutlined, ForkOutlined } from '@ant-design/icons';
import { hover } from '@testing-library/user-event/dist/hover';

const { Text } = Typography;

interface RepositoryCardProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  onClick: () => void;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ name, description, stars, forks, onClick }) => {
  return (
    <Card onClick={onClick} hoverable style={{ marginBottom: '16px',flex: '0 0 calc(50% - 8px)', backgroundColor: 'var(--card-color)', transition: 'background-color 0.3s ease'}}>
      <Text strong style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}>{name}</Text>
      <Text style={{ display: 'block', color: 'var(--text-color)', transition: 'color 0.3s ease' }}>{description}</Text>
      <Space style={{ marginTop: '8px' }}>
        <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><StarOutlined /> {stars}</Text>
        <Text style={{color: 'var(--text-color)', transition: 'color 0.3s ease'}}><ForkOutlined /> {forks}</Text>
      </Space>
    </Card>
  );
};

export default RepositoryCard;


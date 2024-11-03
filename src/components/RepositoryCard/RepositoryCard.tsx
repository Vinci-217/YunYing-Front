import React from 'react';
import { Card, Typography, Space } from 'antd';
import { StarOutlined, ForkOutlined } from '@ant-design/icons';

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
    <Card onClick={onClick} hoverable style={{ marginBottom: '16px',flex: '0 0 calc(50% - 8px)'}}>
      <Text strong>{name}</Text>
      <Text style={{ display: 'block', color: 'rgba(0, 0, 0, 0.45)' }}>{description}</Text>
      <Space style={{ marginTop: '8px' }}>
        <Text><StarOutlined /> {stars}</Text>
        <Text><ForkOutlined /> {forks}</Text>
      </Space>
    </Card>
  );
};

export default RepositoryCard;


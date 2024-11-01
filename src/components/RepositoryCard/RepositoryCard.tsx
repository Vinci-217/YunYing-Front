import React from 'react';
import { Card } from 'antd';
import './RepositoryCard.scss';

interface RepositoryCardProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  onClick: () => void;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ name, description, stars, forks, onClick }) => {
  return (
    <Card className="repository-card" hoverable onClick={onClick}>
      <h3 className="repository-card__name">{name}</h3>
      <p className="repository-card__description">{description}</p>
      <div className="repository-card__stats">
        <span>⭐ {stars}</span>
        <span>Fork {forks}</span>
      </div>
    </Card>
  );
};

export default RepositoryCard;
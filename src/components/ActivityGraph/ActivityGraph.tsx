import React from 'react';

interface ActivityGraphProps {
  username: string;
  theme?: string; // 可选的主题参数
}

const ActivityGraph: React.FC<ActivityGraphProps> = ({ username, theme = 'minimal' }) => {
  const imageUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme}`;
  const repoLink = `https://github.com/ashutosh00710/github-readme-activity-graph`;

  return (
    <a href={repoLink} target="_blank" rel="noopener noreferrer">
      <img src={imageUrl} alt={`${username}'s GitHub activity graph`} 
      style={{ width: '100%', borderRadius: '8px' }}
      />
    </a>
  );
};

export default ActivityGraph;


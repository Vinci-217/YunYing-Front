import React from 'react';


interface GitHubStatsProps {
  username: string;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ username }) => {
  const imageUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=default`;

  return (
    <div style={{textAlign: 'center', margin: '20px 0' }}>
      <img
        src={imageUrl}
        alt={`${username}'s GitHub stats`}
        style={{ width:'100%', borderRadius: '8px'}}
      />
    </div>
  );
};

export default GitHubStats;

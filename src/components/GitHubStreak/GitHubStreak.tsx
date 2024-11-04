import React from 'react';

interface GitHubStreakProps {
  username: string;
}

const GitHubStreak: React.FC<GitHubStreakProps> = ({ username }) => {
  const url = `https://streak-stats.demolab.com/?user=${username}&theme=default`;

  return (
    <div style={{textAlign: 'center', margin: '20px 0' }}>
      <img src={url} alt={`${username}'s GitHub Streak`} 
      style={{ width: '100%', borderRadius: '8px' }}
      />
    </div>
  );
};

export default GitHubStreak;

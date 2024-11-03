import React from 'react';

interface GitHubStreakProps {
  username: string;
}

const GitHubStreak: React.FC<GitHubStreakProps> = ({ username }) => {
  const url = `https://streak-stats.demolab.com/?user=${username}&theme=default`;

  return (
    <a href={`https://github.com/${username}`}>
      <img src={url} alt={`${username}'s GitHub Streak`} 
      style={{ width: '100%', borderRadius: '8px' }}
      />
    </a>
  );
};

export default GitHubStreak;

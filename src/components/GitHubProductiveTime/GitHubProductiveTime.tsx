import React from 'react';

interface GitHubProductiveTimeProps {
  username?: string;
  theme?: string; 
}

const GitHubProductiveTime: React.FC<GitHubProductiveTimeProps> = ({ username ,theme ='default' }) => {
  const imageUrl = `http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${username}&theme=${theme}&utcOffset=8`;

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <img
      src={imageUrl}
      alt={`${username}'s GitHub productive time`}
      style={{ width: '100%', borderRadius: '8px' }}
    />
  </div>


  );
};

export default GitHubProductiveTime;

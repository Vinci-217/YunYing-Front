import React from 'react';

interface GitHubActivityGraphProps {
  username: string;
  theme?: string; 
}

const GitHubActivityGraph: React.FC<GitHubActivityGraphProps> = ({ username,theme ='default' }) => {
  const imageUrl = `http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=${theme}`;

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <img
        src={imageUrl}
        alt={`${username}'s GitHub activity graph`}
        style={{ width: '100%', height: '10%' }}
      />
    </div>
  );
};

export default GitHubActivityGraph;

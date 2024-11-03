import React from 'react';

interface GitHubActivityGraphProps {
  username: string;
}

const GitHubActivityGraph: React.FC<GitHubActivityGraphProps> = ({ username }) => {
  const imageUrl = `http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=default`;

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

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
        style={{ maxWidth: '100%', borderRadius: '8px' }}
      />
    </div>
  );
};

export default GitHubActivityGraph;

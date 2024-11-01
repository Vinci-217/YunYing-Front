import React from 'react';

interface GitHubTopLangsProps {
  username: string;
}

const GitHubTopLangs: React.FC<GitHubTopLangsProps> = ({ username }) => {
  const url = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact`;

  return (
    <a href={`https://github.com/${username}`}>
      <img src={url} alt={`${username}'s Top Languages`} />
    </a>
  );
};

export default GitHubTopLangs;

// src/types/Developer.ts

// 开发者基本信息
export interface Developer {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  nation: string;
  field: string[];
  followers: number;
  following: number;
  talentRank: number;
}

// 仓库信息
export interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
}

// AI 报告类型
export interface AIDocument {
  expertise: string;
  projectExperience: string;
  innovationAbility: string;
  confidence: string; // AI 评估报告的置信度
  createdAt: string;  // AI 报告的生成时间
}



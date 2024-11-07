// src/types/Developer.ts

// 开发者基本信息
export interface DeveloperInfo {
  avatar: string;
  bio: string;
  blog: string;
  createTime: string;
  devId: number;
  devLogin: string;
  devName: string;
  email: string;
  followers: number;
  followersWeight: number;
  following: number;
  home: string;
  location: string;
  nation: string;
  nationConf: string;
  talentRank: number;
  updateTime: string;
  [property: string]: any;
}

// 仓库信息
export interface Repository {
  create_time: string;
  description: string;
  fork_count: number;
  importance: number;
  issue_count: number;
  language: string;
  owner_id: number;
  pr_count: number;
  repo_full_name: string;
  repo_home: string;
  repo_id: number;
  repo_name: string;
  star_count: number;
  update_time: string;
  watch_count: number;
  [property: string]: any;
}

// AI 报告类型
export interface AIDocument {
  code: number;
  data: string;
  message: string;
  [property: string]: any;
}


//单个语言类型
export interface Language {
  name: string;
  value: number;
}

//
export interface RawLanguageDataResponse {
  data: { [key: string]: number }; // 键为语言名称，值为数值
}
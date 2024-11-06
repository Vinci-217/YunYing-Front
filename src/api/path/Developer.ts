// src/api/path/Developer.ts

import Request from '@/api/ApiService';
import { Result } from '@/types/Result';
import { Developer, Repository, AIDocument } from '@/types/Developer';

// 获取指定开发者信息
export const getDeveloperById = async (devId: string): Promise<Result<Developer>> => {
  try {
    const response = await Request.get<Developer>(`/developer/select/${devId}`);
    return response.data; // 只返回 response.data 部分
  } catch (error) {
    console.error('获取开发者信息失败:', error);
    throw error;
  }
};

// 获取指定开发者的 AI 报告
export const getDeveloperAIReport = async (devId: string): Promise<Result<AIDocument>> => {
  try {
    const response = await Request.get<AIDocument>(`/developer/select/ai-report/${devId}`);
    return response.data; // 只返回 response.data 部分
  } catch (error) {
    console.error('获取 AI 报告失败:', error);
    throw error;
  }
};

// 获取指定开发者的贡献项目列表
export const getDeveloperContributedProjects = async (devId: string): Promise<Result<Repository[]>> => {
  try {
    const response = await Request.get<Repository[]>(`/developer/select/contribution/${devId}`);
    return response.data; // 只返回 response.data 部分
  } catch (error) {
    console.error('获取贡献项目失败:', error);
    throw error;
  }
};

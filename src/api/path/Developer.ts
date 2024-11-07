// src/api/path/Developer.ts

import Request from '@/api/ApiService';
import { Result } from '@/types/Result';
import { DeveloperInfo, Repository, AIDocument,Language } from '@/types/Developer';

// 获取指定开发者信息
export const getDeveloperInfo = async (): Promise<Result<DeveloperInfo>> => {
  try {
    const response = await Request.get<DeveloperInfo>(`/developer/select/1`);
    return response.data; // 只返回 response.data 部分
  } catch (error) {
    console.error('获取开发者信息失败:', error);
    throw error;
  }
};

// 获取指定开发者的 AI 报告
export const getDeveloperAIReport = async (): Promise<Result<AIDocument>> => {
  try {
    const response = await Request.get<AIDocument>(`/developer/select/ai-report/1`);
    return response.data; // 只返回 response.data 部分
  } catch (error) {
    console.error('获取 AI 报告失败:', error);
    throw error;
  }
};

// 获取指定开发者的贡献项目列表
export const getDeveloperContributedProjects = async (): Promise<Result<Repository[]>> => {
  try {
    const response = await Request.get<Repository[]>(`/developer/select/contribution/1`);
    return response.data; // 只返回 response.data 部分
  } catch (error) {
    console.error('获取贡献项目失败:', error);
    throw error;
  }
};


//获取指定开发者的语言
export const getDeveloperLanguages = async (): Promise<Result<Language[]>> => {
  try {
    const response = await Request.get<Language[]>('/developer/select/language/1');
    return response.data; // 只返回 response.data 部分
  } catch (error) {
    console.error('获取语言数据失败:', error);
    throw error;
  }
};
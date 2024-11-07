// src/api/path/talentrank.ts
import Request from '@/api/ApiService';
import { Result } from '@/types/Result';

// 根据开发者login查询开发者
export const queryDeveloper = async (login: string): Promise<Result<string>> => {
  const response = await Request.get<string>(`/developer/query/${login}`);
  return response.data; // 只返回 response.data 部分
};

// 根据开发者login添加开发者
export const insertDeveloper = async (data: object): Promise<Result<string>> => {
  const response = await Request.post<string>('/developer/insert', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data; // 只返回 response.data 部分
};
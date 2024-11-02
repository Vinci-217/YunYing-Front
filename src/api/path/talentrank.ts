// src/api/path/talentrank.ts
import Request from '@/api/ApiService';
import { Result } from '@/types/Result';
import { Developer } from '@/types/TalentRank';

// 获取领域标签列表
export const getFieldList = async (): Promise<Result<String[]>> => {
  const response = await Request.get<String[]>('/developer/select/field');
  return response.data; // 只返回 response.data 部分
};

// 获取国家列表
export const getNationList = async (): Promise<Result<String[]>> => {
  const response = await Request.get<String[]>('/developer/select/nation');
  return response.data; // 只返回 response.data 部分
};

// 分页获取开发者列表
export const getDeveloperList = async (): Promise<Result<Developer[]>> => {
  const response = await Request.get<Developer[]>('/developer/select/fieldAndNation');
  return response.data; // 只返回 response.data 部分
}

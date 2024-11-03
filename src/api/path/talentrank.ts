// src/api/path/talentrank.ts
import Request from '@/api/ApiService';
import { Result } from '@/types/Result';
import { Developer } from '@/types/TalentRank';

// 获取领域标签列表
export const getFieldList = async (): Promise<Result<string[]>> => {
  const response = await Request.get<string[]>('/developer/select/field');
  return response.data; // 只返回 response.data 部分
};

// 获取国家列表
export const getNationList = async (): Promise<Result<string[]>> => {
  const response = await Request.get<string[]>('/developer/select/nation');
  return response.data; // 只返回 response.data 部分
};

// 分页获取开发者列表
export const getDeveloperList = async (field: string,nation: string, page: number, pageSize: number): Promise<Result<Developer[]>> => {
  const response = await Request.get<Developer[]>('/developer/select/fieldAndNation?page='+page+'&pageSize='+pageSize+`${field === ''?'':'&field='+field}`+`${nation === ''?'':'&nation='+nation}`);
  return response.data; // 只返回 response.data 部分
}

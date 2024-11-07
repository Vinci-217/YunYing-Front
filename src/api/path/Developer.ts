// src/api/path/Developer.ts
import Request from '@/api/ApiService';
import { Result } from '@/types/Result';
import { DeveloperInfo, Repository, AIDocument,Language,RawLanguageDataResponse} from '@/types/Developer';
// 获取指定开发者信息
export const getDeveloperInfo = async (): Promise<Result<DeveloperInfo>> => {
  try {
    const response = await Request.get<DeveloperInfo>(
      'http://127.0.0.1:4523/m1/5316142-4986155-default/developer/select/1'
    );
    return response.data; 
  } catch (error) {
    console.error('获取开发者信息失败:', error);
    throw error; // 抛出错误，方便在调用时处理
  }
};
// 获取指定开发者的 AI 报告
export const getDeveloperAIReport = async (): Promise<Result<AIDocument[]>> => {
  try {
    const response = await Request.get<AIDocument[]>(
      `http://127.0.0.1:4523/m1/5316142-4986155-default/developer/select/ai-report/1`
    );
    return response.data;
  } catch (error) {
    console.error('获取 AI 报告失败:', error);
    throw error;
  }
};





// 获取指定开发者的贡献项目列表
export const getDeveloperContributedProjects = async (): Promise<Result<Repository[]>> => {
  try {
    const response = await Request.get<Repository[]>(`http://127.0.0.1:4523/m1/5316142-4986155-default/developer/select/contribution/1`);
    return response.data; 
  } catch (error) {
    console.error('获取贡献项目失败:', error);
    throw error;
  }
};


//获取指定开发者的语言
export const getDeveloperLanguages = async (): Promise<Language[]> => {
  try {
    const response = await Request.get<RawLanguageDataResponse>('http://127.0.0.1:4523/m1/5316142-4986155-default/developer/select/language/115935217');
    
    // 将对象形式转换为数组形式
    const languages: Language[] = Object.entries(response.data.data).map(([name, value]) => ({
      name,
      value
    }));
    
    return languages; // 返回数组形式的数据
  } catch (error) {
    console.error('获取语言数据失败:', error);
    throw error;
  }
};
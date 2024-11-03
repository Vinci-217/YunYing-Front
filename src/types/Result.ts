// 定义通用的 RESTful API 响应格式 Result<T>
export interface Result<T> {
  code: number;
  message: string;
  data: T;
};
// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Result } from "@/types/Result";

import { message } from "antd";

// Request 类：封装了 Axios 实例，
// 提供了通用的请求方法 get、post、put、delete 等，并包含请求和响应拦截器。
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: "http://192.168.0.102:4523/m1/5316142-4986155-default", timeout: 60000 };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    // 可以通过传入的 config 参数来覆盖默认配置
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 一般会请求拦截里面加token，用于后端的验证
        // const token = localStorage.getItem("token") as string
        // if(token) {
        //   config.headers!.Authorization = token;
        // }

        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res;
      },
      (err: any) => {
        // 处理http常见错误，进行全局提示
        let messageInfo = "";
        switch (err.response.status) {
          case 400:
            messageInfo = "请求错误(400)";
            break;
          case 401:
            messageInfo = "未授权，请重新登录(401)";
            break;
          case 403:
            messageInfo = "拒绝访问(403)";
            break;
          case 404:
            messageInfo = "请求出错(404)";
            break;
          case 408:
            messageInfo = "请求超时(408)";
            break;
          case 500:
            messageInfo = "服务器错误(500)";
            break;
          case 501:
            messageInfo = "服务未实现(501)";
            break;
          case 502:
            messageInfo = "网络错误(502)";
            break;
          case 503:
            messageInfo = "服务不可用(503)";
            break;
          case 504:
            messageInfo = "网络超时(504)";
            break;
          case 505:
            messageInfo = "HTTP版本不受支持(505)";
            break;
          default:
            messageInfo = `连接出错(${err.response.status})!`;
        }
        // 这里错误消息可以使用全局弹框展示出来
        // 使用antd的message
        message.error(messageInfo);
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }
}

// 默认导出Request实例
export default new Request({})

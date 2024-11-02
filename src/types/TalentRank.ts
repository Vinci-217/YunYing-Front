// 定义开发者排名页面相关类型
export interface Developer{
  avatar: string;
  bio: string;
  blog: string;
  create_time: string;
  dev_id: number;
  dev_login: string;
  dev_name: string;
  email: string;
  field: string;
  field_conf: number;
  followers: number;
  followers_weight: number;
  following: number;
  home: string;
  location: string;
  nation: string;
  nation_conf: number;
  profile: string;
  talent_rank: number;
  update_time: string;
  [property: string]: any;
}
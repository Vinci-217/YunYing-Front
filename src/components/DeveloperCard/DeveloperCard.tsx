import React from 'react';
import './DeveloperCard.scss';
import { Rate, Popover } from 'antd';

// 导入icon
import icons from '@/assets/icons/index';
import nationIcons from '@/assets/nation-icons';

import { Developer } from '@/types/TalentRank';

interface DeveloperCardProps extends Developer {
  className?:string,
  rank:number
}

const DeveloperCard: React.FC<DeveloperCardProps> = (props) => {
    return (
      <div>
        <div className={`developer-card ${props.className}`}>
          <div className='rank'>
            <img src={
              props.rank === 1 ? icons['rank1'] :
              props.rank === 2 ? icons['rank2'] :
              props.rank === 3 ? icons['rank3'] :
              icons['rank4']
            }></img>
            <div className='text'>{props.rank}</div>
          </div>
          <Popover placement="bottomLeft" title='中国' content={`置信度：${props.nation_conf}`}>
            <div className='nation'>
              <img src={nationIcons['China']}></img>
            </div>
          </Popover>
          <div className='avatar'>
            <img src={props.avatar}></img>
          </div>
          <div className='name'>{props.dev_login}</div>
          <div className='followers'>
            <div className='left-divider'></div>
            <div className='count'>粉丝数：{props.followers}</div>
            <div className='right-divider'></div>
          </div>
          <div className='rate'>
            <Rate disabled allowHalf defaultValue={props.talent_rank} />
          </div>
          <div className='repo'>
            拥有 <span>{props.talent_rank}</span> 个仓库
          </div>
        </div>

        <div className='grade'>
          <div className='icon'>
            <img src={icons[props.grade as keyof typeof icons]}></img>  
          </div>
          <div className='text'>
            级开发者
          </div>
        </div>
      </div>
    );
};

export default DeveloperCard;
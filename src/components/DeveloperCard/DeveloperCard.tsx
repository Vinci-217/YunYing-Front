import React from 'react';
import './DeveloperCard.scss';
import { Rate, Popover } from 'antd';

// 导入icon
import icons from '@/assets/icons/index';
import nationIcons from '@/assets/nation-icons';

interface DeveloperCardProps {
  rank?: number;
  className?: string;
  avatar?: string;
  name?: string;
  followers?: number;
  confidence?: number;
  repo?: number;
  rate?: number;
  grade?: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  rank = 1,
  className = '',
  avatar = '',
  name = '牛逼的开发者',
  followers = 999,
  confidence = 0.89,
  repo = 100,
  rate = 4.5,
  grade = 's'
}) => {
    return (
      <div>
        <div className={`developer-card ${className}`}>
          <div className='rank'>
            <img src={
              rank === 1 ? icons['rank1'] :
              rank === 2 ? icons['rank2'] :
              rank === 3 ? icons['rank3'] :
              icons['rank4']
            }></img>
            <div className='text'>{rank}</div>
          </div>
          <Popover placement="bottomLeft" title='中国' content={`置信度：${confidence}`}>
            <div className='nation'>
              <img src={nationIcons['China']}></img>
            </div>
          </Popover>
          <div className='avatar'>
            <img src={avatar}></img>
          </div>
          <div className='name'>{name}</div>
          <div className='followers'>
            <div className='left-divider'></div>
            <div className='count'>粉丝数：{followers}</div>
            <div className='right-divider'></div>
          </div>
          <div className='rate'>
            <Rate disabled allowHalf defaultValue={rate} />
          </div>
          <div className='repo'>
            拥有<span>{repo}</span>个仓库
          </div>
        </div>

        <div className='grade'>
          <div className='icon'>
            <img src={icons[grade as keyof typeof icons]}></img>  
          </div>
          <div className='text'>
            级开发者
          </div>
        </div>
      </div>
    );
};

export default DeveloperCard;
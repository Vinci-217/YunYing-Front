import React from 'react';
import './DeveloperCard.scss';
import { Rate, Popover } from 'antd';
import { fieldsMap } from '@/assets/maps/fields';
import { nationsMap } from '@/assets/maps/nations';
import { useNavigate } from 'react-router-dom';
// 国旗icon
import { FlagIcon, FlagIconCode } from "react-flag-kit";

// 导入icon
import icons from '@/assets/icons/index';
import nationIcons from '@/assets/nation-icons';

import { Developer } from '@/types/TalentRank';

interface DeveloperCardProps extends Developer {
  className?:string,
  rank:number
}

const DeveloperCard: React.FC<DeveloperCardProps> = (props) => {

    const navigate = useNavigate();

    return (
      <div>
        <div className={`developer-card ${props.className}`} onClick={() => navigate(`/developer?id=${props.dev_id}`)}>
          <div className='rank'>
            <img src={
              props.rank === 1 ? icons['rank1'] :
              props.rank === 2 ? icons['rank2'] :
              props.rank === 3 ? icons['rank3'] :
              icons['rank4']
            }></img>
            <div className='text'>{props.rank}</div>
          </div>
          <Popover placement="bottomLeft" title={nationsMap[props.nation as keyof typeof nationsMap]} content={`置信度：${props.nation_conf}`}>
            <div className='nation'>
              <FlagIcon code={props.nation as FlagIconCode}/>
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
            <Rate disabled allowHalf defaultValue={props.talent_rank/2} />
          </div>
          <div className='repo'>
            <span>所属领域：{fieldsMap[props.field as keyof typeof fieldsMap]}</span>
          </div>
        </div>

        <div className='grade' onClick={() => navigate(`/developer?id=${props.dev_id}`)}>
          <div className='icon'>
            {props.talent_rank >=9?(
              <img src={icons['s']}></img> 
            ):props.talent_rank >=7?(
              <img src={icons['a']}></img> 
            ):props.talent_rank >=5?(
              <img src={icons['b']}></img>
            ):props.talent_rank >=3?(
              <img src={icons['c']}></img>
            ):(
              <img src={icons['d']}></img>
            )}
          </div>
          <div className='text'>
            级开发者
          </div>
        </div>
      </div>
    );
};

export default DeveloperCard;
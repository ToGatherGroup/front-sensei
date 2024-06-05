import React from 'react'
import Back from '../../../public/svg/injuries/Back';
import Front from '../../../public/svg/injuries/Front';

type InjuriesProps = {
  injuries: string[];
  type: 'back' | 'front';
  width: string;
}

const Injuries = ({ injuries, type, width }: InjuriesProps) => {

  return (
    <div>
      {type === 'back' ? (
        <Back injuries={injuries} width={width} />
      ) : (
        <Front injuries={injuries} width={width} />
      )}
    </div>
  )

}

export default Injuries

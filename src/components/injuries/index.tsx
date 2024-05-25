import React from 'react'
import Back from '../../../public/svg/injuries/Back';
import Front from '../../../public/svg/injuries/Front';

type InjuriesProps = {
  injuries: string[];
  type: 'back' | 'front';
}

const Injuries = ({ injuries, type  }: InjuriesProps) => {

  return (
    <div>
      {type === 'back' ? (
        <Back injuries={injuries} />
      ) : (
        <Front injuries={injuries} />
      )}
    </div>
  )

}

export default Injuries

import React from 'react'
import Back from '../../../public/svg/injuries/Back';
import Front from '../../../public/svg/injuries/Front';

type InjuriesProps = {
  injuries: string[];
  type: 'back' | 'front';
  width?: string;
  viewBoxSecondValue?: string;
}

const Injuries = ({ injuries, type, width, viewBoxSecondValue }: InjuriesProps) => {

  return (
    <div>
      {type === 'back' ? (
        <Back injuries={injuries} width={width} viewBoxSecondValue={viewBoxSecondValue} />
      ) : (
        <Front injuries={injuries} width={width} viewBoxSecondValue={viewBoxSecondValue} />
      )}
    </div>
  )

}

export default Injuries

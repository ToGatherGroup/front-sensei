import React from 'react'
import Front from './../../../public/svg/injuries/Front'

const Injuries = () => {
  const injuries = ['ANTERIOR_CABECA', 'ANTERIOR_ABDOMINAL', 'ANTERIOR_TORAXICA'];
  return (
    <div>
      <Front injuries={injuries} />
    </div>
  )
}

export default Injuries

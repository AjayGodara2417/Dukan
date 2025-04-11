import React from 'react'
interface Props {
  text: string;
}
const Heading: React.FC<Props> = (props) => {
  const {text} = props;
  return (
    <div className='text-4xl font-medium text-center pt-15'>{text}</div>
  )
}

export default Heading
import React from 'react'

interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { text, onClick } = props;
  return (
    <button className='hover:cursor-pointer' onClick={onClick}>{text}</button>
  )
}

export default Button
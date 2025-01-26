import React from 'react'

type primaryButtonProps = {
  text: string;
}

const PrimaryButton: React.FC<primaryButtonProps> = ({ text }) => {
  return (
    <div className='flex justify-center items-center bg-secondary radius py-2 px-5  rounded-lg max-w-max h-max text-lightNeutral font-bold text-sm cursor-pointer lg:text-lg md:text-base'>
        <p>{text}</p>
    </div>
  )
}

export default PrimaryButton
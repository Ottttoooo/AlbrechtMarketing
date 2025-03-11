import Link from "next/link";
import React from "react";

type primaryButtonProps = {
  text: string;
};

const PrimaryButton: React.FC<primaryButtonProps> = ({ text }) => {
  return (
    <Link href={'/contact'}>
      <div className="flex justify-center items-center bg-secondary hover:bg-secondaryHover transition-all radius py-2 px-5  rounded-lg w-max max-w-max h-max text-lightNeutral font-bold text-sm cursor-pointer lg:text-lg md:text-base">
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default PrimaryButton;

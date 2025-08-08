import Link from "next/link";
import React from "react";

type primaryButtonProps = {
  text: string;
};

const PrimaryButton: React.FC<primaryButtonProps> = ({ text }) => {
  return (
    <Link href={'/contact/consultation'}>
      <div className="flex justify-center items-center bg-accent hover:bg-accentHover transition-all radius py-2 px-5 rounded-lg w-max max-w-max h-max text-gray-100 font-bold text-xs sm:text-sm cursor-pointer lg:text-lg md:text-base box-border border border-transparent drop-shadow-lg">
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default PrimaryButton;

import Link from "next/link";
import React from "react";

type primaryButtonProps = {
  text: string;
};

const PrimaryButton: React.FC<primaryButtonProps> = ({ text }) => {
  return (
    <Link href={'/contact/consultation'}>
      <div className="flex justify-center items-center bg-primary hover:bg-primaryHover transition-all radius py-2 px-5 rounded-lg w-max max-w-max h-max text-lightNeutral font-bold text-xs sm:text-sm cursor-pointer lg:text-lg md:text-base box-border border border-transparent">
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default PrimaryButton;

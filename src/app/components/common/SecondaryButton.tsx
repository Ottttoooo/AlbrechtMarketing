import Link from "next/link";
import React from "react";

type buttonProps = {
  color: string;
  text: string;
};

const SecondaryButton: React.FC<buttonProps> = ({ color, text }) => {
  const textClasses =
    color === "light" ? "text-lightNeutral" : "text-darkNeutral";
  const borderClasses =
    color === "light" ? "border-lightNeutral" : "border-darkNeutral";
  const textHoverClasses =
    color === "light" ? "hover:text-darkNeutral" : "hover:text-lightNeutral";
  const bgHoverClasses =
    color === "light" ? "hover:bg-lightNeutral" : "hover:bg-darkNeutral";
  return (
    <Link href={"/pricing"}>
      <div
        className={`flex justify-center items-center  radius px-5 py-2 rounded-lg max-w-max w-max h-max ${textClasses} ${textHoverClasses} ${bgHoverClasses} transition-all font-medium text-sm cursor-pointer ${borderClasses} border-[1px] lg:text-lg md:text-base`}
      >
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default SecondaryButton;

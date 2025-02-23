import React from "react";
import Image from "next/image";

type ReviewProps = {
  text: string;
  name: string;
  position: string;
  rating: string;
};

const ReviewCard: React.FC<ReviewProps> = ({
  rating,
  text,
  name,
  position,
}) => {
  return (
    <div className="flex flex-col w-auto sm:w-[470px] px-2 py-5 rounded-2xl bg-slate-100">
      <div className="flex flex-col w-full px-7">
        <p className="text-5xl md:text-7xl m-0 mb-[-20px] md:mb-[-40px]">&quot;</p>
        <div className="flex py-3 flex-col">
          <p className="mb-2">{rating}</p>
          <p className="italic">{text}</p>
        </div>
      </div>
      <div className="flex px-7 gap-3">
        <div className="">
          <Image
            src={"/images/Ellipse 1.jpg"}
            alt={""}
            width={90}
            height={90}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <h3 className="text-xl">{name}</h3>
          <p className="text-base">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

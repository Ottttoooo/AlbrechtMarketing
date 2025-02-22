import React from "react";
import Image from "next/image";

const ReviewCard = () => {
  return (
    <div className="flex flex-col w-auto sm:w-[470px] px-2 py-5 rounded-2xl bg-slate-100">
      <div className="flex flex-col w-full px-7">
        <p className="text-7xl m-0 mb-[-40px]">&quot;</p>
        <div className="flex py-3">
          <p>
            Lorem ipsum dolor sit amet consectetur. Imperdiet consequat
            hendrerit viverra sodales id volutpat. Mattis pulvinar sodales
            bibendum sed diam sapien. Sed diam velit nulla non. Tortor blandit
            risus nec at.
          </p>
        </div>
      </div>
      <div className="flex px-7 gap-3">
        <div className="">
          <Image src={"/images/Ellipse 1.jpg"} alt={""} width={90} height={90} className="rounded-full"/>
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <h3 className="text-xl">Omar Al-Dakkak</h3>
          <p className="text-base">Freiberufler Diorama</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

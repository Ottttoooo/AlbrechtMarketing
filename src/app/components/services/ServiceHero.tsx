import React from "react";
import Image from "next/image";

type serviceHeroProps = {
  title: string;
  subTitle: string;
  imageUrl: string;
};

const ServiceHero: React.FC<serviceHeroProps> = ({
  title,
  subTitle,
  imageUrl,
}) => {
  return (
    <section className="flex w-full justify-center bg-accentLow">
      <div className="flex w-full max-w-[1200px] px-8 items-center justify-between gap-8 flex-col sm:flex-row mb-9">
        <div className="flex flex-col sm:max-w-[700px]">
          <h1 className="font-bold text-2xl mt-4 sm:mt-0 md:text-5xl sm:text-4xl text-center sm:text-left">
            {title}
          </h1>
          <p className="text-base text-center sm:text-left">{subTitle}</p>
        </div>
        <div className="sm:h-96 min-w-[200px] flex items-center">
          <Image
            src={imageUrl}
            alt={"Web Design"}
            width={200}
            height={200}
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;

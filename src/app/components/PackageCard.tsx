import React from "react";

type packageCardProps = {
  title: string;
  description: string;
  price: string;
  list: React.ReactNode;
  monthly: boolean;
};

const PackageCard: React.FC<packageCardProps> = ({
  title,
  description,
  price,
  list,
  monthly,
}) => {
  const PriceSuccessor = monthly === true ? "/Mo " : "";

  return (
    <div className="flex flex-col w-[300px] h-max p-8 items-center gap-6 bg-primary text-lightNeutral rounded-lg">
      <div className="top flex w-full flex-col gap-4 items-center h-full">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-center text-sm">{description}</p>
        <div className="flex w-full items-end justify-center">
          <p>ab </p>
          <div className="flex items-start">
            <p className="text-5xl font-bold">{price}</p>
            <p className="text-2xl font-bold">€</p>
          </div>
          <p>{PriceSuccessor}</p>
        </div>
        <ul>{list}</ul>
      </div>

      <button className="bg-darkNeutral flex justify-center items-center radius py-2 px-5 rounded-lg max-w-max h-max text-lightNeutral font-bold text-sm cursor-pointer lg:text-lg md:text-base">
        <p>Mehr Erfahren</p>
      </button>
    </div>
  );
};

export default PackageCard;

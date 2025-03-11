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
    <div className="flex flex-col w-[350px] h-max items-center bg-lightNeutral text-lightNeutral rounded-lg overflow-hidden border-2 border-darkNeutral">
      
      <div className="top flex w-full flex-col gap-4 items-center h-full px-8 py-3 bg-darkNeutral">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="top flex w-full flex-col gap-4 items-center h-full px-8 py-3 bg-lightNeutral text-darkNeutral">
        <p className="text-sm">{description}</p>
      </div>

      <div className="top flex w-full flex-col gap-4 items-center h-full px-8 py-3 bg-darkNeutral">
        <ul className="text-sm">{list}</ul>
      </div>

      <div className="flex w-full items-end justify-center px-8 py-4 text-darkNeutral bg-lightNeutral">
        <p>ab </p>
        <div className="flex items-start">
          <p className="text-5xl font-bold">{price}</p>
          <p className="text-2xl font-bold">€</p>
        </div>
        <p>{PriceSuccessor}</p>
      </div>
    </div>
  );
};

export default PackageCard;

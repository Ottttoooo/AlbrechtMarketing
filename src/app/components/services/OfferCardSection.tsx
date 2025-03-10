"use client";

import React from "react";
import OfferCard from "./OfferCard";

type OfferCard = {
  pictureUrl: string;
  pictureAlt: string;
  title: string;
  text: string;
};

type offerCardSectionProps = {
  title: string;
  offerCards: OfferCard[];
};

const OfferCardSection: React.FC<offerCardSectionProps> = ({
  title,
  offerCards,
}) => {
  const cardList: OfferCard[] = [];
  let i = 0;
  while (true) {
    if (offerCards[i] === undefined) break;
    const item = offerCards[i];
    cardList.push(item);
    i++;
  }

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-[600px] px-8 py-20">
      <div className="max-w-[1200px] w-full flex flex-col gap-5">
        <h2 className="font-bold text-4xl">{title}</h2>

        <div className="max-w-[1200px] w-full flex flex-wrap gap-5">
          {cardList.map((item: OfferCard, index: number) => (
            <OfferCard
              pictureUrl={item.pictureUrl}
              pictureAlt={item.pictureAlt}
              title={item.title}
              text={item.text}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferCardSection;

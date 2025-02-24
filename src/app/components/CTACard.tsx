import React from "react";
import Buttons from "./Buttons";

type CTACardProps = {
  color: string;
  heading: string;
  primary: string;
  secondary: string;
};

const CTACard: React.FC<CTACardProps> = ({ color = "light", heading, primary, secondary }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-darkNeutral px-8 py-8 gap-4 sm:py-12 sm:gap-9">
      <h2 className="text-lightNeutral text-center font-semibold text-2xl sm:text-4xl md:text-5xl">{heading}</h2>
      <Buttons color={color} primary={primary} secondary={secondary} center="yes"/>
    </div>
  );
};

export default CTACard;

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
    <div className="w-full flex flex-col items-center bg-darkNeutral py-12 gap-9">
      <h2 className="text-lightNeutral font-semibold text-5xl">{heading}</h2>
      <Buttons color={color} primary={primary} secondary={secondary}/>
    </div>
  );
};

export default CTACard;

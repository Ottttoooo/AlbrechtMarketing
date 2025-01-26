import React from "react";
import Image from "next/image";

type InfoBoxProps = {
  title: string;
  description: React.ReactNode; // can be string or JSX
  imageSrc: string;
  imageAlt: string; // optional if you want
  imagePosition: string;
  textDirection: string;
};

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "left", // default is left
  textDirection = "left", // default is left
}) => {
  const containerClasses =
    imagePosition === "left" ? "flex-row" : "flex-row-reverse";

  const textClasses = 
  textDirection === 'left' ? "text-left" : "text-right";

  return (
    <section className={`flex ${containerClasses} gap-12 p-4 align-middle`}>
      <div className="min-w-[33%]">
        {/* You can use next/image or a plain img tag here */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={400}
          className="w-full"
        />
      </div>

      {/* Text on the right */}
      <div className={`flex flex-col w-full justify-center`}>
        <h2 className={`text-4xl font-black mb-2 ${textClasses}`}>{title}</h2>
        <p className={`${textClasses} text-base`}>{description}</p>
      </div>
    </section>
  );
};

export default InfoBox;

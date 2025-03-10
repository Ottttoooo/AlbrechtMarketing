import Image from "next/image";

type offerCardProps = {
  pictureUrl: string;
  pictureAlt: string;
  title: string;
  text: string;
};

const OfferCard : React.FC<offerCardProps> = ({
  pictureUrl,
  pictureAlt,
  title,
  text,
}) => {
  return (
    <div className="flex flex-col py-10 px-8 rounded-3xl justify-center w-[380px] witems-center bg-subTextLight">
      <div className="flex w-full justify-center h-[200px] mb-6">
        <Image
          src={pictureUrl}
          alt={pictureAlt}
          width={200}
          height={200}
          className="h-full w-auto"
        ></Image>
      </div>
      <div className="flex flex-col flex-grow justify-start ">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <p className="text-base">{text}</p>
      </div>
    </div>
  );
};

export default OfferCard;

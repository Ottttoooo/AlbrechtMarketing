import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  imageClassName?: string;
}

export default function ServiceCard({ 
  href, 
  imageSrc, 
  imageAlt, 
  title, 
  imageClassName = "w-[100px] md:w-[150px] h-auto mb-5" 
}: ServiceCardProps) {
  return (
    <div className="flex justify-center items-center rounded-lg">
      <Link href={href} className="max-w-max min-w-[275px] sm:min-w-[356px] ">
        <div className="flex flex-col items-center justify-end h-full hover:bg-slate-200 rounded-xl shadow-md p-2 sm:p-4 bg-cardbg sm:min-h-[250px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={150}
            height={150}
            className={imageClassName}
          />
          <h2 className="font-bold text-lg sm:text-2xl text-center">
            {title}
          </h2>
        </div>
      </Link>
    </div>
  );
}

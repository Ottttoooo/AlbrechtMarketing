"use client";

import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

type ReviewProps = {
  text: string;
  name: string;
  position: string;
  rating: string;
  image: string;
};

const ReviewCard: React.FC<ReviewProps> = ({
  rating,
  text,
  name,
  position,
  image,
}) => {
  return (
    <motion.div
      className="flex flex-col w-auto sm:w-[470px] px-2 py-5 rounded-2xl bg-slate-100 md:flex-1"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col w-full px-7 flex-grow">
        <p className="text-5xl md:text-7xl m-0 mb-[-20px] md:mb-[-40px]">
          &quot;
        </p>
        <div className="flex flex-col py-3 flex-grow">
          <p className="mb-2">{rating}</p>
          <p className="italic flex-grow">{text}</p>
        </div>
      </div>
      <div className="flex px-7 gap-3 mt-auto">
        <div className="h-20 w-20">
          <Image
            src={image}
            alt={"profile picture"}
            width={90}
            height={90}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <h3 className="text-xl">{name}</h3>
          <p className="text-base">{position}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;

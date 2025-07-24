"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Variants } from "framer-motion";

type why = {
  title: string;
  text: string;
};

type whyList = why[];

type whyProps = {
  title: string;
  whyList: whyList;
};

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Controls the delay between each child animation
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Why: React.FC<whyProps> = ({ title, whyList }) => {
  return (
    <section className="flex flex-col items-center justify-center w-full px-8 py-20">
      <div className="flex flex-col-reverse md:flex-row items-center gap-6 justify-between w-full max-w-[1200px] overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col w-full lg:max-w-[50%] gap-3 overflow-hidden"
        >
          <motion.h2
            variants={textVariants}
            className="font-bold text-3xl sm:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="list-disc pl-5"
          >
            {whyList.map((item: why, index: number) => (
              <motion.li
                variants={textVariants}
                key={index}
                className="text-base mb-4 leading-[1.2em]"
              >
                <span className="font-bold">{item.title}</span>
                {item.text}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <div className="min-h-full w-full max-w-[50%] md:pl-6 flex items-center">
          <Image
            src={"/images/team.png"}
            alt={"team"}
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Why;

"use client";
import { motion } from "framer-motion";
import React from "react";
import Step from "./Step";
import { Variants } from "framer-motion";

type stepsSectionProps = {
  title: string;
  subTitle: string;
  stepsList: stepsList;
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

type step = {
  title: string;
  text: string;
};

type stepsList = step[];

const StepsSection: React.FC<stepsSectionProps> = ({
  title,
  subTitle,
  stepsList,
}) => {
  return (
    <section className="flex flex-col items-center justify-center w-full px-8 py-20">
      <div className="flex flex-col w-full max-w-[1200px] overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          <motion.h2
            variants={textVariants}
            className="font-bold text-3xl sm:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p variants={textVariants} className="text-bas">
            {subTitle}
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stepsList.map((item: step, index: number) => (
              <motion.div key={index} variants={textVariants}>
                <Step number={index + 1} title={item.title} text={item.text} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;

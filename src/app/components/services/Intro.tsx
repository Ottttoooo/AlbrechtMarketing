"use client";
import React from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

type introProps = {
  title: string;
  text: string;
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

const Intro: React.FC<introProps> = ({ title, text }) => {
  return (
    <section className="flex flex-col items-center justify-center w-full px-8 py-20">
      <div className="flex flex-col w-full max-w-[1200px] overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:w-2/3 gap-3"
        >
          <motion.h2
            variants={textVariants}
            className="font-bold text-3xl sm:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p variants={textVariants} className="text-bas">
            {text}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;

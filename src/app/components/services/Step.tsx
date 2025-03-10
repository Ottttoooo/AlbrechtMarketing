"use client";
import { motion } from "framer-motion";
import React from "react";

type stepProps = {
  number: number;
  title: string;
  text: string;
};

const Step: React.FC<stepProps> = ({ number, title, text }) => {
  return (
    <motion.div
      className="step1 flex w-full sm:w-auto sm:items-center gap-5 sm:p-3 mb-6"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center min-w-[50px] w-[50px] min-h-[50px] h-[50px] sm:w-[100px] sm:h-[100px] max-w-[100px] max-h-[100px] rounded-lg bg-darkNeutral">
        <p className="font-bold text-3xl sm:text-5xl text-lightNeutral">
          {number}
        </p>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <div className="sm:font-semibold text-[14px]">
          {text.split("\n\n").map((paragraph, idx) => {
            // Check if the paragraph contains a list item (starting with "- ")
            if (paragraph.trim().startsWith("- ")) {
              return (
                <ul key={idx} className="list-disc list-inside">
                  {paragraph.split("\n").map((line, i) => (
                    <li key={i} className="mb-4 leading-[1.2em]">{line.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            } else {
              return <p key={idx} className="mb-2">{paragraph}</p>;
            }
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Step;

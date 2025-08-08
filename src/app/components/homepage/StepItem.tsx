import { motion } from "framer-motion";

interface StepItemProps {
  stepNumber: number;
  heading: string;
  text: string;
  animationDelay?: number;
}

export default function StepItem({ 
  stepNumber, 
  heading, 
  text, 
  animationDelay = 50 
}: StepItemProps) {
  const stepsNumberClasses =
    "flex items-center justify-center min-w-[40px] w-[40px] min-h-[40px] h-[40px] sm:w-[70px] sm:h-[70px] max-w-[70px] max-h-[70px] rounded-lg bg-darkNeutral";

  return (
    <motion.div
      className="step1 flex w-full sm:w-auto sm:items-center gap-5 sm:p-3 mb-6"
      initial={{ opacity: 0, x: 50 + animationDelay }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={stepsNumberClasses}>
        <p className="font-bold text-xl sm:text-5xl text-lightNeutral">
          {stepNumber}
        </p>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-xl sm:text-2xl">{heading}</h3>
        <p className="sm:font-normal text-xs sm:text-[14px]">{text}</p>
      </div>
    </motion.div>
  );
}

"use client";
import { useState, useRef } from "react";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gray-300 pb-4">
      {/* Question */}
      <h3
        onClick={() => setIsOpen(!isOpen)}
        className="font-semibold text-lg cursor-pointer flex items-center justify-between text-darkNeutral"
      >
        {question}
        <span className="ml-2">{isOpen ? "−" : "+"}</span>
      </h3>

      {/* Answer */}
      <div
        ref={answerRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${answerRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <p className="mt-2 text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;

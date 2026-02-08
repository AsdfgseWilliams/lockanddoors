// components/home/FAQ.tsx
"use client";

import { useState } from "react";

interface FAQItem {
  pregunta: string;
  respuesta: string;
}

interface FAQProps {
  titulo: string;
  items: FAQItem[];
}

export function FAQ({ titulo, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {titulo}
        </h2>
        
        <div className="space-y-4">
          {items
            .filter((item) => item.pregunta && item.respuesta)
            .map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-lg pr-8 text-gray-900">
                    {item.pregunta}
                  </span>
                  <span
                    className={`text-3xl font-light transition-transform duration-300 shrink-0 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className="px-6 pb-6 text-gray-600 prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.respuesta }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import React, { useState } from 'react';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle?: string;
  faqs: FaqItem[];
  viewAllLink?: string;
}

export default function FaqSection({
  title,
  subtitle,
  faqs,
  viewAllLink,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <SectionContainer background="gray">
      <SectionTitle 
        title={title}
        subtitle={subtitle}
      />
      
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div 
            key={faq.id} 
            className="mb-4 border-b border-gray-200 pb-4 last:border-b-0"
          >
            <button
              className="flex justify-between items-center w-full text-left font-medium text-lg py-3 focus:outline-none"
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <span className="text-primary">
                {openIndex === index ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>
            </button>
            
            <div 
              className={`transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="py-3 text-gray-600">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {viewAllLink && (
        <div className="text-center mt-12">
          <Button 
            href={viewAllLink}
            variant="secondary"
          >
            Tüm Soruları Görüntüle
          </Button>
        </div>
      )}
    </SectionContainer>
  );
} 
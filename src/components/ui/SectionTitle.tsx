import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  subtitleClassName?: string;
  titleClassName?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
  subtitleClassName = '',
  titleClassName = '',
}: SectionTitleProps) {
  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };
  
  return (
    <div className={`mb-12 max-w-3xl ${alignmentClasses[align]} ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={`text-lg text-gray-600 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
} 
import React from 'react';
import Button from '../ui/Button';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';

interface AboutSectionProps {
  title: string;
  subtitle?: string;
  description: string[];
  buttonText?: string;
  buttonLink?: string;
  stats?: Array<{ value: string; label: string }>;
}

export default function AboutSection({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  stats
}: AboutSectionProps) {
  return (
    <SectionContainer background="gray">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left side - image placeholder */}
        <div className="lg:w-1/2">
          <div className="bg-accent-gray h-full min-h-[300px] rounded-lg shadow-soft overflow-hidden relative">
            {/* Placeholder for image - would use Image component in production */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 text-lg font-medium">Şirket Görseli</span>
            </div>
            
            {/* Gold accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
          </div>
        </div>
        
        {/* Right side - content */}
        <div className="lg:w-1/2">
          <SectionTitle 
            title={title}
            subtitle={subtitle}
            align="left"
            className="mb-8"
          />
          
          <div className="space-y-4 mb-8">
            {description.map((paragraph, index) => (
              <p key={index} className="text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Stats section if provided */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg shadow-soft">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          
          {buttonText && buttonLink && (
            <Button 
              href={buttonLink}
              variant="primary"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </SectionContainer>
  );
} 
import React from 'react';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';

interface Feature {
  id: number;
  title: string;
  description: string;
  iconUrl?: string;
}

interface WhyUsSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export default function WhyUsSection({
  title,
  subtitle,
  features,
}: WhyUsSectionProps) {
  return (
    <SectionContainer background="dark">
      <SectionTitle 
        title={title}
        subtitle={subtitle}
        titleClassName="text-white"
        subtitleClassName="text-gray-300"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature) => (
          <div key={feature.id} className="text-center">
            {/* Icon placeholder */}
            <div className="mb-6 mx-auto">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-10 h-10 bg-primary rounded-full"></div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-white">
              {feature.title}
            </h3>
            
            <p className="text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Bottom decorative line */}
      <div className="max-w-xs mx-auto mt-16 flex items-center">
        <div className="flex-grow h-0.5 bg-primary/30"></div>
        <div className="w-4 h-4 bg-primary rounded-full mx-3"></div>
        <div className="flex-grow h-0.5 bg-primary/30"></div>
      </div>
    </SectionContainer>
  );
} 
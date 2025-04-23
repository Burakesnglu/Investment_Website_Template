'use client';

import React, { useEffect, useState, useRef } from 'react';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';

interface Stat {
  id: number;
  value: string;
  label: string;
  sublabel?: string;
}

interface StatsCounterSectionProps {
  title: string;
  subtitle?: string;
  stats: Stat[];
}

export default function StatsCounterSection({
  title,
  subtitle,
  stats,
}: StatsCounterSectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState<string[]>(stats.map(() => "0"));
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);
  
  const animateCounters = () => {
    // We'll animate simple values like numbers
    // For more complex values like "850+" we'll just show the full value immediately
    const animatableStat = (stat: string): { isAnimatable: boolean, numericValue: number } => {
      // Try to extract numeric value from the stat
      const numericMatch = stat.match(/^(\d+(\.\d+)?)/);
      if (numericMatch) {
        return { isAnimatable: true, numericValue: parseFloat(numericMatch[1]) };
      }
      return { isAnimatable: false, numericValue: 0 };
    };
    
    const duration = 2000; // Animation duration in milliseconds
    const steps = 60; // Number of steps in the animation
    const stepTime = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(interval);
        // Ensure final values are exact
        setAnimatedValues(stats.map(stat => stat.value));
        return;
      }
      
      const newValues = stats.map((stat) => {
        const { isAnimatable, numericValue } = animatableStat(stat.value);
        
        if (!isAnimatable) {
          return stat.value; // Return the original value for non-animatable stats
        }
        
        const progress = currentStep / steps;
        // Easing function for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(numericValue * easedProgress);
        
        // If the original value has a suffix like "+", keep it
        const suffix = stat.value.replace(/^(\d+(\.\d+)?)/, '');
        return `${currentValue}${suffix}`;
      });
      
      setAnimatedValues(newValues);
      currentStep++;
    }, stepTime);
  };
  
  return (
    <SectionContainer background="primary">
      <div ref={sectionRef}>
        <SectionTitle 
          title={title}
          subtitle={subtitle}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.id} className="text-center">
              <div className="mb-2 font-bold text-4xl md:text-5xl lg:text-6xl text-secondary">
                {animatedValues[index]}
              </div>
              <div className="text-text-dark font-medium">
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="text-text-dark/70 text-sm">
                  {stat.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
} 
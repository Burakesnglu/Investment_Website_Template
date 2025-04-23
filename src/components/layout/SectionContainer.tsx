import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'light' | 'dark' | 'primary' | 'secondary' | 'gray';
  padding?: 'normal' | 'large' | 'small' | 'none';
  animate?: boolean;
  style?: React.CSSProperties;
}

export default function SectionContainer({
  children,
  className = '',
  id,
  background = 'light',
  padding = 'normal',
  animate = false,
  style,
}: SectionContainerProps) {
  // Background classes based on the background prop
  const backgroundClasses = {
    light: 'bg-background-light',
    dark: 'bg-background-dark text-text-light',
    primary: 'bg-primary-light',
    secondary: 'bg-secondary text-text-light',
    gray: 'bg-accent-gray',
  };
  
  // Padding classes
  const paddingClasses = {
    normal: 'py-16 md:py-24',
    large: 'py-24 md:py-32',
    small: 'py-8 md:py-12',
    none: '',
  };
  
  // Animation class
  const animationClass = animate ? 'animate-fade-in' : '';
  
  return (
    <section
      id={id}
      className={`relative ${backgroundClasses[background]} ${paddingClasses[padding]} ${animationClass} overflow-hidden ${className}`}
      style={style}
    >
      {/* Optional decorative elements */}
      {background === 'primary' && (
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-5 -translate-y-1/2 translate-x-1/2" />
      )}
      {background === 'dark' && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary opacity-5 -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary opacity-5 translate-y-1/2 translate-x-1/2" />
        </>
      )}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {children}
      </div>
    </section>
  );
} 
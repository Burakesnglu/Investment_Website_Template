import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
  text?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
  text
}: LoadingSpinnerProps) {
  
  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'border-primary border-r-transparent',
    secondary: 'border-secondary border-r-transparent',
    white: 'border-white border-r-transparent'
  };
  
  // Text classes
  const textClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-4 border-solid ${sizeClasses[size]} ${colorClasses[color]}`} 
      />
      {text && (
        <p className={`mt-2 text-sm ${textClasses[color]}`}>{text}</p>
      )}
    </div>
  );
} 
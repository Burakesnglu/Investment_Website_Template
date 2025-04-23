import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  // Base classes
  const baseClasses = 'font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center';
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-6 text-base',
    lg: 'py-3 px-8 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-text-dark',
    secondary: 'bg-secondary hover:opacity-90 text-text-light',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-text-light',
    text: 'text-primary hover:underline',
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${widthClass} ${className}`;
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 
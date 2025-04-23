import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type CardVariant = 'default' | 'service' | 'fund' | 'team' | 'blog';

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  variant?: CardVariant;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  stats?: {
    label: string;
    value: string;
  }[];
}

export default function Card({
  title,
  description,
  imageSrc,
  href,
  variant = 'default',
  className = '',
  children,
  icon,
  stats,
}: CardProps) {
  // Base card classes
  const baseClasses = 'bg-white rounded-lg overflow-hidden transition-all duration-300';
  
  // Variant specific classes
  const variantClasses = {
    default: 'shadow-soft hover:shadow-premium p-6',
    service: 'shadow-soft hover:shadow-premium p-6 hover:translate-y-[-5px]',
    fund: 'shadow-soft hover:shadow-premium p-6 border-l-4 border-primary',
    team: 'shadow-soft hover:shadow-premium text-center',
    blog: 'shadow-soft hover:shadow-premium',
  };
  
  // Combined classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  // Card content based on variant
  const renderCardContent = () => {
    switch (variant) {
      case 'service':
        return (
          <>
            {icon && <div className="text-primary mb-4">{icon}</div>}
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            {description && <p className="text-gray-600">{description}</p>}
            {children}
          </>
        );
        
      case 'fund':
        return (
          <>
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            {description && <p className="text-gray-600 mb-4">{description}</p>}
            {stats && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <p className="text-lg font-medium text-primary">{stat.value}</p>
                  </div>
                ))}
              </div>
            )}
            {children}
          </>
        );
        
      case 'team':
        return (
          <>
            {imageSrc && (
              <div className="mb-4 relative w-full h-64">
                {/* Placeholder div, would use Image from next/image in production */}
                <div className="bg-accent-gray w-full h-full rounded-t-lg"></div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              {description && <p className="text-primary">{description}</p>}
              {children}
            </div>
          </>
        );
        
      case 'blog':
        return (
          <>
            {imageSrc && (
              <div className="relative w-full h-48">
                {/* Placeholder div, would use Image from next/image in production */}
                <div className="bg-accent-gray w-full h-full"></div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              {description && <p className="text-gray-600 line-clamp-3">{description}</p>}
              {children}
            </div>
          </>
        );
        
      default:
        return (
          <>
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            {description && <p className="text-gray-600">{description}</p>}
            {children}
          </>
        );
    }
  };
  
  // Wrap with Link if href is provided
  if (href) {
    return (
      <Link href={href} className="block hover:no-underline">
        <div className={cardClasses}>
          {renderCardContent()}
        </div>
      </Link>
    );
  }
  
  // Otherwise render as div
  return (
    <div className={cardClasses}>
      {renderCardContent()}
    </div>
  );
} 
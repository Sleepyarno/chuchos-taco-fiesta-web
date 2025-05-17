
import React from 'react';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md',
  withText = true 
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className="flex items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <img 
          src="/lovable-uploads/7cbe9c6a-9fd0-405b-9cd2-292374db3de2.png" 
          alt="Chucho's Tacos Logo" 
          className={`h-full w-auto`}
        />
      </div>
      {withText && (
        <div className="ml-3">
          <h1 className={`font-bold ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'}`}>
            Chucho's
          </h1>
          <p className={`text-xs ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`}>
            THE REAL MEXICAN FOOD
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;

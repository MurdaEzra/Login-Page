import React from 'react';
const Logo = ({
  size = 'md'
}: {
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-24'
  };
  return <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="flex flex-col items-center">
          <div className="text-black font-bold text-2xl md:text-4xl tracking-tight">
            ELSA
          </div>
          <div className="text-amber-700 font-semibold text-sm md:text-lg tracking-widest">
            ACADEMY
          </div>
        </div>
      </div>
    </div>;
};
export default Logo;
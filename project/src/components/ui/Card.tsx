import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-5 py-4 border-b border-gray-200 ${className}`}>{children}</div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`px-5 py-5 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-5 py-4 bg-gray-50 rounded-b-lg ${className}`}>{children}</div>
  );
};

export default Card;
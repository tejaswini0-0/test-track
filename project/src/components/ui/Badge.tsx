import React from 'react';

interface BadgeProps {
  status: 'pass' | 'fail' | 'pending';
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'pass':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'fail':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClasses()}`}
    >
      {children || status}
    </span>
  );
};

export default Badge;
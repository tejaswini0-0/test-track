import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon = <Inbox className="w-12 h-12 text-gray-400" />
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
      <div className="flex items-center justify-center w-20 h-20 mb-4 bg-gray-100 rounded-full">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mb-6 text-sm text-gray-500 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
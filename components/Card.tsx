import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  icon: LucideIcon;
  iconColorClass: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, icon: Icon, iconColorClass, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
        <div className={`p-2 rounded-lg ${iconColorClass} bg-opacity-10`}>
          <Icon className={`h-5 w-5 ${iconColorClass.replace('bg-', 'text-')}`} />
        </div>
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
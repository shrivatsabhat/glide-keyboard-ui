import React from 'react';
import { cn } from '@/lib/utils';

interface FormHeaderProps {
  formNumber?: string;
  quarter?: string;
  title: string;
  finYear?: string;
  fileName?: string;
  className?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  formNumber,
  quarter,
  title,
  finYear,
  fileName,
  className
}) => {
  return (
    <div className={cn("bg-form-section border border-border rounded-md p-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-form-label">Form:</span>
          <span className="text-primary font-semibold">{formNumber}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-form-label">Quarter:</span>
          <span className="font-semibold">{quarter}</span>
        </div>
        
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-bold text-primary">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-form-label">Fin Year:</span>
          <select className="px-2 py-1 text-sm border border-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-focus-ring">
            <option>{finYear}</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-form-label">File:</span>
          <span className="text-primary font-semibold">{fileName}</span>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
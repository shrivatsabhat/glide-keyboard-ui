import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  helpIcon?: boolean;
  onHelp?: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className,
  helpIcon,
  onHelp
}) => {
  return (
    <div className={cn("bg-form-section border border-border rounded-md", className)}>
      <div className="bg-form-header text-form-header-foreground px-4 py-2 font-medium text-sm flex items-center justify-between rounded-t-md">
        <span>{title}</span>
        {helpIcon && (
          <button
            type="button"
            onClick={onHelp}
            className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            tabIndex={0}
          >
            ?
          </button>
        )}
      </div>
      <div className="p-4 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
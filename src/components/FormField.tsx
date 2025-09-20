import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, required, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-form-label flex items-center gap-1">
          {label}
          {required && <span className="text-required">*</span>}
        </label>
        <input
          ref={ref}
          className={cn(
            "px-3 py-2 text-sm bg-card border border-border rounded-md",
            "focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-focus-ring",
            "hover:border-muted-foreground transition-colors duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-destructive focus:ring-destructive focus:border-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-destructive">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-xs text-muted-foreground">{helperText}</span>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={id} className="text-xs font-medium text-slate-gray font-body uppercase tracking-widest">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full px-4 py-3 bg-soft-gray border border-transparent rounded-md text-jet-black font-body placeholder:text-slate-gray focus:outline-none focus:border-emerald-lime focus:ring-1 focus:ring-emerald-lime transition-all duration-200 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

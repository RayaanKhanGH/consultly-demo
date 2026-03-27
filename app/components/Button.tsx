import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-md font-medium text-sm transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border text-center font-body flex items-center justify-center";
  
  const variants = {
    primary: "bg-emerald-lime text-white border-transparent hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,200,150,0.3)]",
    secondary: "bg-jet-black text-white border-transparent hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]",
    outline: "bg-transparent text-jet-black border-jet-black hover:bg-soft-gray",
    ghost: "bg-transparent text-slate-gray border-transparent hover:bg-soft-gray hover:text-jet-black"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

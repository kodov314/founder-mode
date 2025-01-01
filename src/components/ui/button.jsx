import { cn } from '../../utils/cn';

export const Button = ({ 
  children, 
  className, 
  variant = 'default',
  size = 'default',
  ...props 
}) => {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        
        // Variants
        variant === 'default' && "bg-white text-gray-900 hover:bg-gray-100",
        variant === 'gradient' && "bg-gradient-to-r from-[#e88d7c] to-[#b86ef7] text-white/90",
        
        // Sizes
        size === 'default' && "h-10 px-4 py-2",
        size === 'sm' && "h-9 px-3",
        size === 'lg' && "h-12 px-8 text-lg",
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}; 
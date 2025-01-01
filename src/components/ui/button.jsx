import { cn } from '../../utils/cn';

export const Button = ({ className, ...props }) => (
  <button
    className={cn(
      "px-6 py-3 rounded-2xl font-medium transition-all duration-300",
      "bg-gradient-to-r from-[#ff40ff] to-[#a041ff]",
      "hover:opacity-90 hover:shadow-lg",
      className
    )}
    {...props}
  />
); 
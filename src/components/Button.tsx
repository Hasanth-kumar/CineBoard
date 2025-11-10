'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'onClick'> {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
      };
      
      setRipples((prev) => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.(e);
  };

  const baseClasses = 'relative overflow-hidden rounded-lg font-semibold transition-all duration-300 hover-glow';
  
  const variantClasses = {
    primary: 'px-6 py-3 bg-gradient-to-r from-accent-teal to-accent-purple text-white',
    secondary: 'px-6 py-3 glass glass-hover text-white',
    ghost: 'px-6 py-3 text-white/80 hover:text-white hover:bg-white/5',
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
          animate={{
            width: 300,
            height: 300,
            x: ripple.x - 150,
            y: ripple.y - 150,
            opacity: [1, 0],
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}


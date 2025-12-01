'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = false, glow = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 p-6 md:p-8',
        glow && 'shadow-lg shadow-purple-500/20',
        hover && 'transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

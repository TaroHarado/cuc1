'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
}

export function Section({ children, className, title, subtitle, centered = false }: SectionProps) {
  return (
    <section className={cn('py-12 md:py-16', className)}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {(title || subtitle) && (
          <div className={cn('mb-8 md:mb-12', centered && 'text-center')}>
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn('text-lg md:text-xl text-gray-400 max-w-2xl', centered && 'mx-auto')}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

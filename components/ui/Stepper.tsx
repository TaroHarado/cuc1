'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  activeStep?: number;
  className?: string;
}

export function Stepper({ steps, activeStep = 0, className }: StepperProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Connection line */}
      <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-800">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ width: 0 }}
          animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isActive = index <= activeStep;
          const isCurrent = index === activeStep;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <motion.div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center border-2 relative z-10 text-lg font-bold',
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30'
                    : 'bg-gray-800 border-gray-700 text-gray-400'
                )}
                animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 1 }}
              >
                {step.icon}
              </motion.div>
              <div className="mt-4 text-center max-w-[150px]">
                <h3
                  className={cn(
                    'text-sm font-semibold mb-1',
                    isActive ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

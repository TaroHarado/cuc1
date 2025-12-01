'use client';

import { cn } from '@/lib/utils';
import type { NodeStatus } from '@/lib/types';

interface BadgeProps {
  status: NodeStatus | string;
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  provisioning: {
    label: 'Provisioning',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  running: {
    label: 'Running',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  expired: {
    label: 'Expired',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  stopped: {
    label: 'Stopped',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
};

export function Badge({ status, className }: BadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

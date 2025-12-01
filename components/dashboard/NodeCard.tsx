'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, formatSOL } from '@/lib/utils';
import type { Node } from '@/lib/types';
import Link from 'next/link';

interface NodeCardProps {
  node: Node;
}

export function NodeCard({ node }: NodeCardProps) {
  return (
    <Card className="hover:border-purple-300 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1 text-gray-900">{node.name}</h3>
          <p className="text-sm text-gray-600">{node.provider}</p>
        </div>
        <Badge status={node.status} />
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Plan:</span>
          <span className="text-gray-900 font-medium capitalize">{node.plan}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">GPUs:</span>
          <span className="text-gray-900 font-medium">{node.gpus}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="text-gray-900 font-semibold">{formatSOL(node.priceSOL)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Created:</span>
          <span className="text-gray-900">{formatDate(node.createdAt)}</span>
        </div>
        {node.expiresAt && (
          <div className="flex justify-between">
            <span className="text-gray-600">Expires:</span>
            <span className="text-gray-900">{formatDate(node.expiresAt)}</span>
          </div>
        )}
      </div>

      <Link href={`/dashboard/nodes/${node.id}`}>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </Link>
    </Card>
  );
}

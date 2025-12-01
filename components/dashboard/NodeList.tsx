'use client';

import { useEffect, useState } from 'react';
import { getNodes } from '@/lib/mock-api';
import { formatDate, formatSOL } from '@/lib/utils';
import type { Node } from '@/lib/types';
import Link from 'next/link';

export function NodeList() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNodes() {
      try {
        const data = await getNodes();
        setNodes(data);
      } catch (error) {
        console.error('Failed to load nodes:', error);
      } finally {
        setLoading(false);
      }
    }
    loadNodes();
  }, []);

  if (loading) {
    return (
      <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
        <div style={{ height: '3rem', background: '#f5f5f5', borderRadius: '0.5rem', marginBottom: '1rem' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: '4rem', background: '#f5f5f5', borderRadius: '0.5rem' }}></div>
          ))}
        </div>
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e5e5e5' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#000000' }}>No nodes yet</h3>
        <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
          Get started by renting your first H100 GPU node
        </p>
        <Link href="/pricing" className="btn btn-primary">
          Rent Your First Node
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#000000' }}>My Nodes</h2>
        <Link href="/pricing" className="btn btn-primary">
          Add New Node
        </Link>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: '0.75rem', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #e5e5e5' }}>
              <tr>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Node Name
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Provider
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Status
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Plan
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Price
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Created
                </th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node) => (
                <tr key={node.id} style={{ borderBottom: '1px solid #e5e5e5', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: 600, color: '#000000' }}>{node.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#666666' }}>{node.gpus} GPU{node.gpus > 1 ? 's' : ''}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.875rem', color: '#000000' }}>{node.provider}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                    <Badge status={node.status} />
                  </td>
                  <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '0.875rem', color: '#000000', textTransform: 'capitalize' }}>{node.plan}</span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#000000' }}>{formatSOL(node.priceSOL)}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.875rem', color: '#666666' }}>{formatDate(node.createdAt)}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
                    <Link href={`/dashboard/nodes/${node.id}`} className="btn btn-outline btn-sm">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const config: Record<string, { label: string; style: React.CSSProperties }> = {
    provisioning: {
      label: 'Provisioning',
      style: { background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' },
    },
    running: {
      label: 'Running',
      style: { background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' },
    },
    expired: {
      label: 'Expired',
      style: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' },
    },
    stopped: {
      label: 'Stopped',
      style: { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' },
    },
  };

  const badgeConfig = config[status] || {
    label: status,
    style: { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        ...badgeConfig.style,
      }}
    >
      {badgeConfig.label}
    </span>
  );
}

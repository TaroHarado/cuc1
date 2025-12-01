'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { getNodeById } from '@/lib/mock-api';
import { formatDate, formatSOL } from '@/lib/utils';
import { FarmingProgress } from '@/components/dashboard/FarmingProgress';
import type { Node } from '@/lib/types';

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
    style: { background: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', border: '1px solid rgba(107, 114, 128, 0.5)' },
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

export default function NodeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [node, setNode] = useState<Node | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNode() {
      if (params.id && typeof params.id === 'string') {
        const data = await getNodeById(params.id);
        setNode(data);
      }
      setLoading(false);
    }
    loadNode();
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Header />
        <main className="container" style={{ padding: '3rem 1rem' }}>
          <div className="card" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            <div style={{ height: '24rem', background: '#f5f5f5', borderRadius: '0.5rem' }} />
          </div>
        </main>
      </div>
    );
  }

  if (!node) {
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Header />
        <main className="container" style={{ padding: '3rem 1rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#000000' }}>Node Not Found</h2>
            <button onClick={() => router.push('/dashboard')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Header />
      <main className="container" style={{ padding: '3rem 1rem', maxWidth: '1280px', margin: '0 auto' }}>
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: '1.5rem' }}
        >
          ← Back
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Node Info */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <div>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem', color: '#000000' }}>{node.name}</h1>
                <p style={{ color: '#666666' }}>{node.provider}</p>
              </div>
              <Badge status={node.status} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.875rem', color: '#666666' }}>Plan</span>
                <p style={{ fontWeight: 600, color: '#000000', textTransform: 'capitalize' }}>{node.plan}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.875rem', color: '#666666' }}>GPUs</span>
                <p style={{ fontWeight: 600, color: '#000000' }}>{node.gpus}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.875rem', color: '#666666' }}>Price</span>
                <p style={{ fontWeight: 600, color: '#000000' }}>{formatSOL(node.priceSOL)}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.875rem', color: '#666666' }}>Created</span>
                <p style={{ fontWeight: 600, color: '#000000' }}>{formatDate(node.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Credentials */}
          {node.credentials && (
            <div className="card">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#000000' }}>Connection Info</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#666666' }}>Hostname</span>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '0.5rem', color: '#000000', marginTop: '0.25rem', border: '1px solid #e5e5e5' }}>
                    {node.credentials.hostname}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#666666' }}>IP Address</span>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '0.5rem', color: '#000000', marginTop: '0.25rem', border: '1px solid #e5e5e5' }}>
                    {node.credentials.ip}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#666666' }}>SSH User</span>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '0.5rem', color: '#000000', marginTop: '0.25rem', border: '1px solid #e5e5e5' }}>
                    {node.credentials.sshUser}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#666666' }}>SSH Port</span>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '0.5rem', color: '#000000', marginTop: '0.25rem', border: '1px solid #e5e5e5' }}>
                    {node.credentials.sshPort}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const creds = `Hostname: ${node.credentials!.hostname}\nIP: ${node.credentials!.ip}\nUser: ${node.credentials!.sshUser}\nPort: ${node.credentials!.sshPort}`;
                    navigator.clipboard.writeText(creds);
                  }}
                  className="btn btn-outline"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  Copy Credentials
                </button>
              </div>
            </div>
          )}

          {/* Cocoon Status & Farming Progress */}
          {node.cocoonStatus && (
            <>
              <div className="card">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#000000' }}>Cocoon Worker Status</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666666' }}>Status</span>
                    <Badge status={node.cocoonStatus.isRunning ? 'running' : 'stopped'} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666666' }}>Last Heartbeat</span>
                    <span style={{ color: '#000000' }}>
                      {formatDate(node.cocoonStatus.lastHeartbeat)}
                    </span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#666666' }}>CPU Usage</span>
                      <span style={{ color: '#000000', fontWeight: 500 }}>{node.cocoonStatus.cpuUsage}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e5e5', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          background: '#000000',
                          width: `${node.cocoonStatus.cpuUsage}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#666666' }}>GPU Usage</span>
                      <span style={{ color: '#000000', fontWeight: 500 }}>{node.cocoonStatus.gpuUsage}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e5e5', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          background: '#000000',
                          width: `${node.cocoonStatus.gpuUsage}%`,
                        }}
                      />
                    </div>
                  </div>
                  {node.tonWallet && (
                    <div>
                      <span style={{ color: '#666666' }}>TON Wallet</span>
                      <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '0.5rem', marginTop: '0.25rem', color: '#000000', border: '1px solid #e5e5e5' }}>
                        {node.tonWallet}
                      </p>
                    </div>
                  )}
                  {node.solanaWallet && (
                    <div>
                      <span style={{ color: '#666666' }}>Solana Wallet (Earnings)</span>
                      <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '0.5rem', marginTop: '0.25rem', color: '#000000', border: '1px solid #e5e5e5' }}>
                        {node.solanaWallet}
                      </p>
                    </div>
                  )}
                  <button
                    className="btn btn-outline"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                    onClick={() => window.open('https://cocoon.org/', '_blank')}
                  >
                    View Cocoon Docs
                  </button>
                </div>
              </div>

              <FarmingProgress
                tasksProcessed={node.cocoonStatus.tasksProcessed}
                earningsSOL={node.cocoonStatus.earningsSOL}
                currentTask={node.cocoonStatus.currentTask}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

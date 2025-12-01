'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { getNodeById } from '@/lib/mock-api';
import type { Node } from '@/lib/types';

const PROVISIONING_STEPS = [
  { id: 1, message: '[System] Payment confirmed. Starting provisioning...', delay: 500 },
  { id: 2, message: '[Cloud] Requesting H100 instance from Scaleway...', delay: 1500 },
  { id: 3, message: '[Cloud] Instance allocated. Initializing...', delay: 2500 },
  { id: 4, message: '[Bridge] Converting SOL to TON...', delay: 3500 },
  { id: 5, message: '[Cocoon] Downloading worker image...', delay: 4500 },
  { id: 6, message: '[Cocoon] Configuring TDX environment...', delay: 5500 },
  { id: 7, message: '[Cocoon] Enabling Confidential Compute mode...', delay: 6500 },
  { id: 8, message: '[Network] Setting up secure connection...', delay: 7500 },
  { id: 9, message: '[Network] Verifying node attestation...', delay: 8500 },
  { id: 10, message: '[System] Node ready! Generating credentials...', delay: 9500 },
  { id: 11, message: '[System] Provisioning complete!', delay: 10500 },
];

export default function ProvisioningPage() {
  const params = useParams();
  const router = useRouter();
  const [node, setNode] = useState<Node | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    async function loadNode() {
      if (params.nodeId && typeof params.nodeId === 'string') {
        const data = await getNodeById(params.nodeId);
        setNode(data);
      }
    }
    loadNode();
  }, [params.nodeId]);

  useEffect(() => {
    if (!node || isComplete) return;

    const timers: NodeJS.Timeout[] = [];

    PROVISIONING_STEPS.forEach((step) => {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, step.message]);
        setCurrentStep(step.id);
        
        if (step.id === PROVISIONING_STEPS.length) {
          setIsComplete(true);
          // Redirect to node details after 2 seconds
          setTimeout(() => {
            router.push(`/dashboard/nodes/${params.nodeId}`);
          }, 2000);
        }
      }, step.delay);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [node, isComplete, router, params.nodeId]);

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Header />
      <main className="container" style={{ padding: '3rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#000000' }}>
            Setting up your node
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666666', marginBottom: '2rem' }}>
            Please wait a few minutes while we configure your H100 GPU node...
          </p>

          {/* Console output */}
          <div style={{
            background: '#000000',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#00ff00',
            minHeight: '400px',
            maxHeight: '500px',
            overflowY: 'auto',
            textAlign: 'left',
            marginBottom: '2rem',
          }}>
            {messages.length === 0 && (
              <div style={{ color: '#888' }}>
                [System] Initializing provisioning process...
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  color: index === messages.length - 1 ? '#00ff00' : '#888',
                  marginBottom: '0.5rem',
                  animation: index === messages.length - 1 ? 'blink 1s infinite' : 'none',
                }}
              >
                {msg}
                {index === messages.length - 1 && <span style={{ color: '#00ff00' }}>_</span>}
              </div>
            ))}
            {isComplete && (
              <div style={{ color: '#00ff00', marginTop: '1rem', fontWeight: 600 }}>
                ✓ Node is ready! Redirecting to dashboard...
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              color: '#666666'
            }}>
              <span>Progress</span>
              <span>{Math.round((currentStep / PROVISIONING_STEPS.length) * 100)}%</span>
            </div>
            <div style={{ 
              height: '8px', 
              background: '#e5e5e5', 
              borderRadius: '9999px', 
              overflow: 'hidden' 
            }}>
              <div
                style={{
                  height: '100%',
                  background: '#000000',
                  width: `${(currentStep / PROVISIONING_STEPS.length) * 100}%`,
                  transition: 'width 0.5s',
                }}
              />
            </div>
          </div>

          {node && (
            <div style={{ 
              padding: '1rem', 
              background: '#f9f9f9', 
              borderRadius: '0.5rem',
              border: '1px solid #e5e5e5',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '0.5rem' }}>
                Node: <strong style={{ color: '#000000' }}>{node.name}</strong>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '0.5rem' }}>
                Plan: <strong style={{ color: '#000000' }}>{node.plan}</strong>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666666' }}>
                GPUs: <strong style={{ color: '#000000' }}>{node.gpus}</strong>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}



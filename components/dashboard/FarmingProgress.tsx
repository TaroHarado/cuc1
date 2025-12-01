'use client';

import { useState, useEffect } from 'react';
import type { FarmingTask } from '@/lib/types';

interface FarmingProgressProps {
  tasksProcessed: number;
  earningsSOL: number;
  currentTask?: FarmingTask;
}

const TASK_MESSAGES = [
  'Waiting for inference request...',
  'Processing AI model: Qwen/Qwen3-0.6B',
  'Running inference task...',
  'Validating results...',
  'Submitting proof to TON blockchain...',
  'Task completed, reward received',
];

export function FarmingProgress({ tasksProcessed, earningsSOL, currentTask }: FarmingProgressProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!currentTask || currentTask.status === 'completed') {
      setProgress(0);
      setCurrentMessageIndex(0);
      return;
    }

    if (currentTask.status === 'waiting') {
      setCurrentMessageIndex(0);
      setProgress(0);
    } else if (currentTask.status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentMessageIndex((idx) => Math.min(idx + 1, TASK_MESSAGES.length - 1));
            return 0;
          }
          return prev + 2;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [currentTask]);

  const message = currentTask?.status === 'processing' 
    ? TASK_MESSAGES[currentMessageIndex] 
    : currentTask?.status === 'waiting'
    ? 'Waiting for inference request...'
    : 'Idle - Ready for tasks';

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#000000' }}>
        Farming Activity
      </h3>
      
      {/* Console-like output */}
      <div style={{
        background: '#000000',
        borderRadius: '0.5rem',
        padding: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        color: '#00ff00',
        minHeight: '200px',
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '1rem',
      }}>
        <div style={{ color: '#888', marginBottom: '0.5rem' }}>
          [Cocoon Worker] Connected to network...
        </div>
        <div style={{ color: '#888', marginBottom: '0.5rem' }}>
          [Cocoon Worker] TDX attestation verified
        </div>
        <div style={{ color: '#888', marginBottom: '0.5rem' }}>
          [Cocoon Worker] GPU initialized (H100)
        </div>
        {currentTask && (
          <>
            <div style={{ color: '#00ff00', marginBottom: '0.5rem' }}>
              [Task #{currentTask.id}] {message}
            </div>
            {currentTask.status === 'processing' && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '2px',
                  overflow: 'hidden',
                  marginBottom: '0.25rem'
                }}>
                  <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: '#000000',
                    transition: 'width 0.3s',
                  }}></div>
                </div>
                <div style={{ color: '#888', fontSize: '0.75rem' }}>
                  Progress: {progress}%
                </div>
              </div>
            )}
          </>
        )}
        {!currentTask && (
          <div style={{ color: '#888', marginTop: '1rem' }}>
            Waiting for tasks from Cocoon network...
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e5e5e5'
      }}>
        <div>
          <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '0.25rem' }}>
            Tasks Processed
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#000000' }}>
            {tasksProcessed}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '0.25rem' }}>
            Earnings (SOL)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#000000' }}>
            {earningsSOL.toFixed(4)} SOL
          </div>
        </div>
      </div>

      {/* TON Scan Link */}
      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
        <a
          href="https://tonscan.com/Ef8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM0vF"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ width: '100%' }}
        >
          View Distribution Transactions
        </a>
      </div>
    </div>
  );
}

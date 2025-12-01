'use client';

import Link from 'next/link';
import { WalletButton } from '@/modules/wallet/WalletButton';

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#000000' }}>
            <img 
              src="/logo.jpg" 
              alt="thecocoon.fun" 
              style={{ 
                height: '32px', 
                width: '32px', 
                objectFit: 'contain',
                borderRadius: '0.375rem'
              }} 
            />
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              thecocoon.fun
            </span>
          </Link>
          <nav className="header-nav">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/pricing">Pricing</Link>
            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
              <a
                href="https://x.com/thecocoon_fun"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e5e5',
                  background: '#ffffff',
                  color: '#000000',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#d4d4d4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                Twitter
              </a>
              <a
                href="https://github.com/thecocoonsol/thecocoon-core"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e5e5',
                  background: '#ffffff',
                  color: '#000000',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#d4d4d4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                GitHub
              </a>
              <a
                href="https://pump.fun"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e5e5',
                  background: '#ffffff',
                  color: '#000000',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#d4d4d4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                Pump.fun
              </a>
            </div>
          </nav>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}

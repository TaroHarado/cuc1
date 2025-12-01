'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h4 style={{ color: '#000000' }}>thecocoon.fun</h4>
            <p style={{ fontSize: '0.875rem', color: '#666666' }}>
              GPU-as-a-Service for Cocoon farmers
            </p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://docs.cocoon.network" target="_blank" rel="noopener noreferrer">Cocoon Docs</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 thecocoon.fun. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PricingCalculator } from '@/modules/pricing/PricingCalculator';
import { ArchesBackground } from '@/components/layout/ArchesBackground';
import { COCOON_CONFIG, calculateAPY } from '@/lib/config';

const STEPS = [
  {
    id: 1,
    title: 'Connect & Choose',
    description: 'Connect your Phantom wallet and select your GPU plan. Pay in SOL.',
  },
  {
    id: 2,
    title: 'Cloud Provision',
    description: 'We rent an H100 instance from a cloud provider (e.g. Scaleway).',
  },
  {
    id: 3,
    title: 'Auto-Configure',
    description:
      'We bridge SOL → TON and configure a Cocoon worker with TDX and Confidential Compute.',
  },
  {
    id: 4,
    title: 'Start Farming',
    description:
      'You receive node access and a simple dashboard. All prices and stats are shown in SOL.',
  },
];

const WHY = [
  {
    title: 'No Infrastructure Headache',
    description: 'Zero setup and zero maintenance. We handle provisioning and management.',
  },
  {
    title: 'Optimized for Cocoon',
    description: 'Pre-configured Cocoon workers with TDX and Confidential Compute enabled.',
  },
  {
    title: 'Pay in SOL',
    description: 'Native Solana payments. No cards, no KYC, just crypto. All pricing in SOL.',
  },
  {
    title: 'Fully Managed',
    description: 'Simple dashboard, instant provisioning, transparent pricing.',
  },
];

const FAQS = [
  {
    question: 'What is Cocoon farming?',
    answer:
      'Cocoon is a confidential compute network that rewards participants for providing compute resources. Nodes run in Trust Domain Extensions (TDX) mode for secure computation. thecocoon handles all the TON/Cocoon infrastructure - you just pay in SOL.',
  },
  {
    question: 'How much can I earn?',
    answer:
      'Earnings depend on network conditions, node performance, and market factors. We provide no guarantees on returns. This is high-risk and you should only invest what you can afford to lose. All costs and potential returns are denominated in SOL.',
  },
  {
    question: 'What are the risks?',
    answer:
      'Cryptocurrency investments carry significant risk. Node performance, network changes, and market volatility can affect returns. There are no guarantees. Please do your own research.',
  },
  {
    question: 'How long does provisioning take?',
    answer:
      'Typically 2-5 minutes. We automatically provision H100 instances, bridge SOL to TON, configure Cocoon workers, and set up your dashboard. You\'ll receive credentials and node access in SOL-denominated interface.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer:
      'Hourly plans can be stopped at any time. Monthly plans are billed upfront in SOL. Refunds are handled on a case-by-case basis. See Terms of Service for details.',
  },
  {
    question: 'What happens if my node goes down?',
    answer:
      'We monitor all nodes 24/7. If a node fails, we automatically provision a replacement and transfer your configuration. Downtime is typically under 10 minutes.',
  },
];

// Calculate dynamic stats based on network
const totalNodes = COCOON_CONFIG.ESTIMATED_TOTAL_NODES;
const currentAPY = calculateAPY(totalNodes);

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#ffffff' }}>
      <ArchesBackground />
      <Header />
      <main style={{ paddingBottom: '5rem', position: 'relative', zIndex: 10 }}>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Rent H100 GPUs for Cocoon farming
              </h1>
              <p className="hero-description">
                thecocoon.fun is a Solana-facing layer on top of Cocoon and TON.
                Pay in SOL, get a fully configured confidential GPU node in minutes.
              </p>
              <div className="hero-cta">
                <Link href="/pricing" className="btn btn-primary">
                  Open full pricing
                </Link>
                <Link href="/dashboard" className="btn btn-secondary">
                  Go to dashboard
                </Link>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="stat-value">0.26</div>
                  <div className="stat-label">SOL Staked</div>
                </div>
                <div>
                  <div className="stat-value">{currentAPY.toFixed(2)}%</div>
                  <div className="stat-label">APY</div>
                </div>
                <div>
                  <div className="stat-value">{totalNodes}</div>
                  <div className="stat-label">Active Nodes</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>How it works</h2>
              <p className="section-subtitle">
                From SOL to confidential compute in 3 minutes
              </p>
            </div>
            <div className="steps">
              <div className="steps-line"></div>
              <div className="steps-grid">
                {STEPS.map((step) => (
                  <div key={step.id} className="step">
                    <div className="step-number">{step.id}</div>
                    <div>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INFO CARDS */}
        <section className="section">
          <div className="container">
            <div className="grid grid-2">
              <div className="card">
                <h3>Confidential Compute</h3>
                <p>
                  Each node runs a Cocoon worker with Intel TDX and NVIDIA Confidential Compute mode.
                  We manage the infra — you just pay in SOL.
                </p>
              </div>
              <div className="card">
                <h3>SOL-Denominated Dashboard</h3>
                <p>
                  We bridge your SOL into TON under the hood to rent Cocoon workers. You see all costs
                  and performance in SOL only — no TON management required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>
                Transparent Pricing
              </h2>
              <p className="section-subtitle">
                Calculate your costs in real time, denominated in SOL.
              </p>
            </div>
            <div className="card" style={{ maxWidth: '42rem', margin: '0 auto' }}>
              <div className="calculator-header">
                <div className="calculator-header-text">
                  <h4>Quick Calculator</h4>
                  <p>Estimate your H100 rental price before going to the full pricing page.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Link href="/pricing" className="btn btn-secondary btn-sm">
                    Open full calculator
                  </Link>
                  <a
                    href="https://tonscan.com/Ef8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM0vF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
                  >
                    View Distribution Transactions
                  </a>
                </div>
              </div>
              <PricingCalculator
                onRent={() => {
                  alert('For full provisioning please use the Pricing page.');
                }}
              />
            </div>
          </div>
        </section>

        {/* WHY COCOSHARE */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>
                Why thecocoon
              </h2>
              <p className="section-subtitle">
                GPU-as-a-Service for Cocoon farmers and Solana degens.
              </p>
            </div>
            <div className="grid grid-4">
              {WHY.map((item) => (
                <div key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>
                Frequently Asked Questions
              </h2>
            </div>
            <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
              {FAQS.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className={`faq-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

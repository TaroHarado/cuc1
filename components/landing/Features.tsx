'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const features = [
  {
    title: 'No Infrastructure Headache',
    description: 'Zero setup, zero maintenance. We handle all the infrastructure complexity for you.',
  },
  {
    title: 'Optimized for Cocoon',
    description: 'Pre-configured Cocoon workers with TDX and Confidential Compute mode enabled.',
  },
  {
    title: 'Pay in SOL',
    description: 'Native Solana payments. No credit cards, no KYC, just crypto. All pricing in SOL.',
  },
  {
    title: 'Fully Managed',
    description: 'Simple dashboard, instant provisioning, transparent pricing. Everything you need.',
  },
];

export function Features() {
  return (
    <section className="py-12 md:py-16 bg-slate-950/30">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Why <span className="gradient-text">Cocoshare</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            GPU-as-a-Service for Cocoon farmers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

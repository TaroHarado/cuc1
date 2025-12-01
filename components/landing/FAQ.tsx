'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const faqs = [
  {
    question: 'What is Cocoon farming?',
    answer:
      'Cocoon is a confidential compute network that rewards participants for providing compute resources. Nodes run in Trust Domain Extensions (TDX) mode for secure computation. Cocoshare handles all the TON/Cocoon infrastructure - you just pay in SOL.',
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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden bg-white/5 backdrop-blur border border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors rounded-2xl"
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  className="text-gray-400 text-xl"
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400 border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <p className="text-sm text-yellow-200">
            <strong className="text-yellow-100">Risk Disclaimer:</strong> This service involves cryptocurrency and
            high-risk investments. Past performance does not guarantee future results.
            Only invest what you can afford to lose. Please review our Terms of Service
            and do your own research.
          </p>
        </Card>
      </motion.div>
    </>
  );
}

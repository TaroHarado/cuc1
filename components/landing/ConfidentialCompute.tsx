'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

export function ConfidentialCompute() {
  return (
    <Section className="py-12 md:py-16 bg-gray-950/30">
      <Container size="lg">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h3 className="text-xl font-semibold mb-3 text-white">Confidential Compute</h3>
              <p className="text-gray-400 leading-relaxed">
                Each node runs Cocoon worker with TDX (Trust Domain Extensions) and
                Confidential Compute mode enabled for secure farming. This infrastructure
                is managed by Cocoshare - you just pay in SOL.
              </p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-xl font-semibold mb-3 text-white">SOL-Denominated Dashboard</h3>
              <p className="text-gray-400 leading-relaxed">
                We bridge your SOL into TON under the hood to rent Cocoon workers. You see your costs
                and performance in SOL only – no TON management needed. Underlying rewards are paid
                in TON to the node, but Cocoshare handles bridging and infra.
              </p>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}


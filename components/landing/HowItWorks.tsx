'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stepper } from '@/components/ui/Stepper';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

const steps = [
  {
    title: 'Connect & Choose',
    description: 'Connect your Phantom wallet and select your GPU plan. Pay in SOL.',
    icon: '1',
  },
  {
    title: 'Cloud Provision',
    description: 'We rent an H100 instance from a cloud provider (e.g. Scaleway).',
    icon: '2',
  },
  {
    title: 'Auto-Configure',
    description: 'We bridge SOL → TON under the hood and configure a Cocoon worker with TDX and Confidential Compute.',
    icon: '3',
  },
  {
    title: 'Start Farming',
    description: 'You receive node access and a simple dashboard. All prices and stats are shown in SOL.',
    icon: '4',
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      title="How it works"
      subtitle="From SOL to confidential compute in 3 minutes"
      centered
      className="py-12 md:py-16"
    >
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Stepper steps={steps} activeStep={activeStep} />
        </motion.div>
      </Container>
    </Section>
  );
}

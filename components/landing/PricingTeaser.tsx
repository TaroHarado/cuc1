'use client';

import { motion } from 'framer-motion';
import { PricingCalculator } from '@/modules/pricing/PricingCalculator';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function PricingTeaser() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Calculate your costs in real-time
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <PricingCalculator compact />
        </motion.div>
        
        <div className="text-center">
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              Open Full Calculator
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

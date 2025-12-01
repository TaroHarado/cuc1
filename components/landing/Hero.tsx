'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { WalletButton } from '@/modules/wallet/WalletButton';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20 pb-12">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20" />
      
      <Container size="lg">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm text-gray-400">Built On</span>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-green-400">SOLANA</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">H100 GPU</span>
            <br />
            <span className="text-white">Rental for Cocoon</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Rent H100 instances for Cocoon farming. Pay in SOL, get a fully configured node in minutes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <WalletButton />
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                View Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">14.1M</div>
              <div className="text-sm text-gray-400">SOL Staked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">6.16%</div>
              <div className="text-sm text-gray-400">APY</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">192K</div>
              <div className="text-sm text-gray-400">Active Nodes</div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

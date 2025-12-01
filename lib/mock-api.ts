/**
 * Mock API for MVP - replace with real API calls in production
 */

import type { Node, NodeStatus, BillingPlan, NodeCreationParams } from './types';

// Mock nodes data
const mockNodes: Node[] = [
  {
    id: 'node-1',
    name: 'H100-Farm-001',
    provider: 'Scaleway H100 x1',
    status: 'running',
    plan: 'monthly',
    gpus: 1,
    priceSOL: 25,
    priceUSDC: 3450,
    setupFeeSOL: 0.1,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    tonWallet: 'EQD...xyz',
    solanaWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    credentials: {
      hostname: 'h100-node-001.scaleway.com',
      ip: '192.168.1.100',
      sshUser: 'cocoon',
      sshPassword: 'secure-password-123',
      sshPort: 22,
    },
    cocoonStatus: {
      isRunning: true,
      lastHeartbeat: new Date().toISOString(),
      cpuUsage: 45,
      gpuUsage: 78,
      tasksProcessed: 1247,
      earningsTON: 125.5,
      earningsSOL: 0.145, // Fixed: should be around 0.145 SOL
      currentTask: {
        id: 'task-12345',
        type: 'inference',
        model: 'Qwen/Qwen3-0.6B',
        status: 'processing',
        startedAt: new Date(Date.now() - 30 * 1000).toISOString(),
        rewardTON: 0.15,
      },
    },
  },
  {
    id: 'node-2',
    name: 'H100-Farm-002',
    provider: 'Scaleway H100 x2',
    status: 'provisioning',
    plan: 'hourly',
    gpus: 2,
    priceSOL: 0.08,
    priceUSDC: 11,
    setupFeeSOL: 0.1,
    createdAt: new Date().toISOString(),
    expiresAt: null,
    tonWallet: 'EQD...abc',
    solanaWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  },
  {
    id: 'node-3',
    name: 'H100-Farm-003',
    provider: 'Scaleway H100 x1',
    status: 'expired',
    plan: 'hourly',
    gpus: 1,
    priceSOL: 0.04,
    priceUSDC: 5.5,
    setupFeeSOL: 0.1,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Get all nodes for a user (mock)
 */
export async function getNodes(): Promise<Node[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...mockNodes];
}

/**
 * Get a single node by ID
 */
export async function getNodeById(id: string): Promise<Node | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockNodes.find((node) => node.id === id) || null;
}

/**
 * Create a new node (mock - in production this would trigger actual provisioning)
 */
export async function createNode(params: NodeCreationParams): Promise<Node> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const isMonthly = params.plan === 'monthly';
  const basePriceSOL = isMonthly 
    ? 25 * params.gpus  // Monthly: 25 SOL per GPU
    : 0.04 * params.gpus; // Hourly: 0.04 SOL per GPU

  const basePriceUSDC = isMonthly
    ? 3450 * params.gpus  // Monthly: 3450 USDC per GPU
    : 5.5 * params.gpus; // Hourly: 5.5 USDC per GPU

  const newNode: Node = {
    id: `node-${Date.now()}`,
    name: `H100-Farm-${String(mockNodes.length + 1).padStart(3, '0')}`,
    provider: `Scaleway H100 x${params.gpus}`,
    status: 'provisioning',
    plan: params.plan,
    gpus: params.gpus,
    priceSOL: basePriceSOL,
    priceUSDC: basePriceUSDC,
    setupFeeSOL: 0.1,
    createdAt: new Date().toISOString(),
    expiresAt: isMonthly ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
    tonWallet: params.tonWallet,
    solanaWallet: params.solanaWallet,
  };

  mockNodes.push(newNode);
  return newNode;
}

/**
 * Update node status (mock)
 */
export async function updateNodeStatus(
  id: string,
  status: NodeStatus
): Promise<Node> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const node = mockNodes.find((n) => n.id === id);
  if (!node) throw new Error('Node not found');
  node.status = status;
  return node;
}

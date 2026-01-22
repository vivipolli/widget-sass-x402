import { ethers } from 'ethers';
import { Intent } from '../types/intent.types.js';

const INTENT_REGISTRY_ABI = [
  "function registerIntent(address _token, uint256 _amount, address _recipient, uint256 _deadline) external returns (uint256)",
  "function executeIntent(uint256 _intentId, bytes32 _txHash) external",
  "function cancelIntent(uint256 _intentId) external",
  "function getIntent(uint256 _intentId) external view returns (tuple(uint256 id, address owner, address token, uint256 amount, address recipient, uint8 status, uint256 createdAt, uint256 deadline, uint256 executedAt, bytes32 txHash))",
  "function getUserIntents(address _user) external view returns (uint256[])",
  "event IntentRegistered(uint256 indexed intentId, address indexed owner, uint256 deadline)"
];

export class ContractService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor() {
    const rpcUrl = process.env.RPC_URL || 'https://evm-t3.cronos.org';
    const privateKey = process.env.PRIVATE_KEY!;
    const contractAddress = process.env.CONTRACT_ADDRESS!;

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(contractAddress, INTENT_REGISTRY_ABI, this.wallet);
  }

  async registerIntent(intent: Intent): Promise<number> {
    const tokenAddress = ethers.getAddress(intent.token.toLowerCase());
    const recipientAddress = ethers.getAddress(intent.recipient.toLowerCase());
    const amountInBaseUnits = BigInt(intent.amount);

    const estimatedGas = await this.contract.registerIntent.estimateGas(
      tokenAddress,
      amountInBaseUnits,
      recipientAddress,
      Math.floor(intent.deadline / 1000)
    );
    
    const gasLimit = (estimatedGas * BigInt(120)) / BigInt(100);

    const tx = await this.contract.registerIntent(
      tokenAddress,
      amountInBaseUnits,
      recipientAddress,
      Math.floor(intent.deadline / 1000),
      { gasLimit }
    );

    const receipt = await tx.wait();
    
    const event = receipt.logs
      .map((log: any) => {
        try {
          return this.contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((e: any) => e?.name === 'IntentRegistered');

    if (event) {
      return Number(event.args[0]);
    }

    throw new Error('Failed to get intent ID from transaction');
  }

  async markIntentExecuted(intentId: number, txHash: string): Promise<void> {
    const estimatedGas = await this.contract.executeIntent.estimateGas(intentId, txHash);
    const gasLimit = (estimatedGas * BigInt(120)) / BigInt(100);
    const tx = await this.contract.executeIntent(intentId, txHash, { gasLimit });
    await tx.wait();
  }

  async cancelIntent(intentId: number): Promise<void> {
    const estimatedGas = await this.contract.cancelIntent.estimateGas(intentId);
    const gasLimit = (estimatedGas * BigInt(120)) / BigInt(100);
    const tx = await this.contract.cancelIntent(intentId, { gasLimit });
    await tx.wait();
  }

  async getIntent(intentId: number): Promise<any> {
    return await this.contract.getIntent(intentId);
  }

  async getUserIntents(userAddress: string): Promise<number[]> {
    const normalizedAddress = ethers.getAddress(userAddress.toLowerCase());
    const intentIds = await this.contract.getUserIntents(normalizedAddress);
    return intentIds.map((id: bigint) => Number(id));
  }
}

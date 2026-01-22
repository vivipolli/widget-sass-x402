import { ethers } from 'ethers';
import 'dotenv/config';

const DEV_USDCE_ADDRESS = '0xf329184c1b464411bd683a2e8f42c1bfe42b2331';
const RPC_URL = 'https://evm-t3.cronos.org';

async function checkDevUSDCeBalance() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log('=================================');
  console.log('🔑 Wallet Address:', wallet.address);
  console.log('=================================\n');

  // Check TCRO balance
  const tcroBalance = await provider.getBalance(wallet.address);
  console.log('💰 TCRO Balance:', ethers.formatEther(tcroBalance), 'TCRO\n');

  // Check DevUSDCe balance
  const tokenContract = new ethers.Contract(
    DEV_USDCE_ADDRESS,
    [
      'function balanceOf(address) view returns (uint256)',
      'function decimals() view returns (uint8)',
      'function symbol() view returns (string)',
      'function name() view returns (string)'
    ],
    provider
  );

  try {
    const [balance, decimals, symbol, name] = await Promise.all([
      tokenContract.balanceOf(wallet.address),
      tokenContract.decimals(),
      tokenContract.symbol(),
      tokenContract.name()
    ]);

    console.log('💵 DevUSDCe Info:');
    console.log('   Name:', name);
    console.log('   Symbol:', symbol);
    console.log('   Decimals:', decimals);
    console.log('   Balance:', ethers.formatUnits(balance, decimals), symbol);
    console.log('   Balance (base units):', balance.toString());
    console.log('   Contract:', DEV_USDCE_ADDRESS);

    if (balance === 0n) {
      console.log('\n❌ PROBLEMA: Você não tem DevUSDCe!');
      console.log('\n📝 Soluções:');
      console.log('1. Acesse: https://cronos.org/faucet');
      console.log('2. Cole seu endereço:', wallet.address);
      console.log('3. Solicite DevUSDCe ou USDC testnet');
      console.log('4. Ou faça swap de TCRO → DevUSDCe em uma DEX testnet');
    } else {
      console.log('\n✅ Você tem DevUSDCe! Pronto para criar intents.');
      console.log(`💡 Pode criar intents de até ${ethers.formatUnits(balance, decimals)} ${symbol}`);
    }
  } catch (error) {
    console.error('\n❌ Erro ao verificar DevUSDCe:', error.message);
    console.log('\n💡 Verifique se o contrato está correto ou se a rede está acessível.');
  }
}

checkDevUSDCeBalance().catch(console.error);

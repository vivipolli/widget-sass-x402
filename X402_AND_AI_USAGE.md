# 📍 Uso de x402 e IA no Projeto

## 🔵 x402 Facilitator - Onde e Para Quê

### **Localização Principal: `backend/src/services/execution.service.ts`**

#### **1. Inicialização do Facilitator**
```34:44:backend/src/services/execution.service.ts
  private async executePayment(intent: Intent): Promise<string> {
    const recipientAddress = ethers.getAddress(intent.recipient.toLowerCase());
    
    const header = await this.facilitator.generatePaymentHeader({
      to: recipientAddress,
      value: intent.amount,
      asset: this.network === CronosNetwork.CronosMainnet ? Contract.USDCe : Contract.DevUSDCe,
      signer: this.wallet,
      validBefore: Math.floor(Date.now() / 1000) + 600,
      validAfter: 0,
    });
```

**Para quê**: Cria um header EIP-3009 assinado para pagamento programático

#### **2. Geração de Payment Requirements**
```46:50:backend/src/services/execution.service.ts
    const requirements = this.facilitator.generatePaymentRequirements({
      payTo: recipientAddress,
      description: `AI Execution Agent - Intent ${intent.id}`,
      maxAmountRequired: intent.amount,
    });
```

**Para quê**: Define os requisitos do pagamento (destinatário, valor máximo, descrição)

#### **3. Verificação do Pagamento**
```52:57:backend/src/services/execution.service.ts
    const body = this.facilitator.buildVerifyRequest(header, requirements);

    const verify = await this.facilitator.verifyPayment(body);
    if (!verify.isValid) {
      throw new Error('Payment verification failed');
    }
```

**Para quê**: Verifica se o pagamento assinado é válido antes de executar

#### **4. Settlement (Execução On-Chain)**
```59:64:backend/src/services/execution.service.ts
    const settle = await this.facilitator.settlePayment(body);
    if (settle.event !== 'payment.settled') {
      throw new Error('Payment settlement failed');
    }

    return settle.txHash || '';
```

**Para quê**: Executa o pagamento on-chain via Facilitator API, retornando o hash da transação

### **Quando x402 é Usado**

x402 é usado **APENAS** quando o tipo de intent é `Payment`:

```21:32:backend/src/services/execution.service.ts
  async executeIntent(intent: Intent): Promise<string> {
    switch (intent.type) {
      case IntentType.Payment:
        return await this.executePayment(intent);  // ← x402 aqui
      case IntentType.Transfer:
        return await this.executeTransfer(intent);  // ← Ethers direto
      case IntentType.Withdrawal:
        return await this.executeWithdrawal(intent); // ← Ethers direto
      default:
        throw new Error(`Unsupported intent type: ${intent.type}`);
    }
  }
```

### **Por que x402?**

- ✅ **Pagamentos Programáticos**: Permite executar pagamentos sem o usuário assinar cada transação
- ✅ **Off-chain Authorization**: Usuário assina uma vez, sistema executa quando condições são ideais
- ✅ **Infraestrutura Simplificada**: Não precisa gerenciar nós EVM, Facilitator cuida disso
- ✅ **Padrão EIP-3009**: Compatível com padrões Ethereum

---

## 🤖 IA (Decision Engine) - Onde e Para Quê

### **Localização Principal: `backend/src/agents/decision.engine.ts`**

#### **1. Módulo de Decisão Inteligente**
```15:34:backend/src/agents/decision.engine.ts
export class DecisionEngine {
  private intentService: IntentService;
  private executionService: ExecutionService;
  private gasMonitor: GasMonitor;
  private priceMonitor: PriceMonitor;
  private contractService: ContractService;
  private isRunning: boolean = false;

  constructor(
    intentService: IntentService,
    executionService: ExecutionService,
    gasMonitor: GasMonitor,
    priceMonitor: PriceMonitor
  ) {
    this.intentService = intentService;
    this.executionService = executionService;
    this.gasMonitor = gasMonitor;
    this.priceMonitor = priceMonitor;
    this.contractService = new ContractService();
  }
```

**Para quê**: Coordena todos os componentes para tomar decisões inteligentes

#### **2. Monitoramento Contínuo**
```54:72:backend/src/agents/decision.engine.ts
  private async checkIntents(): Promise<void> {
    const intents = this.intentService.getAllIntents();
    const monitoringIntents = intents.filter(
      (intent) => intent.status === IntentStatus.Monitoring
    );

    for (const intent of monitoringIntents) {
      try {
        await this.evaluateIntent(intent);
      } catch (error: any) {
        console.error(`Error evaluating intent ${intent.id}:`, error);
        this.intentService.addLog(
          intent.id,
          'error',
          `Evaluation error: ${error.message}`
        );
      }
    }
  }
```

**Para quê**: Verifica todas as intents em monitoramento a cada 10 segundos

#### **3. Coleta de Critérios (Dados de Mercado)**
```118:135:backend/src/agents/decision.engine.ts
  private async gatherCriteria(intent: Intent): Promise<DecisionCriteria> {
    const gasPrice = await this.gasMonitor.getCurrentGasPrice();
    const tokenPrice = intent.minTokenPrice
      ? await this.priceMonitor.getCurrentPrice('USDC')
      : undefined;

    const now = Date.now();
    const timeRemaining = intent.deadline - now;
    const totalDuration = intent.deadline - intent.createdAt;
    const urgencyFactor = 1 - timeRemaining / totalDuration;

    return {
      gasPrice,
      tokenPrice,
      timeRemaining,
      urgencyFactor,
    };
  }
```

**Para quê**: Coleta dados em tempo real (gas price, token price, tempo restante) para análise

#### **4. Algoritmo de Decisão Estratificado (A "Inteligência")**
```137:226:backend/src/agents/decision.engine.ts
  private makeDecision(
    intent: Intent,
    criteria: DecisionCriteria
  ): { shouldExecute: boolean; reason: string } {
    const currentGasPrice = parseFloat(criteria.gasPrice);
    const maxGasPrice = parseFloat(intent.maxGasPrice);
    const now = Date.now();
    const MIN_MONITORING_PERIOD = 60000;
    const timeSinceCreation = now - intent.createdAt;

    if (timeSinceCreation < MIN_MONITORING_PERIOD && criteria.urgencyFactor < 0.95) {
      return {
        shouldExecute: false,
        reason: `⏱️ Minimum monitoring period: ${Math.round((MIN_MONITORING_PERIOD - timeSinceCreation) / 1000)}s remaining`,
      };
    }

    if (criteria.urgencyFactor > 0.95) {
      return {
        shouldExecute: true,
        reason: '🚨 Deadline critical! Executing immediately (95% of time elapsed)',
      };
    }

    if (currentGasPrice > maxGasPrice) {
      return {
        shouldExecute: false,
        reason: `⛽ Gas too high: ${currentGasPrice.toFixed(0)} gwei > max ${maxGasPrice} gwei`,
      };
    }

    if (intent.minTokenPrice && criteria.tokenPrice) {
      const currentTokenPrice = parseFloat(criteria.tokenPrice);
      const minTokenPrice = parseFloat(intent.minTokenPrice);

      if (currentTokenPrice < minTokenPrice) {
        return {
          shouldExecute: false,
          reason: `💰 Token price too low: $${currentTokenPrice} < min $${minTokenPrice}`,
        };
      }
    }

    const gasPriceRatio = currentGasPrice / maxGasPrice;
    const timeProgress = criteria.urgencyFactor;

    if (timeProgress < 0.3) {
      if (gasPriceRatio < 0.3) {
        return {
          shouldExecute: true,
          reason: `✅ Excellent conditions detected! Gas is ${(gasPriceRatio * 100).toFixed(0)}% of maximum (early execution)`,
        };
      }
      return {
        shouldExecute: false,
        reason: `⏸️ Early phase - Waiting for excellent conditions (gas < 30% of max). Current: ${(gasPriceRatio * 100).toFixed(0)}%`,
      };
    }

    if (timeProgress < 0.7) {
      if (gasPriceRatio < 0.5) {
        return {
          shouldExecute: true,
          reason: `✅ Good conditions! Gas is ${(gasPriceRatio * 100).toFixed(0)}% of maximum (mid-window optimal)`,
        };
      }
      return {
        shouldExecute: false,
        reason: `⏳ Mid-phase - Monitoring for better conditions (gas < 50% of max). Current: ${(gasPriceRatio * 100).toFixed(0)}%`,
      };
    }

    if (timeProgress < 0.95) {
      if (gasPriceRatio < 0.8) {
        return {
          shouldExecute: true,
          reason: `⚡ Acceptable conditions with deadline approaching. Gas: ${(gasPriceRatio * 100).toFixed(0)}% of max`,
        };
      }
      return {
        shouldExecute: false,
        reason: `⏰ Late phase - Will execute soon if gas stays below max. Current: ${(gasPriceRatio * 100).toFixed(0)}%`,
      };
    }

    return {
      shouldExecute: false,
      reason: '⏳ Waiting for better conditions',
    };
  }
```

**Para quê**: Este é o "cérebro" do sistema! Implementa estratégia adaptativa baseada em:
- **Tempo decorrido** (0-30%, 30-70%, 70-95%, 95-100%)
- **Gas price relativo** ao máximo permitido
- **Urgência** (quanto tempo resta)
- **Condições de mercado** (preço do token se especificado)

### **Características da IA**

1. **Estratégia Adaptativa**: Comportamento muda conforme deadline se aproxima
2. **Multi-fator**: Considera gas, preço, tempo simultaneamente
3. **Transparente**: Logs mostram exatamente o raciocínio
4. **Otimização**: Busca condições ideais, não apenas "executar quando possível"

---

## 🔄 Fluxo Completo: x402 + IA Trabalhando Juntos

```
1. Usuário cria Intent (tipo: Payment)
   ↓
2. Intent registrada on-chain
   ↓
3. DecisionEngine começa a monitorar (a cada 10s)
   ↓
4. AI avalia condições:
   - Gas price atual vs máximo
   - Tempo restante vs deadline
   - Preço do token (se especificado)
   ↓
5. AI decide: "Aguardar" ou "Executar"
   ↓
6. Se executar → ExecutionService.executePayment()
   ↓
7. x402 Facilitator:
   - Gera header EIP-3009
   - Verifica pagamento
   - Faz settlement on-chain
   ↓
8. Transação executada! ✅
```

---

## 📊 Resumo

| Tecnologia | Onde | Para Quê | Quando |
|------------|------|----------|--------|
| **x402** | `execution.service.ts` | Executar pagamentos programáticos | Intent tipo `Payment` |
| **IA** | `decision.engine.ts` | Decidir momento ótimo de execução | Sempre (monitora continuamente) |

### **Diferenciais do Projeto**

✅ **x402 além de pagamentos simples**: Usado para automação inteligente, não apenas "pay-to-access"

✅ **IA real**: Não é apenas um timer - analisa condições de mercado e adapta estratégia

✅ **Integração perfeita**: x402 executa quando IA decide que é o momento certo

✅ **Transparência**: Logs mostram todo o processo de decisão

---

## 🎯 Para Demo

**Mostre aos jurados:**
1. **x402**: "Veja como usamos x402 para executar pagamentos programáticos quando a IA decide"
2. **IA**: "A IA monitora gas price e espera o momento ideal - veja os logs mostrando o raciocínio"
3. **Integração**: "x402 + IA = Automação on-chain inteligente, não apenas pagamentos simples"

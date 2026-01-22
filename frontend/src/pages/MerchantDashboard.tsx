import { useState, FormEvent, useRef } from 'react';
import { ethers } from 'ethers';
import {
  Container,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageDescription,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Select,
  HelperText,
  InputGroup,
  ConnectButton,
  PrimaryButton,
  CodeOutput,
  InfoBadge,
  CodeBlock,
  CopyButton,
  PreviewSection,
  PreviewTitle,
  WidgetPreview,
  DemoLink,
  Description
} from './MerchantDashboard.styles';

export default function MerchantDashboard() {
  const [merchantId, setMerchantId] = useState('demo-merchant-123');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('1');
  const [token, setToken] = useState('0xf329184c1b464411bd683a2e8f42c1bfe42b2331');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [embedCode, setEmbedCode] = useState('');
  const [widgetPreviewUrl, setWidgetPreviewUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask to connect your wallet.');
      return;
    }

    try {
      setIsConnecting(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setRecipient(address);
      setIsConnected(true);

      setTimeout(() => {
        setIsConnecting(false);
      }, 1000);
    } catch (error: any) {
      console.error('Error connecting MetaMask:', error);
      alert('Failed to connect MetaMask: ' + (error.message || 'User rejected connection'));
      setIsConnecting(false);
    }
  };

  const handleRecipientChange = (value: string) => {
    setRecipient(value);
    if (isConnected) {
      setIsConnected(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const amountInBaseUnits = Math.floor(parseFloat(amount) * 1000000);
    const baseUrl = window.location.origin;
    const queryParams = `merchantId=${merchantId}&amount=${amountInBaseUnits}&recipient=${recipient}&token=${token}`;
    const widgetUrl = `${baseUrl}/widget?${queryParams}`;
    const widgetUrlForPreview = `${baseUrl}/widget/index.html?${queryParams}`;

    const code = `<!-- EmbedPay3 Payment Widget -->
<iframe 
  src="${widgetUrl}"
  width="100%"
  height="600"
  frameborder="0"
  style="max-width: 420px; margin: 0 auto; display: block;"
></iframe>`;

    setEmbedCode(code);
    setWidgetPreviewUrl(widgetUrlForPreview);
    setShowOutput(true);

    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Merchant Dashboard</PageTitle>
          <PageDescription>Configure and generate your EmbedPay3 widget</PageDescription>
        </PageHeaderContent>
      </PageHeader>

      <Container>
        <Card>
          <CardTitle>Widget Configuration</CardTitle>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="merchant-id">Merchant ID</Label>
              <Input
                type="text"
                id="merchant-id"
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
                required
              />
              <HelperText>Your unique merchant identifier</HelperText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="recipient">Your Wallet Address</Label>
              <InputGroup>
                <Input
                  type="text"
                  id="recipient"
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => handleRecipientChange(e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <ConnectButton
                  type="button"
                  onClick={connectMetaMask}
                  disabled={isConnecting}
                  $connected={isConnected}
                >
                  {isConnecting ? 'Connecting...' : isConnected ? 'Connected ✓' : 'Connect MetaMask'}
                </ConnectButton>
              </InputGroup>
              <HelperText>Address where you'll receive payments (paste manually or connect MetaMask)</HelperText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="amount-display">Monthly Subscription Amount</Label>
              <Input
                type="number"
                id="amount-display"
                placeholder="10.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0.01"
                required
              />
              <HelperText>Amount in USDC (e.g., 9.99 for $9.99/month)</HelperText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="token">Token</Label>
              <Select
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              >
                <option value="0xf329184c1b464411bd683a2e8f42c1bfe42b2331">DevUSDCe (Cronos Testnet)</option>
              </Select>
              <HelperText>Payment token (currently supports DevUSDCe on testnet)</HelperText>
            </FormGroup>

            <PrimaryButton type="submit">
              Generate Widget Code
            </PrimaryButton>
          </form>
        </Card>

        <CodeOutput ref={outputRef} $active={showOutput}>
          <Card>
            <InfoBadge>
              ✓ Widget code generated successfully
            </InfoBadge>

            <CardTitle>Embed Code</CardTitle>
            <Description>Copy and paste this code into your website:</Description>

            <CodeBlock>
              <CopyButton onClick={copyCode} $copied={copied}>
                {copied ? 'Copied!' : 'Copy'}
              </CopyButton>
              <pre>{embedCode}</pre>
            </CodeBlock>

            <CardTitle style={{ marginTop: '40px' }}>Widget Preview</CardTitle>
            <PreviewSection>
              <PreviewTitle>Live Preview</PreviewTitle>
              <WidgetPreview>
                {widgetPreviewUrl && (
                  <iframe
                    src={widgetPreviewUrl}
                    title="Widget Preview"
                  />
                )}
              </WidgetPreview>
            </PreviewSection>

            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <DemoLink href="/saas-platform-demo.html" target="_blank">
                View Full SaaS Platform Demo →
              </DemoLink>
            </div>
          </Card>
        </CodeOutput>
      </Container>
    </>
  );
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

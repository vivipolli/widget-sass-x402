import { Routes, Route, Link } from 'react-router-dom';
import { 
  AppContainer,
  Header,
  Logo,
  LogoImage,
  NavLinks,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  HeroCTA,
  CTAButton,
  CTASecondary,
  ValueSection,
  ValueGrid,
  ValueCard,
  ValueIcon,
  ValueCardTitle,
  ValueCardDesc,
  QuickLinks,
  QuickLinkCard,
  QuickLinkIcon,
  QuickLinkTitle,
  QuickLinkDesc,
  FeaturesSection,
  SectionTitle,
  SectionSubtitle,
  WelcomeFeatures,
  Feature,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  StatsSection,
  StatBox,
  StatValue,
  StatLabel,
  Footer,
  FooterText
} from './App.styles';
import { MdDashboard, MdPlayArrow, MdTrendingUp, MdSpeed, MdSecurity } from 'react-icons/md';
import { FiShield, FiZap, FiCode, FiLock, FiUsers, FiDollarSign } from 'react-icons/fi';
import MerchantDashboard from './pages/MerchantDashboard';

function HomePage() {
  return (
    <AppContainer>
      <Header>
        <Logo>
          <LogoImage src="/logo.png" alt="EmbedPay3" />
          EmbedPay3
        </Logo>
        <NavLinks>
          <Link to="/merchant" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s' }}>
            Merchant Dashboard
          </Link>
          <a href="/saas-platform-demo.html" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s' }}>
            Live Demo
          </a>
        </NavLinks>
      </Header>

      <HeroSection>
        <HeroTitle>
          Recurring Crypto Payments.<br/>
          <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Made Simple.</span>
        </HeroTitle>
        <HeroSubtitle>
          The Future of SaaS Subscriptions on Cronos
        </HeroSubtitle>
        <HeroDescription>
          Transform your SaaS business with automatic crypto subscriptions. 
          Your customers sign once, and payments execute seamlessly every month—zero gas fees, 
          zero friction, maximum convenience.
        </HeroDescription>
        <HeroCTA>
          <CTAButton as={Link} to="/merchant">
            Get Started Free
          </CTAButton>
          <CTASecondary href="/saas-platform-demo.html">
            View Demo
          </CTASecondary>
        </HeroCTA>
      </HeroSection>

      <StatsSection>
        <StatBox>
          <StatValue>$0</StatValue>
          <StatLabel>Gas Fees for Users</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>1x</StatValue>
          <StatLabel>Signature Required</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>100%</StatValue>
          <StatLabel>Automated Payments</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>2</StatValue>
          <StatLabel>Lines of Code</StatLabel>
        </StatBox>
      </StatsSection>

      <ValueSection>
        <SectionTitle>Why Choose EmbedPay3?</SectionTitle>
        <SectionSubtitle>
          Built on the x402 protocol, powered by Cronos blockchain
        </SectionSubtitle>
        <ValueGrid>
          <ValueCard>
            <ValueIcon>
              <FiUsers />
            </ValueIcon>
            <ValueCardTitle>Enhance User Experience</ValueCardTitle>
            <ValueCardDesc>
              No more monthly wallet connections or transaction approvals. 
              Your customers enjoy a seamless, Web2-like subscription experience with Web3 benefits.
            </ValueCardDesc>
          </ValueCard>
          <ValueCard>
            <ValueIcon>
              <MdTrendingUp />
            </ValueIcon>
            <ValueCardTitle>Boost Revenue Growth</ValueCardTitle>
            <ValueCardDesc>
              Reduce payment friction and increase conversion rates. 
              Automatic renewals mean fewer missed payments and higher customer retention.
            </ValueCardDesc>
          </ValueCard>
          <ValueCard>
            <ValueIcon>
              <MdSpeed />
            </ValueIcon>
            <ValueCardTitle>Lightning Fast Integration</ValueCardTitle>
            <ValueCardDesc>
              From concept to production in minutes. 
              Our embeddable widget requires just 2 lines of code—no complex smart contracts needed.
            </ValueCardDesc>
          </ValueCard>
          <ValueCard>
            <ValueIcon>
              <MdSecurity />
            </ValueIcon>
            <ValueCardTitle>Enterprise-Grade Security</ValueCardTitle>
            <ValueCardDesc>
              Built on battle-tested x402 protocol with EIP-3009 standards. 
              Non-custodial, transparent, and fully decentralized payment infrastructure.
            </ValueCardDesc>
          </ValueCard>
          <ValueCard>
            <ValueIcon>
              <FiDollarSign />
            </ValueIcon>
            <ValueCardTitle>Zero Gas Fee Burden</ValueCardTitle>
            <ValueCardDesc>
              We cover all transaction costs through the Facilitator. 
              Your customers never pay gas fees, removing a major barrier to crypto adoption.
            </ValueCardDesc>
          </ValueCard>
          <ValueCard>
            <ValueIcon>
              <FiShield />
            </ValueIcon>
            <ValueCardTitle>Full User Control</ValueCardTitle>
            <ValueCardDesc>
              Customers can cancel anytime directly from their wallet. 
              Transparent, trustless, and respecting user sovereignty at every step.
            </ValueCardDesc>
          </ValueCard>
        </ValueGrid>
      </ValueSection>

      <FeaturesSection>
        <SectionTitle>Powerful Features</SectionTitle>
        <QuickLinks>
          <QuickLinkCard as={Link} to="/merchant">
            <QuickLinkIcon>
              <MdDashboard />
            </QuickLinkIcon>
            <QuickLinkTitle>Merchant Dashboard</QuickLinkTitle>
            <QuickLinkDesc>Configure your payment widget, manage subscriptions, and monitor revenue in real-time</QuickLinkDesc>
          </QuickLinkCard>
          <QuickLinkCard href="/saas-platform-demo.html">
            <QuickLinkIcon>
              <MdPlayArrow />
            </QuickLinkIcon>
            <QuickLinkTitle>Live Platform Demo</QuickLinkTitle>
            <QuickLinkDesc>Experience the complete subscription flow from a customer's perspective</QuickLinkDesc>
          </QuickLinkCard>
        </QuickLinks>
        
        <WelcomeFeatures>
          <Feature>
            <FeatureIcon>
              <FiShield />
            </FeatureIcon>
            <FeatureTitle>One-Time Signature</FeatureTitle>
            <FeatureDescription>
              Sign once, pay monthly automatically
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>
              <FiZap />
            </FeatureIcon>
            <FeatureTitle>Zero Gas Fees</FeatureTitle>
            <FeatureDescription>
              Facilitator covers all transaction costs
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>
              <FiCode />
            </FeatureIcon>
            <FeatureTitle>Easy Integration</FeatureTitle>
            <FeatureDescription>
              Just 2 lines of code to embed
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>
              <FiLock />
            </FeatureIcon>
            <FeatureTitle>x402 Protocol</FeatureTitle>
            <FeatureDescription>
              Secure, decentralized payment standard
            </FeatureDescription>
          </Feature>
        </WelcomeFeatures>
      </FeaturesSection>

      <Footer>
        <FooterText>
          Powered by Cronos • Built with x402 Protocol • Enterprise-Ready
        </FooterText>
      </Footer>
    </AppContainer>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/merchant" element={<MerchantDashboard />} />
    </Routes>
  );
}

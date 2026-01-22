import { Routes, Route, Link } from 'react-router-dom';
import { 
  AppContainer,
  Header,
  Logo,
  NavLinks,
  QuickLinks,
  QuickLinkCard,
  QuickLinkIcon,
  QuickLinkTitle,
  QuickLinkDesc,
  WelcomeSection,
  WelcomeTitle,
  WelcomeText,
  WelcomeFeatures,
  Feature,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription
} from './App.styles';
import { MdDashboard, MdPlayArrow } from 'react-icons/md';
import { FiShield, FiZap, FiCode, FiLock } from 'react-icons/fi';
import MerchantDashboard from './pages/MerchantDashboard';

function HomePage() {
  return (
    <AppContainer>
      <Header>
        <Logo>EmbedPay3</Logo>
        <NavLinks>
          <Link to="/merchant" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, padding: '8px 16px', borderRadius: '4px', transition: 'all 0.2s' }}>
            Merchant Dashboard
          </Link>
          <a href="/saas-platform-demo.html" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, padding: '8px 16px', borderRadius: '4px', transition: 'all 0.2s' }}>
            SaaS Demo
          </a>
        </NavLinks>
      </Header>

      <WelcomeSection>
        <WelcomeTitle>EmbedPay3</WelcomeTitle>
        <WelcomeText>
          Enable recurring crypto payments for your SaaS platform. Customers sign once,
          payments execute automatically every month with zero gas fees.
        </WelcomeText>
        <QuickLinks>
          <QuickLinkCard as={Link} to="/merchant">
            <QuickLinkIcon>
              <MdDashboard />
            </QuickLinkIcon>
            <QuickLinkTitle>Merchant Dashboard</QuickLinkTitle>
            <QuickLinkDesc>Configure and generate widget code for your platform</QuickLinkDesc>
          </QuickLinkCard>
          <QuickLinkCard href="/saas-platform-demo.html">
            <QuickLinkIcon>
              <MdPlayArrow />
            </QuickLinkIcon>
            <QuickLinkTitle>Platform Demo</QuickLinkTitle>
            <QuickLinkDesc>See the payment widget in action</QuickLinkDesc>
          </QuickLinkCard>
        </QuickLinks>
        <WelcomeFeatures>
          <Feature>
            <FeatureIcon>
              <FiShield />
            </FeatureIcon>
            <FeatureTitle>One-Time Signature</FeatureTitle>
            <FeatureDescription>Sign once, pay monthly</FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>
              <FiZap />
            </FeatureIcon>
            <FeatureTitle>Zero Gas Fees</FeatureTitle>
            <FeatureDescription>Facilitator covers costs</FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>
              <FiCode />
            </FeatureIcon>
            <FeatureTitle>Easy Integration</FeatureTitle>
            <FeatureDescription>Just 2 lines of code</FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>
              <FiLock />
            </FeatureIcon>
            <FeatureTitle>x402 Protocol</FeatureTitle>
            <FeatureDescription>Secure & decentralized</FeatureDescription>
          </Feature>
        </WelcomeFeatures>
      </WelcomeSection>
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

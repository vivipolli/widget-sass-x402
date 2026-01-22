import { 
  AppContainer,
  Header,
  Logo,
  NavLinks,
  NavLink,
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

export default function App() {
  return (
    <AppContainer>
      <Header>
        <Logo>x402 Recurring Payments</Logo>
        <NavLinks>
          <NavLink href="/merchant-dashboard.html">Merchant Dashboard</NavLink>
          <NavLink href="/saas-platform-demo.html">SaaS Demo</NavLink>
        </NavLinks>
      </Header>

      <WelcomeSection>
        <WelcomeTitle>x402 Recurring Payment Platform</WelcomeTitle>
        <WelcomeText>
          Enable recurring crypto payments for your SaaS platform. Customers sign once,
          payments execute automatically every month with zero gas fees.
        </WelcomeText>
        <QuickLinks>
          <QuickLinkCard href="/merchant-dashboard.html">
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

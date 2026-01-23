import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0e1a 0%, #1a1f2e 100%);
  padding: 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 23, 42, 0.95);
  padding: 24px 64px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 20px 24px;
  }
`;

export const Logo = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const LogoImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  border: 2px solid rgba(59, 130, 246, 0.2);
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  a:hover {
    color: #3b82f6 !important;
    background: rgba(59, 130, 246, 0.1);
  }
`;

export const HeroSection = styled.div`
  max-width: 1000px;
  margin: 100px auto 80px;
  padding: 0 32px;
  text-align: center;
  
  @media (max-width: 768px) {
    margin: 60px auto 60px;
  }
`;

export const HeroTitle = styled.h1`
  margin: 0 0 24px 0;
  color: #ffffff;
  font-size: 64px;
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

export const HeroSubtitle = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: -0.3px;
`;

export const HeroDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  line-height: 1.8;
  margin: 0 0 48px 0;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`;

export const HeroCTA = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const CTAButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(59, 130, 246, 0.45);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const CTASecondary = styled.a`
  display: inline-block;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid rgba(59, 130, 246, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.5);
    transform: translateY(-2px);
  }
`;

export const StatsSection = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

export const StatBox = styled.div`
  text-align: center;
  padding: 32px 20px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

export const StatValue = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: #3b82f6;
  letter-spacing: -2px;
  margin-bottom: 8px;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ValueSection = styled.div`
  max-width: 1200px;
  margin: 120px auto;
  padding: 0 32px;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  color: #ffffff;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -1px;
`;

export const SectionSubtitle = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  margin-bottom: 64px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 28px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ValueCard = styled.div`
  background: rgba(15, 23, 42, 0.6);
  padding: 36px 32px;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(15, 23, 42, 0.8);
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
  }
`;

export const ValueIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
  color: #3b82f6;
  font-size: 28px;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.3);
`;

export const ValueCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.3px;
`;

export const ValueCardDesc = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
  margin: 0;
`;

export const FeaturesSection = styled.div`
  max-width: 1200px;
  margin: 100px auto;
  padding: 0 32px;
`;

export const QuickLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
  margin: 64px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const QuickLinkCard = styled.a`
  display: block;
  background: rgba(15, 23, 42, 0.6);
  padding: 40px 36px;
  border-radius: 16px;
  text-decoration: none;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(15, 23, 42, 0.8);
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
  }
`;

export const QuickLinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin-bottom: 24px;
  color: #3b82f6;
  font-size: 40px;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.3);
`;

export const QuickLinkTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.3px;
`;

export const QuickLinkDesc = styled.div`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
`;

export const WelcomeFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Feature = styled.div`
  background: rgba(15, 23, 42, 0.5);
  padding: 32px 28px;
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(59, 130, 246, 0.4);
    background: rgba(15, 23, 42, 0.7);
    transform: translateY(-2px);
  }
`;

export const FeatureIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: #3b82f6;
  font-size: 24px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

export const FeatureTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 10px;
  letter-spacing: -0.2px;
`;

export const FeatureDescription = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 60px 32px;
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  margin-top: 100px;
`;

export const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin: 0;
  font-weight: 500;
`;

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
  padding: 20px 48px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.3px;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;

  a:hover {
    color: #3b82f6 !important;
    background: rgba(59, 130, 246, 0.1);
  }
`;

export const QuickLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 48px 0;
`;

export const QuickLinkCard = styled.a`
  display: block;
  background: rgba(15, 23, 42, 0.6);
  padding: 32px 28px;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(15, 23, 42, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  }
`;

export const QuickLinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  color: #3b82f6;
  font-size: 36px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

export const QuickLinkTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 10px;
  letter-spacing: -0.2px;
`;

export const QuickLinkDesc = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

export const WelcomeSection = styled.div`
  max-width: 800px;
  margin: 80px auto;
  padding: 0 24px;
  text-align: center;
`;

export const WelcomeTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1.1;
`;

export const WelcomeText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  line-height: 1.7;
  margin: 0 0 48px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const WelcomeFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 48px;
  text-align: left;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

export const Feature = styled.div`
  background: rgba(15, 23, 42, 0.5);
  padding: 24px;
  border-radius: 6px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(59, 130, 246, 0.4);
    background: rgba(15, 23, 42, 0.7);
  }
`;

export const FeatureIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-bottom: 12px;
  color: #3b82f6;
  font-size: 20px;
`;

export const FeatureTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: -0.2px;
`;

export const FeatureDescription = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

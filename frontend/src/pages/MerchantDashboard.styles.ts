import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px 60px 24px;
`;

export const PageHeader = styled.div`
  background: rgba(15, 23, 42, 0.95);
  padding: 24px 0;
  margin-bottom: 48px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const PageHeaderContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 6px 0;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

export const PageDescription = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-weight: 400;
`;

export const Card = styled.div`
  background: rgba(15, 23, 42, 0.6);
  border-radius: 6px;
  padding: 36px;
  margin-bottom: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(10px);
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  color: #ffffff;
  margin: 0 0 28px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
  letter-spacing: 0.2px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 4px;
  font-size: 15px;
  transition: all 0.2s;
  background: rgba(10, 14, 26, 0.5);
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(10, 14, 26, 0.7);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 4px;
  font-size: 15px;
  transition: all 0.2s;
  background: rgba(10, 14, 26, 0.5);
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(10, 14, 26, 0.7);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const HelperText = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
  line-height: 1.5;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const ConnectButton = styled.button<{ $connected?: boolean }>`
  padding: 12px 20px;
  background: ${props => props.$connected ? '#10b981' : '#3b82f6'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  letter-spacing: 0.2px;

  &:hover {
    background: ${props => props.$connected ? '#059669' : '#2563eb'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.4);
    cursor: not-allowed;
    transform: none;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.2px;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CodeOutput = styled.div<{ $active?: boolean }>`
  display: ${props => props.$active ? 'block' : 'none'};
`;

export const InfoBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 4px;
  font-size: 13px;
  color: #10b981;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.4);
  color: #e2e8f0;
  padding: 20px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 13px;
  margin: 16px 0;
  position: relative;
  border: 1px solid rgba(59, 130, 246, 0.15);

  pre {
    margin: 0;
    line-height: 1.6;
  }
`;

export const CopyButton = styled.button<{ $copied?: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 14px;
  background: ${props => props.$copied ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
  color: white;
  border: 1px solid ${props => props.$copied ? 'rgba(16, 185, 129, 0.5)' : 'rgba(59, 130, 246, 0.3)'};
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: ${props => props.$copied ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.3)'};
    border-color: ${props => props.$copied ? 'rgba(16, 185, 129, 0.6)' : 'rgba(59, 130, 246, 0.5)'};
  }
`;

export const PreviewSection = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 6px;
  padding: 32px 24px;
  text-align: center;
`;

export const PreviewTitle = styled.h3`
  color: #ffffff;
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.2px;
`;

export const WidgetPreview = styled.div`
  max-width: 420px;
  margin: 0 auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  overflow: hidden;
  background: white;
  border: 1px solid rgba(59, 130, 246, 0.2);

  iframe {
    width: 100%;
    height: 600px;
    border: none;
    display: block;
  }
`;

export const DemoLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background: transparent;
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  font-size: 14px;
  letter-spacing: 0.2px;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.6);
    transform: translateY(-1px);
  }
`;

export const Description = styled.p`
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

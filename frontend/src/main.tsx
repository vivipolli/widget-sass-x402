import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-dark-blue: #0a1628;
    --color-dark-blue-secondary: #1a2332;
    --color-black: #000000;
    --color-white: #ffffff;
    --color-bright-blue: #0084ff;
    --color-bright-blue-hover: #0066ff;
    --color-light-gray: #f5f7fa;
    --color-medium-gray: #e1e4e8;
    --color-text-secondary: #6a737d;
    --color-success: #28a745;
    --color-warning: #ffa726;
    --color-error: #dc3545;
    --color-border: #d1d5da;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-dark-blue);
    color: var(--color-black);
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  button {
    font-family: inherit;
    transition: all 0.2s ease;
  }

  input, select, textarea {
    font-family: inherit;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

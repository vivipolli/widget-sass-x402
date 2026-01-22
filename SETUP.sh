#!/bin/bash

echo "🚀 AI Execution Agent - Setup Script"
echo "===================================="
echo ""

echo "📦 Installing backend dependencies..."
cd backend
yarn install
if [ $? -ne 0 ]; then
    echo "❌ Backend dependency installation failed"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

echo "📦 Installing frontend dependencies..."
cd ../frontend
yarn install
if [ $? -ne 0 ]; then
    echo "❌ Frontend dependency installation failed"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

cd ..

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add your wallet private key to backend/.env"
echo "2. Deploy smart contract: cd backend && yarn deploy"
echo "3. Add contract address to backend/.env"
echo "4. Start backend: cd backend && yarn dev"
echo "5. Start frontend: cd frontend && yarn dev"
echo ""
echo "📖 See QUICKSTART.md for detailed instructions"

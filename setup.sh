#!/bin/bash

# QuestBond Figma Setup Script
echo "🚀 QuestBond Figma Application Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo ""
    echo "Please install Node.js first:"
    echo "1. Using Homebrew: brew install node"
    echo "2. Download from: https://nodejs.org/"
    echo "3. Using nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && nvm install --lts"
    echo ""
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    echo "npm should come with Node.js. Please reinstall Node.js."
    exit 1
fi

echo "✅ Node.js $(node --version) found"
echo "✅ npm $(npm --version) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "To start the development server:"
    echo "  npm run dev"
    echo ""
    echo "To build for production:"
    echo "  npm run build"
else
    echo "❌ Failed to install dependencies"
    echo "Please check the error messages above"
    exit 1
fi
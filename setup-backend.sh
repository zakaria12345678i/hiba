#!/bin/bash

echo "🎂 Setting up Birthday Wishes Backend..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install --prefix . express cors

# Install dev dependencies
echo "🔧 Installing dev dependencies..."
npm install --prefix . nodemon

# Create wishes.json file if it doesn't exist
if [ ! -f "wishes.json" ]; then
    echo "📝 Creating wishes.json file..."
    echo "[]" > wishes.json
fi

echo "✅ Backend setup complete!"
echo ""
echo "🚀 To start the backend server, run:"
echo "   npm start"
echo ""
echo "📊 To view wishes dashboard, open:"
echo "   http://localhost:3001/admin/wishes"
echo ""
echo "🔌 API endpoints:"
echo "   GET  http://localhost:3001/api/wishes"
echo "   POST http://localhost:3001/api/wishes"

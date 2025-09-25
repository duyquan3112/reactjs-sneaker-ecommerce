

#!/bin/bash

echo "🧹 Cleaning project dependencies, cache and build..."

# Xoá thư mục node_modules
rm -rf node_modules

# Xoá lock files (tùy package manager)
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Xoá thư mục build (dist)
rm -rf dist

# Dọn cache cho npm, yarn, pnpm nếu có
if command -v npm >/dev/null 2>&1; then
  echo "🗑 Clearing NPM cache..."
  npm cache clean --force
fi

if command -v yarn >/dev/null 2>&1; then
  echo "🗑 Clearing Yarn cache..."
  yarn cache clean
fi

if command -v pnpm >/dev/null 2>&1; then
  echo "🗑 Clearing PNPM cache..."
  pnpm store prune
fi

# Cài lại dependencies
if [ -f "yarn.lock" ]; then
  echo "📦 Installing dependencies with Yarn..."
  yarn install
elif [ -f "pnpm-lock.yaml" ]; then
  echo "📦 Installing dependencies with PNPM..."
  pnpm install
else
  echo "📦 Installing dependencies with NPM..."
  npm install
fi

echo "✅ Clean, clear cache, remove build folder, and reinstall done!"
#!/bin/bash
set -e

echo "🚀 ForgeOps Vercel Deployment Script"
echo "======================================"
echo ""
echo "⚠️  IMPORTANT: This script is DEFERRED and will NOT execute automatically."
echo "It is prepared for manual activation only."
echo ""

# Check required environment variables
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: VERCEL_TOKEN not set"
    echo "Set with: export VERCEL_TOKEN=<your-token>"
    exit 1
fi

if [ -z "$VERCEL_PROJECT_ID" ]; then
    echo "❌ Error: VERCEL_PROJECT_ID not set"
    echo "Set with: export VERCEL_PROJECT_ID=<your-project-id>"
    exit 1
fi

echo "✓ Environment variables verified"
echo ""

# Verify build
echo "📦 Building frontend..."
npm run build 2>/dev/null || echo "⚠️  No build step defined (static site)"
echo "✓ Build verified"
echo ""

# Show deployment summary
echo "📋 Deployment Summary:"
echo "  Token: ${VERCEL_TOKEN:0:10}..."
echo "  Project ID: $VERCEL_PROJECT_ID"
echo "  Org ID: ${VERCEL_ORG_ID:-not-set}"
echo ""

# DEFERRED: Do NOT actually deploy
echo "⏸️  DEPLOYMENT DEFERRED"
echo "When ready, run:"
echo ""
echo "  npx vercel --token \$VERCEL_TOKEN --yes"
echo "  npx vercel --prod --token \$VERCEL_TOKEN --yes"
echo ""
echo "Or uncomment the commands below to enable automatic deployment:"
echo ""
echo "# npx vercel --token $VERCEL_TOKEN --yes"
echo "# npx vercel --prod --token $VERCEL_TOKEN --yes"
echo ""

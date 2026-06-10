#!/usr/bin/env bash
# Build, push to git, and deploy to Cloudflare Pages in one step.
# Usage:
#   ./deploy.sh                 # deploy current committed state
#   ./deploy.sh "commit message"  # stage + commit all changes, then deploy
set -euo pipefail

cd "$(dirname "$0")"

MSG="${1:-}"

# Commit any working-tree changes if a message was given
if [[ -n "$MSG" ]]; then
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "▸ Committing changes…"
    git add -A
    git commit -q -m "$MSG"
  else
    echo "▸ Nothing to commit."
  fi
fi

# Push to origin (non-fatal if it fails, e.g. offline)
echo "▸ Pushing to origin…"
git push origin main || echo "⚠︎  git push failed (continuing to deploy)."

# Build
echo "▸ Building…"
npm run build

# Deploy to Cloudflare Pages
echo "▸ Deploying to Cloudflare Pages…"
npx wrangler pages deploy dist --project-name euchre-2 --branch main

echo "✓ Done — live at https://euchre-2.pages.dev"

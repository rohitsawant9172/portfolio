#!/bin/bash

echo "=== RENAMING BRANCH FROM new_b TO main ==="
echo ""

# Check current branch
echo "Current branch:"
git branch --show-current

echo ""
echo "Adding all changes..."
git add .

echo ""
echo "Committing any uncommitted changes..."
git commit -m "Final commit before branch rename" || echo "No changes to commit"

echo ""
echo "Renaming branch from new_b to main..."
git branch -m new_b main

echo ""
echo "Pushing main branch to GitHub..."
git push origin main

echo ""
echo "Deleting old new_b branch from GitHub..."
git push origin --delete new_b

echo ""
echo "Setting upstream for main branch..."
git branch --set-upstream-to=origin/main main

echo ""
echo "✅ Branch successfully renamed to main!"
echo ""
echo "Current status:"
git status

echo ""
echo "Your portfolio is now ready for deployment on:"
echo "- GitHub: https://github.com/shivani1754/portfolio"
echo "- Vercel: https://vercel.com/new/clone?repository-url=https://github.com/shivani1754/portfolio"

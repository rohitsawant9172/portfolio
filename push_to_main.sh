#!/bin/bash

echo "=== PUSHING CODE TO MAIN BRANCH ==="
echo ""

# Check current branch
echo "Current branch:"
git branch --show-current

echo ""
echo "Adding all changes..."
git add .

echo ""
echo "Committing changes..."
git commit -m "Add image modal functionality, external URLs, and Vercel deployment config"

echo ""
echo "Switching to main branch..."
git checkout main

echo ""
echo "Merging new_b branch into main..."
git merge new_b

echo ""
echo "Pushing to main branch..."
git push origin main

echo ""
echo "✅ Code successfully pushed to main branch!"
echo ""
echo "Your portfolio is now ready for deployment on:"
echo "- GitHub: https://github.com/shivani1754/portfolio"
echo "- Vercel: https://vercel.com/new/clone?repository-url=https://github.com/shivani1754/portfolio"

#!/bin/bash

# Check if GitHub Actions build is successful
# You'll need to make an API call to GitHub to check the status of the latest workflow run
GITHUB_API_URL="https://api.github.com/repos/abhishek-kumar-91/taskforge/actions/runs"
LAST_RUN_STATUS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" $GITHUB_API_URL | jq -r '.workflow_runs[0].status')

if [ "$LAST_RUN_STATUS" == "success" ]; then
    echo "GitHub Actions build passed. Proceeding with Vercel deployment."
    exit 0
else
    echo "GitHub Actions build failed. Skipping Vercel deployment."
    exit 1
fi

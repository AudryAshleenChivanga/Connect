# GitHub Pages Deployment Script for Ashletech Connect SRHR
# Run this script to help with GitHub deployment

Write-Host "==========================================="
Write-Host "Ashletech Connect SRHR - GitHub Deployment"
Write-Host "==========================================="
Write-Host ""

Write-Host "This script will guide you through deploying to GitHub Pages"
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion"
} catch {
    Write-Host "❌ Git not found. Please install Git first: https://git-scm.com/"
    exit
}

# Get GitHub username
$githubUsername = Read-Host "Enter your GitHub username"
if (-not $githubUsername) {
    Write-Host "❌ GitHub username is required"
    exit
}

$repoName = "ashletech-connect-srhr"
$repoUrl = "https://github.com/$githubUsername/$repoName.git"

Write-Host ""
Write-Host "Repository URL: $repoUrl"
Write-Host ""

# Initialize git repository if not already done
if (-not (Test-Path ".git")) {
    Write-Host "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Ashletech Connect SRHR website"
} else {
    Write-Host "📁 Git repository already initialized"
    git add .
    git commit -m "Update - Ashletech Connect SRHR website"
}

# Check if remote origin exists
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "🔗 Adding remote origin..."
    git remote add origin $repoUrl
} else {
    Write-Host "🔗 Remote origin already exists"
}

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..."
try {
    git push -u origin main
    Write-Host "✅ Successfully pushed to GitHub!"
} catch {
    Write-Host "❌ Push failed. Trying to push to master branch instead..."
    try {
        git push -u origin master
        Write-Host "✅ Successfully pushed to GitHub (master branch)!"
    } catch {
        Write-Host "❌ Push failed. Please check your repository settings and try again."
        Write-Host "💡 Make sure:"
        Write-Host "   - Repository exists on GitHub"
        Write-Host "   - Repository is public"
        Write-Host "   - You have push access to the repository"
    }
}

Write-Host ""
Write-Host "==========================================="
Write-Host "🎉 Deployment Instructions:"
Write-Host "==========================================="
Write-Host ""
Write-Host "1. Go to: https://github.com/$githubUsername/$repoName"
Write-Host "2. Click Settings tab"
Write-Host "3. Scroll down to 'Pages' section"
Write-Host "4. Under 'Source', select 'Deploy from a branch'"
Write-Host "5. Under 'Branch', select 'main' (or 'master')"
Write-Host "6. Click 'Save'"
Write-Host ""
Write-Host "Your website will be live at:"
Write-Host "https://$githubUsername.github.io/$repoName"
Write-Host ""
Write-Host "==========================================="
Write-Host "⏱️  Note: It may take 2-3 minutes for your site to be live"
Write-Host ""
Write-Host "Happy deploying! 🚀"

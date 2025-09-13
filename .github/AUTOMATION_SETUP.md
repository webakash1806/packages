# GitHub Actions Automation Setup

This repository is configured with GitHub Actions to automatically publish packages to NPM whenever code is committed to the main branch.

## 🚀 What's Included

### 1. `npm-publish.yml` - Simple Single Package Publishing
- Triggers on pushes to the main branch that affect the `rich-text-editor` folder
- Automatically builds, versions, and publishes the package
- Creates git tags for releases

### 2. `publish-packages.yml` - Advanced Multi-Package Publishing
- Detects which packages have changed and publishes only those
- Supports multiple packages in a monorepo structure
- Can be triggered manually for specific packages
- Creates separate releases for each package

### 3. `release.yml` - Release Creation
- Creates GitHub releases when version tags are pushed
- Generates release notes automatically
- Includes build artifacts

## 🔧 Setup Required

### 1. NPM Token
You need to add your NPM authentication token to GitHub Secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and Variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Your NPM authentication token

To get your NPM token:
```bash
npm login
npm token create --type automation
```

### 2. Repository Permissions
The GitHub Actions need permission to push commits and create releases:

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**

## 📁 Repository Structure

This setup assumes your repository structure is:
```
packages/                    # Your GitHub repository
├── .github/
│   └── workflows/
│       ├── npm-publish.yml
│       ├── publish-packages.yml
│       └── release.yml
├── rich-text-editor/       # Your package folder
│   ├── package.json
│   ├── src/
│   └── dist/
└── other-package/          # Additional packages (optional)
    ├── package.json
    └── ...
```

## 🎯 How It Works

### Automatic Publishing
1. **Make changes** to your package (e.g., `rich-text-editor/`)
2. **Commit and push** to the main branch
3. **GitHub Actions automatically**:
   - Detects changes in the package
   - Installs dependencies
   - Runs tests (if available)
   - Builds the package
   - Bumps the version (patch level)
   - Publishes to NPM
   - Creates a git tag
   - Creates a GitHub release

### Manual Publishing
You can also manually trigger publishing:
1. Go to **Actions** tab in your GitHub repository
2. Select **Publish Packages** workflow
3. Click **Run workflow**
4. Optionally specify a package name, or leave empty to publish all changed packages

### Version Management
- The workflow automatically bumps the **patch version** (e.g., 1.0.0 → 1.0.1)
- If you want to bump major or minor versions, update the version manually in `package.json`
- The workflow checks if a version already exists on NPM before attempting to publish

## 🏷️ Git Tags and Releases

### Single Package Setup (`npm-publish.yml`)
- Creates tags like: `v1.0.1`
- Creates releases titled: "Release 1.0.1"

### Multi-Package Setup (`publish-packages.yml`)
- Creates tags like: `rich-text-editor-v1.0.1`
- Creates releases titled: "rich-text-editor v1.0.1"

## 🔄 Adding More Packages

To add another package to the multi-package workflow:

1. Edit `.github/workflows/publish-packages.yml`
2. In the "Detect changed packages" step, add:
   ```bash
   # Check your-new-package
   if echo "$changed_files" | grep -q "^your-new-package/"; then
     packages+=("your-new-package")
   fi
   ```

## 🛠️ Customization

### Change Version Bump Strategy
In the workflows, find the line:
```bash
npm version patch --no-git-tag-version
```

Change `patch` to:
- `minor` for minor version bumps (1.0.0 → 1.1.0)
- `major` for major version bumps (1.0.0 → 2.0.0)

### Skip CI
Add `[skip ci]` to your commit message to prevent the workflow from running.

### Test Configuration
The workflows will run `npm run test` if the script exists in your `package.json`. Tests failures won't stop publishing by default.

## 🐛 Troubleshooting

### Common Issues

1. **NPM_TOKEN not set**: Make sure you've added your NPM token to GitHub Secrets
2. **Permission denied**: Check workflow permissions in repository settings
3. **Package already exists**: The workflow checks for existing versions and bumps automatically
4. **Build fails**: Ensure your package builds successfully with `npm run build`

### Checking Workflow Status
1. Go to the **Actions** tab in your GitHub repository
2. Click on the failed workflow to see detailed logs
3. Check each step for error messages

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs for detailed error messages
2. Ensure all required secrets are set up correctly
3. Verify your package.json scripts work locally
4. Make sure your NPM token has publishing permissions

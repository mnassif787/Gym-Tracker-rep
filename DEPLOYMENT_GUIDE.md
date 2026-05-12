# Deploy Gym Tracker Rep to Vercel

## Quick Deployment Steps

### Option 1: Automatic Deploy (Recommended)

1. **Visit Vercel**: Go to https://vercel.com/new
2. **Sign in/Sign up**: Use your GitHub account to sign in
3. **Import Repository**: 
   - Click "Continue with GitHub"
   - Select the `Gym-Tracker-rep` repository
4. **Configure Project**:
   - Project Name: `gym-tracker-rep` (or your choice)
   - Framework Preset: Vite (should auto-detect)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)
5. **Deploy**: Click "Deploy" button
6. **Wait**: Deployment takes ~1-2 minutes
7. **Done**: You'll get a URL like `gym-tracker-rep.vercel.app`

### Option 2: Vercel CLI (Manual)

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd "c:\Nassif\AI\Gym-Tracker-rep"

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? gym-tracker-rep
# - In which directory is your code located? ./
# - Want to modify settings? N

# Deploy to production
vercel --prod
```

## Project Configuration

The project includes a `vercel.json` file with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## What Happens During Deployment

1. Vercel installs dependencies (`npm install`)
2. Runs TypeScript compilation (`tsc`)
3. Builds production bundle (`vite build`)
4. Deploys static files from `dist/` folder
5. Provides HTTPS URL with automatic SSL

## Features You Get

- ✅ **Global CDN**: Fast loading worldwide
- ✅ **Automatic HTTPS**: Secure by default
- ✅ **Auto-deployments**: Push to GitHub → auto-deploy
- ✅ **Preview URLs**: Every PR gets its own URL
- ✅ **Zero config**: Works out of the box
- ✅ **Free tier**: No cost for personal projects

## Access Your App

After deployment, you can access your app from:
- **Production URL**: `https://gym-tracker-rep.vercel.app` (or custom name)
- **Any device**: Mobile, tablet, desktop
- **Anywhere**: Internet connection required

## Troubleshooting

### Build fails
- Check build logs in Vercel dashboard
- Verify `npm run build` works locally
- Ensure all dependencies are in `package.json`

### Blank page after deploy
- Check browser console for errors
- Verify base path in vite.config.ts if using custom domain
- Check if assets are loading (Network tab)

### 404 on refresh
- Add `vercel.json` with rewrites (already included)
- SPA routing handled automatically

## Custom Domain (Optional)

1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Vercel handles SSL automatically

## Continuous Deployment

Already configured! Every push to `main` branch:
1. Triggers automatic build
2. Runs tests (if configured)
3. Deploys to production
4. Updates live URL

---

**Repository**: https://github.com/mnassif787/Gym-Tracker-rep
**Status**: ✅ Ready to deploy
**Estimated deployment time**: 1-2 minutes

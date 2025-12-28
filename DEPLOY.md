# Fairblock Website - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Navigate to project folder** and deploy:
```bash
cd fairblock-vercel
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `fairblock` (or your choice)
   - Directory? `./`
   - Override settings? `N`

5. **Done!** Your site will be live at `https://fairblock-xxx.vercel.app`

---

### Option 2: Deploy via GitHub

1. **Create a GitHub repository**

2. **Push the code**:
```bash
cd fairblock-vercel
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fairblock-website.git
git push -u origin main
```

3. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

---

### Option 3: Drag & Drop Deploy

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag and drop the `fairblock-vercel` folder
3. Wait for deployment to complete

---

## 📁 Project Structure

```
fairblock-vercel/
├── public/
│   └── index.html      # Main frontend (React SPA)
├── api/
│   ├── login.js        # Auth API endpoint
│   └── posts.js        # Blog posts API endpoint
├── vercel.json         # Vercel configuration
├── package.json        # Dependencies
└── DEPLOY.md           # This file
```

---

## ⚙️ Environment Variables (Optional)

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT tokens | `fairblock-secret-key-2025` |

---

## 🔐 Admin Access

- **URL**: `https://your-site.vercel.app` → Click "Login"
- **Username**: `admin`
- **Password**: `admin`

⚠️ For production, change these credentials!

---

## 🗄️ Data Storage

The demo uses in-memory storage which resets on each deployment.

For persistent data, add **Vercel KV**:

1. Go to Vercel Dashboard → Storage → Create Database → KV
2. Connect to your project
3. Data will now persist across deployments

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run locally with Vercel dev server
npm run dev
# or
vercel dev
```

Open `http://localhost:3000`

---

## 📝 After Deployment Checklist

- [ ] Test the home page loads correctly
- [ ] Test the game section works
- [ ] Test admin login with admin/admin
- [ ] Create a test blog post
- [ ] Set custom domain (optional)
- [ ] Add environment variables for production

---

## 🌐 Custom Domain

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g., `fairblock.io`)
3. Update DNS records as instructed
4. SSL certificate is automatic!

---

## 🆘 Troubleshooting

**Build fails?**
- Check `vercel.json` syntax
- Ensure all files are in correct folders

**API not working?**
- Check browser console for errors
- Verify API routes in vercel.json

**Login not working?**
- Use exactly: `admin` / `admin`
- Check network tab for API responses

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Fairblock: https://fairblock.network

---

Made with ❤️ for Fairblock

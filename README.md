# QuestBond Figma Web Application

This is a React TypeScript application using Vite as the build tool and shadcn/ui components.

## Prerequisites

You need to have Node.js and npm installed on your system. If they're not installed:

### Installing Node.js and npm on macOS

1. **Using Homebrew (Recommended):**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js and npm
   brew install node
   ```

2. **Using Node.js installer:**
   - Download the installer from [nodejs.org](https://nodejs.org/)
   - Run the installer and follow the instructions

3. **Using Node Version Manager (nvm):**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install --lts
   nvm use --lts
   ```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
QuestBond-Figma/
├── components (1)/          # UI Components
│   ├── pages/              # Page components
│   ├── ui/                 # shadcn/ui components
│   ├── ActivityFeed.tsx    # Activity feed component
│   └── StatsOverview.tsx   # Stats overview component
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── globals.css            # Global styles and CSS variables
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

## Features

- 🎨 Material Design 3 components
- 🌙 Dark/Light theme support
- 📱 Responsive design
- ⚡ Fast development with Vite
- 🔧 TypeScript for type safety
- 🎭 shadcn/ui component library
- 🎯 Lucide React icons

## Troubleshooting

### Common Issues

1. **Node.js not found:**
   - Make sure Node.js is installed and added to your PATH
   - Restart your terminal after installation

2. **npm command not found:**
   - npm comes with Node.js, ensure Node.js is properly installed
   - Try `which node` and `which npm` to verify installation

3. **Permission errors:**
   - On macOS/Linux, you might need to use `sudo` for global installations
   - Consider using a Node version manager like nvm

4. **Port already in use:**
   - The default port 3000 might be in use
   - Vite will automatically suggest an alternative port
   - Or manually specify: `npm run dev -- --port 3001`

### Build Issues

If you encounter build issues:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear Vite cache:
   ```bash
   rm -rf .vite
   npm run dev
   ```

## Architecture

This application follows a component-based architecture:

- **App.tsx**: Main application with navigation
- **Pages**: Individual page components (Dashboard, Browse Jobs, etc.)
- **UI Components**: Reusable shadcn/ui components
- **State Management**: React hooks for local state
- **Styling**: Tailwind CSS with CSS custom properties

## Next Steps

Once the application is running, you can:

1. Explore the dashboard interface
2. Navigate between different sections
3. Customize the theme and styling
4. Add new features and components
5. Integrate with backend APIs

Happy coding! 🚀
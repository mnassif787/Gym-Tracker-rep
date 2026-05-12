# Gym Tracker Rep

A modern, clean GYM tracker application built with React, TypeScript, and Vite.

## Features

- 📱 **iOS-style Interface** - Complete with notch, status bar, and home indicator
- 🏋️ **Workout Logging** - Track sets, reps, and weight with intuitive steppers
- 📊 **Progress Tracking** - Weekly volume charts and personal records
- 📅 **Workout Plans** - Pre-built plans (Push/Pull, Full Body, Upper/Lower, Home)
- ⚡ **Haptic Feedback** - Vibration on interactions
- 🔊 **Audio Feedback** - Rest timer completion chime
- 🎨 **Custom Illustrations** - Monoline stick figures for all exercises
- ⚖️ **Unit Conversion** - Support for kg/lb

## Design System

- **Colors**: Lime accent (#C8DC6B), Cream background (#F4EFE6)
- **Typography**: Bricolage Grotesque (headings), Geist (body), Geist Mono (stats)
- **Layout**: 390x844px iPhone frame

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Pure CSS** - No UI libraries

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── lib/
│   ├── tokens.ts       # Design system colors
│   ├── data.ts         # Exercises, plans, helpers
│   └── utils.ts        # Haptics, audio, utilities
├── components/
│   ├── Icon.tsx        # UI icons
│   ├── Button.tsx      # Button component
│   ├── Card.tsx        # Card container
│   ├── Wordmark.tsx    # App logo
│   ├── ExerciseFigure.tsx  # Exercise illustrations
│   └── TabBar.tsx      # Bottom navigation
├── pages/
│   ├── HomePage.tsx    # Today page
│   ├── TemplatesPage.tsx   # Plans page
│   ├── ProgressPage.tsx    # Progress tracking
│   ├── ProfilePage.tsx     # User settings
│   └── LogPage.tsx     # Workout logging
└── App.tsx             # Main app with routing
```

## License

MIT

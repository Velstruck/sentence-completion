# Interactive Sentence Construction Tool

A modern web application for interactive sentence construction practice, built with React, TypeScript, and Vite. This tool helps users practice sentence construction with a user-friendly interface and helpful features.

## Features

- **Interactive Question Interface**: Clean and intuitive interface for sentence construction practice
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Timer Functionality**: Track time spent on each question
- **Feedback System**: Immediate feedback on correct/incorrect answers
- **Progress Tracking**: Monitor your progress through questions
- **Responsive Design**: Works seamlessly across different screen sizes

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Velstruck/sentence-completion.git
   cd sentence-construction
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Start the JSON server or use MOCK API (in a separate terminal):
   ```bash
   npx json-server sample.json
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)
2. Select a question to begin practicing
3. Use the interface to construct sentences
4. Submit your answer to receive immediate feedback
5. Track your progress and timing

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- JSON Server
- Zustand for state management

## Project Structure

```
src/
  ├── components/      # React components
  ├── context/         # Context providers
  ├── store/           # State management
  ├── types/           # TypeScript type definitions
  └── App.tsx          # Main application component
```

## Development

- Run development server: `npm run dev`
- Run JSON server: `npm run server`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

# Faceit Feed Next.js

A modern feed application built with Next.js, Redux, and Tailwind CSS.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn (v1.22.0 or higher)

### Checking your Node.js version
```bash
# On Windows, macOS, or Linux
node --version
```

### Installing Node.js
- **Windows**: Download and install from [Node.js website](https://nodejs.org/)
- **macOS**: 
  ```bash
  # Using Homebrew
  brew install node
  ```
- **Linux (Ubuntu/Debian)**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd faceit-feed-nextjs
```

2. Install dependencies:
```bash
# Using npm
npm install

# OR using yarn
yarn install
```

## Running the Application

### Development Mode

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
npm run build
# OR
yarn build

# Start the production server
npm run start
# OR
yarn start
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## Available Scripts

- `npm run dev` or `yarn dev`: Start development server
- `npm run build` or `yarn build`: Build for production
- `npm run start` or `yarn start`: Start production server
- `npm run lint` or `yarn lint`: Run ESLint
- `npm run test` or `yarn test`: Run tests

## Troubleshooting

### Common Issues

1. **Port 3000 is already in use**
   ```bash
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # On macOS/Linux
   lsof -i :3000
   kill -9 <PID>
   ```

2. **Node modules issues**
   ```bash
   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install
   # OR
   yarn install
   ```

3. **Build errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   # OR
   yarn build
   ```

## Browser Support

The application is tested and supported on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

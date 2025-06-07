# Weather API Wrapper Service

Sample solution for the [Weather API](https://roadmap.sh/projects/weather-api-wrapper-service) challenge from [roadmap.sh](https://roadmap.sh/).

A full-stack weather application with a Next.js frontend and Node.js backend, featuring real-time weather data with intelligent caching.

## Features

- Real-time weather data fetching
- Intelligent caching using Redis
- Search history tracking
- Favorite locations management
- Responsive design with modern UI components
- Debounced search functionality
- Local storage persistence for user preferences

## Project Structure

```
weather-api-wrapper-service/
├── backend/
│   ├── cache.js           # Redis cache implementation
│   ├── index.js           # Express server setup
│   └── weatherService.js  # Weather service logic
└── frontend/
    ├── app/              # Next.js 13+ app directory
    │   ├── api/         # API routes
    │   └── page.tsx     # Main application page
    ├── components/      # React components
    │   ├── weather-card.tsx
    │   ├── favorites-list.tsx
    │   ├── search-history.tsx
    │   └── ui/          # UI components
    ├── constants/       # Application constants
    ├── hooks/          # Custom React hooks
    ├── lib/           # Utility functions
    └── types/         # TypeScript type definitions
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-api-wrapper-service
```

2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
pnpm install

# Install frontend dependencies
cd ../frontend
pnpm install
```

3. Set up Redis (required for backend caching):

   - Install Redis on your system
   - Ensure Redis server is running

4. Start the services:

```bash
# Start backend server
cd backend
pnpm start

# In a new terminal, start frontend development server
cd frontend
pnpm dev
```

## Usage

Access the application at `http://localhost:3000`. The interface allows you to:

- Search for weather by city name
- View detailed weather information
- Save favorite locations
- Access search history
- Toggle between favorite and non-favorite cities

## Technologies Used

### Backend

- Node.js
- Express
- Redis for caching
- Weather API integration

### Frontend

- Next.js 13+
- React
- TypeScript
- Tailwind CSS
- Shadcn UI components

## Features in Detail

1. **Weather Search**

   - Real-time weather data fetching
   - Debounced search to prevent API spam
   - Error handling and loading states

2. **Favorites Management**

   - Add/remove cities from favorites
   - Persistent storage using localStorage
   - Quick access to favorite locations

3. **Search History**

   - Track recent searches
   - Click to quickly search again
   - Limited to 10 most recent searches

4. **Caching System**
   - Redis-based caching on the backend
   - Improved response times
   - Reduced API calls

## Development

For development with hot reload:

```bash
# Backend
cd backend
pnpm dev

# Frontend
cd frontend
pnpm dev
```

## License

MIT

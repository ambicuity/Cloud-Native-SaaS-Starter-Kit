# Cloud-Native SaaS Starter Kit

[![CI Pipeline](https://github.com/ambicuity/Cloud-Native-SaaS-Starter-Kit/actions/workflows/ci.yml/badge.svg)](https://github.com/ambicuity/Cloud-Native-SaaS-Starter-Kit/actions/workflows/ci.yml)

A production-ready, cloud-native SaaS starter kit with modular architecture, comprehensive testing, and CI/CD pipeline. Built with modern technologies and best practices for scalability and maintainability.

## 🎯 Project Overview

This starter kit provides a complete foundation for building SaaS applications with:
- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React + TypeScript
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest (unit + integration tests)
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint + Prettier
- **Containerization**: Docker + Docker Compose
- **Security**: JWT authentication, Helmet, CORS

## 📐 Architecture

### Backend Architecture (Layered Design)

```
backend/
├── src/
│   ├── routes/          # API routing (Express routers)
│   ├── controllers/     # Request/response handling
│   ├── services/        # Business logic
│   ├── models/          # Data models and DTOs
│   ├── middleware/      # Auth, validation, error handling
│   ├── config/          # Configuration and environment
│   └── utils/           # Shared utilities (logger, errors)
├── __tests__/
│   ├── unit/            # Unit tests for services
│   └── integration/     # API integration tests
└── dist/                # Compiled TypeScript output
```

### Frontend Architecture (Component-Based)

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-based page views
│   ├── services/        # API communication layer
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript interfaces
│   └── config/          # Environment configuration
└── dist/                # Production build output
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ambicuity/Cloud-Native-SaaS-Starter-Kit.git
   cd Cloud-Native-SaaS-Starter-Kit
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Running Locally

#### Backend
```bash
cd backend
npm run dev        # Development mode with hot reload
npm run build      # Build for production
npm start          # Run production build
```

The backend will be available at `http://localhost:3000`
- API Documentation: `http://localhost:3000/api-docs`
- Health Check: `http://localhost:3000/health`

#### Frontend
```bash
cd frontend
npm run dev        # Development mode
npm run build      # Build for production
npm run preview    # Preview production build
```

The frontend will be available at `http://localhost:5173`

### Running with Docker

```bash
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

Access the application:
- Frontend: `http://localhost`
- Backend API: `http://localhost:3000`
- API Docs: `http://localhost:3000/api-docs`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test              # Run all tests with coverage
npm run test:watch    # Run tests in watch mode
```

### Frontend Tests
```bash
cd frontend
npm test              # Run all tests with coverage
npm run test:watch    # Run tests in watch mode
```

## 🔍 Code Quality

### Linting
```bash
# Backend
cd backend
npm run lint          # Check for issues
npm run lint:fix      # Fix automatically

# Frontend
cd frontend
npm run lint          # Check for issues
npm run lint:fix      # Fix automatically
```

### Formatting
```bash
# Backend
cd backend
npm run format        # Format code with Prettier

# Frontend
cd frontend
npm run format        # Format code with Prettier
```

## 📚 API Documentation

The API is fully documented using Swagger/OpenAPI. Access the interactive documentation at:
- Development: `http://localhost:3000/api-docs`

### Available Endpoints

#### Users API
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

#### Health Check
- `GET /health` - Server health status

## 🔐 Authentication

The starter kit includes JWT-based authentication middleware:

```typescript
import { authenticate } from './middleware/auth';

// Protected route example
router.get('/protected', authenticate, (req, res) => {
  // Access user info from req.user
});
```

## ⚙️ Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=24h
LOG_LEVEL=info
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

### Pipeline Stages
1. **Install dependencies** - Install npm packages
2. **Linting** - Check code quality with ESLint
3. **Testing** - Run unit and integration tests
4. **Build** - Compile TypeScript and build production bundles

### Running CI Checks Locally
```bash
# Backend
cd backend
npm ci && npm run lint && npm test && npm run build

# Frontend
cd frontend
npm ci && npm run lint && npm test && npm run build
```

## 🔧 Extending the Starter Kit

### Adding a New Module

1. **Create the Model** (`backend/src/models/YourModel.ts`)
   ```typescript
   export interface YourModel {
     id: string;
     // Add fields
   }
   ```

2. **Create the Service** (`backend/src/services/yourService.ts`)
   ```typescript
   export class YourService {
     async getAll() { /* logic */ }
     async create(data) { /* logic */ }
     // Add methods
   }
   ```

3. **Create the Controller** (`backend/src/controllers/yourController.ts`)
   ```typescript
   export class YourController {
     async getAll(req, res, next) { /* logic */ }
     // Add methods
   }
   ```

4. **Create the Routes** (`backend/src/routes/yourRoutes.ts`)
   ```typescript
   const router = Router();
   router.get('/', yourController.getAll);
   export default router;
   ```

5. **Register Routes** in `backend/src/routes/index.ts`
   ```typescript
   import yourRoutes from './yourRoutes';
   router.use('/your-resource', yourRoutes);
   ```

6. **Add Tests** in `backend/src/__tests__/`

### Adding Frontend Components

1. Create component in `frontend/src/components/`
2. Create service in `frontend/src/services/` if API calls needed
3. Add custom hooks in `frontend/src/hooks/` for state management
4. Create pages in `frontend/src/pages/` for routes

## 📦 Project Structure Best Practices

- **DRY (Don't Repeat Yourself)**: Reuse code through utilities and shared components
- **Separation of Concerns**: Each layer has a specific responsibility
- **Single Responsibility**: Each module does one thing well
- **Dependency Injection**: Services are injected, making testing easier
- **Type Safety**: TypeScript for compile-time error detection

## 🛡️ Security Features

- **Helmet**: Secure HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **JWT**: Token-based authentication
- **Input Validation**: Request validation middleware
- **Error Handling**: Centralized error management
- **Environment Variables**: Sensitive data in .env files

## 📝 Logging

The application uses Winston for structured logging:
- Console output in development
- File output (logs/error.log, logs/combined.log)
- JSON format for easy parsing
- Configurable log levels

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 💡 Use Cases

This starter kit is perfect for:
- SaaS applications
- Internal tools and dashboards
- API-first applications
- Microservices architecture
- MVP and prototypes
- Learning modern web development

## 🚦 Production Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong, random value
- [ ] Set NODE_ENV=production
- [ ] Configure proper CORS origins
- [ ] Set up proper database (replace in-memory storage)
- [ ] Configure logging to external service
- [ ] Set up monitoring and alerting
- [ ] Configure SSL/TLS certificates
- [ ] Review and update security headers
- [ ] Set up backup strategy
- [ ] Configure rate limiting
- [ ] Review error messages (don't expose internals)
- [ ] Set up CI/CD for automated deployments

## 📞 Support

For questions and support:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation at `/api-docs`

---

**Built with ❤️ for developers building production-ready SaaS applications**
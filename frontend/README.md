# MyDuka Inventory Management System - Frontend

A modern React-based frontend for the MyDuka inventory management system, built with Vite, Redux Toolkit, and Tailwind CSS.

## Features

- **Role-based Authentication**: Support for Merchant, Admin, and Clerk roles
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Dashboard**: Overview of inventory, sales, and system metrics
- **Inventory Management**: Add, edit, and track inventory records
- **Supply Request System**: Request and approve supply orders
- **Reports & Analytics**: Visual reports with charts and graphs
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **Chart.js & React-Chartjs-2** - Data visualization
- **React Hook Form** - Form handling

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running on http://localhost:5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your backend API URL:
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components (Layout, Header, Sidebar)
│   ├── dashboard/      # Dashboard components
│   ├── inventory/      # Inventory management components
│   └── reports/        # Reports and analytics components
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── store/              # Redux store and slices
│   └── slices/         # Redux Toolkit slices
├── utils/              # Utility functions
└── App.jsx             # Main application component
```

## User Roles & Permissions

### Merchant (Superuser)
- Full system access
- Manage stores and users
- View all reports and analytics
- System configuration

### Admin
- Manage store operations
- Approve/decline supply requests
- View store-specific reports
- Manage clerks

### Clerk
- Add inventory records
- Create supply requests
- View basic dashboard
- Update item status

## API Integration

The frontend communicates with the Flask backend through RESTful APIs:

- **Authentication**: `/auth/login`, `/auth/logout`, `/auth/refresh`
- **Inventory**: `/inventory/*` - CRUD operations for inventory records
- **Supply Requests**: `/supply-requests/*` - Manage supply requests
- **Reports**: `/reports/*` - Generate various reports
- **Users**: `/merchant/*`, `/admin/*`, `/clerk/*` - User management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Demo Credentials

For testing purposes, you can use these demo credentials:

- **Merchant**: merchant@myduka.com / password123
- **Admin**: admin@myduka.com / password123  
- **Clerk**: clerk@myduka.com / password123

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

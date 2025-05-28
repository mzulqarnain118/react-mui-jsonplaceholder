# React CRUD App - Posts Manager

A modern, responsive React.js application for managing posts with full CRUD operations, built with Material-UI and TypeScript.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.15.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![Zustand](https://img.shields.io/badge/Zustand-4.4.7-orange)

## 🚀 Features

### Core Functionality

- **Full CRUD Operations**: Create, Read, Update, and Delete posts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Search**: Filter posts by title and content
- **User Filtering**: Filter posts by specific users
- **Sorting**: Sort posts alphabetically (ascending/descending)
- **View Modes**: Switch between grid and table views
- **Dark/Light Theme**: Toggle between themes with persistent storage

### Advanced Features

- **Form Validation**: Comprehensive client-side validation with error messages
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Graceful error handling with user-friendly messages
- **Confirmation Dialogs**: Safe deletion with confirmation modals
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Navigation**: Clean routing with React Router
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Core Technologies

- **React 18.2.0** - Modern React with hooks and functional components
- **TypeScript 5.2.2** - Type-safe development
- **Vite 5.0.8** - Fast build tool and development server
- **Material-UI 5.15.0** - Comprehensive React UI framework

### State Management & Data

- **Zustand 4.4.7** - Lightweight state management
- **React Query 5.17.0** - Server state management and caching
- **React Hook Form 7.54.1** - Performant form handling
- **Zod 3.24.1** - Schema validation

### Routing & UI

- **React Router DOM 6.20.0** - Client-side routing
- **Notistack 3.0.1** - Toast notifications
- **Emotion** - CSS-in-JS styling

### API Integration

- **Axios 1.6.2** - HTTP client for API calls
- **JSONPlaceholder** - Mock REST API for posts and users

## 📦 Installation & Setup

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/mzulqarnain118/react-mui-jsonplaceholder
   cd react-mui-jsonplaceholder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── layout/          # Layout components (Header, Footer, AppLayout)
│   ├── PostsManager.tsx # Main posts listing component
│   ├── PostForm.tsx     # Create/Edit post form
│   ├── PostDetail.tsx   # Post detail view
│   └── DeleteConfirmModal.tsx # Confirmation dialog
├── contexts/            # React contexts
│   └── ToastContext.tsx # Toast notification context
├── services/            # API services
│   └── api.ts          # API client and endpoints
├── store/              # Zustand stores
│   ├── postsStore.ts   # Posts state management
│   └── themeStore.ts   # Theme state management
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🎨 Design Decisions

### Architecture Choices

1. **Component-Based Architecture**

   - Modular, reusable components
   - Clear separation of concerns
   - Easy to test and maintain

2. **State Management with Zustand**

   - Lightweight alternative to Redux
   - TypeScript-first design
   - Minimal boilerplate
   - Excellent developer experience

3. **Material-UI for Consistent Design**

   - Professional, accessible components
   - Built-in theming system
   - Responsive design out of the box
   - Comprehensive component library

4. **TypeScript for Type Safety**
   - Catch errors at compile time
   - Better IDE support and autocomplete
   - Self-documenting code
   - Improved refactoring capabilities

### UX/UI Decisions

1. **Responsive Grid Layout**

   - CSS Grid for flexible layouts
   - Adapts to different screen sizes
   - Maintains visual hierarchy

2. **Dual View Modes**

   - Grid view for visual browsing
   - Table view for data-heavy operations
   - User preference persistence

3. **Progressive Enhancement**

   - Core functionality works without JavaScript
   - Enhanced experience with modern features
   - Graceful degradation

4. **Accessibility First**
   - Semantic HTML structure
   - ARIA labels and roles
   - Keyboard navigation support
   - High contrast ratios

### Performance Optimizations

1. **React Query for Caching**

   - Intelligent background updates
   - Optimistic updates
   - Reduced API calls

2. **Code Splitting**

   - Lazy loading of routes
   - Smaller initial bundle size
   - Faster page loads

3. **Optimized Re-renders**
   - Zustand's selective subscriptions
   - Memoized components where needed
   - Efficient state updates

## 🔧 API Integration

The app integrates with [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a fake REST API for testing and prototyping.

### Endpoints Used

- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update existing post
- `DELETE /posts/:id` - Delete post
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch single user

### Error Handling

- Network error handling
- API error responses
- User-friendly error messages
- Retry mechanisms

## 🎯 Key Features Showcase

### 1. Advanced Filtering & Search

- Real-time search across title and content
- User-based filtering
- Sorting capabilities
- Results counter

### 2. Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### 3. Theme System

- Light/Dark mode toggle
- Persistent theme preference
- Material-UI theming
- Consistent color palette

### 4. Form Validation

- Real-time validation feedback
- Custom validation rules
- Error state management
- Accessibility compliance

### 5. State Management

- Centralized state with Zustand
- Optimistic updates
- Error state handling
- Loading state management

## 🚀 Future Enhancements

- [ ] Infinite scrolling for large datasets
- [ ] Advanced filtering options
- [ ] Bulk operations (select multiple posts)
- [ ] Export functionality (CSV, PDF)
- [ ] User authentication
- [ ] Real-time updates with WebSockets
- [ ] Offline support with service workers
- [ ] Advanced search with filters
- [ ] Post categories and tags
- [ ] Rich text editor for post content

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the excellent component library
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the mock API
- [Zustand](https://github.com/pmndrs/zustand) for simple state management
- [React Query](https://tanstack.com/query) for server state management

---

**Built with ❤️ using React, TypeScript, and Material-UI**

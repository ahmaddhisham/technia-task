import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { RootLayout } from './layouts/RootLayout';
import { LeadsPage } from './pages/leads';
import { ActionsPage } from './pages/actions';
import { EmployeesPage } from './pages/employees';
import { EmployeeSalariesPage } from './pages/employees-salaries';
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Define your routes
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LeadsPage,
});

const actionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/actions',
  component: ActionsPage,
});

const employeesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employees',
  component: EmployeesPage,
});

const employeeSalariesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employees-salaries',
  component: EmployeeSalariesPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  actionsRoute,
  employeesRoute,
  employeeSalariesRoute,
]);

// Create the router
const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
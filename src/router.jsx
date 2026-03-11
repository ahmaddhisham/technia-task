import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootLayout } from './layouts/RootLayout';
import { LeadsPage } from './pages/leads';
import { ActionsPage } from './pages/actions';
import { EmployeesPage } from './pages/employees';
import { EmployeeSalariesPage } from './pages/employee-salaries';

// Create the root route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Create child routes
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
  path: '/employee-salaries',
  component: EmployeeSalariesPage,
});

// Build the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  actionsRoute,
  employeesRoute,
  employeeSalariesRoute,
]);

export { routeTree };
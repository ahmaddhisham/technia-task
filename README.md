## CRM Dashboard (Leads, Actions, Employees & Salaries)

An interactive **React + Vite** dashboard for managing:

- **Leads** – track prospects with status and metadata  
- **Actions** – to‑dos and follow‑ups associated with your pipeline  
- **Employees** – people directory with roles and hire dates  
- **Employee Salaries** – salary records with bonuses, deductions, and net pay  

All CRUD actions work against a **mock API** that persists data in **`localStorage`**, so your changes survive page reloads without needing a backend.

---

## ✨ Features

- **Modern UI**
  - Responsive layout with sidebar navigation and top header
  - Clean tables with sorting, searching, and pagination
  - Icons via `react-icons` for a polished look

- **Data Management**
  - Leads, actions, employees, and salary records
  - Create, edit, delete via modals on every page
  - Client‑side persistence using `localStorage`

- **Smart Navigation**
  - Sidebar with sections: Leads, Actions, Employees, Salaries
  - **Leads dropdown** in the sidebar listing all leads
    - Clicking a lead opens a **Lead Details** modal
  - **Employees dropdown** listing all employees
    - Clicking an employee opens an **Employee Details** modal

- **Tables & UX**
  - Powered by **@tanstack/react-table**
  - Column sorting with visual indicators
  - Global search and page‑size selector
  - Empty‑state and loading spinners for better feedback

- **Data Fetching**
  - **@tanstack/react-query** for caching and mutations
  - Mock API layer in `src/api/mockApi.js`

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite
- **State / Data**: @tanstack/react-query, @tanstack/react-table, @tanstack/react-router
- **Styling**: Tailwind CSS utility classes
- **Icons**: `react-icons`
- **Persistence**: Browser `localStorage` via the mock API

---

## 🚀 Getting Started

From the `project` folder:

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (by default `http://localhost:5173`).

---

## 📂 Key Project Structure

- `src/main.jsx` – React entry, router setup
- `src/layouts/RootLayout.jsx` – Shell layout (sidebar, header, breadcrumbs, modals)
- `src/components/DataTable.jsx` – Reusable data table with search/sort/pagination
- `src/components/Modal.jsx` – Generic modal used across pages
- `src/api/mockApi.js` – Mock API with localStorage persistence
- `src/data/mockData.js` – Seed data for all entities
- `src/pages/leads.jsx` – Leads listing & modal form
- `src/pages/actions.jsx` – Actions listing & modal form
- `src/pages/employees.jsx` – Employees listing & modal form
- `src/pages/employees-salaries.jsx` – Salary listing, summary cards, filters & CSV export

---

## 💡 Notes & Customization

- To **reset all data** back to the original mock values, clear this app’s `localStorage` in your browser dev tools.
- The mock API includes small artificial delays and optional random errors to simulate a real backend.
- You can swap the mock API implementation in `src/api/mockApi.js` with real HTTP calls (e.g., using Axios) without changing the page components.

---

## 🧪 Linting & Scripts

Useful npm scripts:

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint over the project

import { 
  mockLeads as seedLeads, 
  mockActions as seedActions, 
  mockEmployees as seedEmployees, 
  mockEmployeeSalaries as seedEmployeeSalaries 
} from '../data/mockData.js';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random error (optional)
const simulateError = (probability = 0.1) => {
  if (Math.random() < probability) {
    throw new Error('Simulated API error');
  }
};

// Local storage helpers
const STORAGE_KEYS = {
  leads: 'leads',
  actions: 'actions',
  employees: 'employees',
  employeeSalaries: 'employeeSalaries',
};

const isBrowser = typeof window !== 'undefined';

const readFromStorage = (key, seed) => {
  if (!isBrowser) return [...seed];
  try {
    const stored = window.localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    window.localStorage.setItem(key, JSON.stringify(seed));
    return [...seed];
  } catch {
    return [...seed];
  }
};

const writeToStorage = (key, value) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
};

export const mockApi = {
  // Leads endpoints
  leads: {
    getAll: async () => {
      await delay(500); // Simulate network delay
      simulateError(0.05); // 5% chance of error
      const leads = readFromStorage(STORAGE_KEYS.leads, seedLeads);
      return [...leads];
    },
    getById: async (id) => {
      await delay(300);
      const leads = readFromStorage(STORAGE_KEYS.leads, seedLeads);
      const lead = leads.find(l => l.id === id);
      if (!lead) throw new Error('Lead not found');
      return { ...lead };
    },
    create: async (data) => {
      await delay(600);
      const leads = readFromStorage(STORAGE_KEYS.leads, seedLeads);
      const newLead = {
        id: String(leads.length + 1),
        ...data,
        created_at: new Date().toISOString()
      };
      const updated = [...leads, newLead];
      writeToStorage(STORAGE_KEYS.leads, updated);
      return { ...newLead };
    },
    update: async (id, data) => {
      await delay(400);
      const leads = readFromStorage(STORAGE_KEYS.leads, seedLeads);
      const index = leads.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Lead not found');
      const updatedLead = { ...leads[index], ...data };
      const updated = [...leads];
      updated[index] = updatedLead;
      writeToStorage(STORAGE_KEYS.leads, updated);
      return { ...updatedLead };
    },
    delete: async (id) => {
      await delay(300);
      const leads = readFromStorage(STORAGE_KEYS.leads, seedLeads);
      const index = leads.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Lead not found');
      const updated = leads.filter(l => l.id !== id);
      writeToStorage(STORAGE_KEYS.leads, updated);
      return { success: true };
    }
  },

  // Actions endpoints
  actions: {
    getAll: async () => {
      await delay(500);
      simulateError(0.05);
      const actions = readFromStorage(STORAGE_KEYS.actions, seedActions);
      return [...actions];
    },
    getById: async (id) => {
      await delay(300);
      const actions = readFromStorage(STORAGE_KEYS.actions, seedActions);
      const action = actions.find(a => a.id === id);
      if (!action) throw new Error('Action not found');
      return { ...action };
    },
    create: async (data) => {
      await delay(600);
      const actions = readFromStorage(STORAGE_KEYS.actions, seedActions);
      const newAction = {
        id: String(actions.length + 1),
        ...data,
        created_at: new Date().toISOString()
      };
      const updated = [...actions, newAction];
      writeToStorage(STORAGE_KEYS.actions, updated);
      return { ...newAction };
    },
    update: async (id, data) => {
      await delay(400);
      const actions = readFromStorage(STORAGE_KEYS.actions, seedActions);
      const index = actions.findIndex(a => a.id === id);
      if (index === -1) throw new Error('Action not found');
      const updatedAction = { ...actions[index], ...data };
      const updated = [...actions];
      updated[index] = updatedAction;
      writeToStorage(STORAGE_KEYS.actions, updated);
      return { ...updatedAction };
    },
    delete: async (id) => {
      await delay(300);
      const actions = readFromStorage(STORAGE_KEYS.actions, seedActions);
      const index = actions.findIndex(a => a.id === id);
      if (index === -1) throw new Error('Action not found');
      const updated = actions.filter(a => a.id !== id);
      writeToStorage(STORAGE_KEYS.actions, updated);
      return { success: true };
    }
  },

  // Employees endpoints
  employees: {
    getAll: async () => {
      await delay(500);
      simulateError(0.05);
      const employees = readFromStorage(STORAGE_KEYS.employees, seedEmployees);
      return [...employees];
    },
    getById: async (id) => {
      await delay(300);
      const employees = readFromStorage(STORAGE_KEYS.employees, seedEmployees);
      const employee = employees.find(e => e.id === id);
      if (!employee) throw new Error('Employee not found');
      return { ...employee };
    },
    create: async (data) => {
      await delay(600);
      const employees = readFromStorage(STORAGE_KEYS.employees, seedEmployees);
      const newEmployee = {
        id: String(employees.length + 1),
        ...data,
        hire_date: new Date().toISOString()
      };
      const updated = [...employees, newEmployee];
      writeToStorage(STORAGE_KEYS.employees, updated);
      return { ...newEmployee };
    },
    update: async (id, data) => {
      await delay(400);
      const employees = readFromStorage(STORAGE_KEYS.employees, seedEmployees);
      const index = employees.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Employee not found');
      const updatedEmployee = { ...employees[index], ...data };
      const updated = [...employees];
      updated[index] = updatedEmployee;
      writeToStorage(STORAGE_KEYS.employees, updated);
      return { ...updatedEmployee };
    },
    delete: async (id) => {
      await delay(300);
      const employees = readFromStorage(STORAGE_KEYS.employees, seedEmployees);
      const index = employees.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Employee not found');
      const updated = employees.filter(e => e.id !== id);
      writeToStorage(STORAGE_KEYS.employees, updated);
      return { success: true };
    }
  },

  // Employee salaries endpoints
  employeeSalaries: {
    getAll: async () => {
      await delay(500);
      simulateError(0.05);
      const salaries = readFromStorage(
        STORAGE_KEYS.employeeSalaries,
        seedEmployeeSalaries
      );
      return [...salaries];
    },
    getByEmployee: async (employeeId) => {
      await delay(300);
      const salaries = readFromStorage(
        STORAGE_KEYS.employeeSalaries,
        seedEmployeeSalaries
      ).filter(s => s.employee_id === employeeId);
      return [...salaries];
    },
    create: async (data) => {
      await delay(600);
      const salaries = readFromStorage(
        STORAGE_KEYS.employeeSalaries,
        seedEmployeeSalaries
      );
      const newSalary = {
        id: String(salaries.length + 1),
        ...data,
        net_salary: data.base_salary + (data.bonuses || 0) - (data.deductions || 0)
      };
      const updated = [...salaries, newSalary];
      writeToStorage(STORAGE_KEYS.employeeSalaries, updated);
      return { ...newSalary };
    },
    update: async (id, data) => {
      await delay(400);
      const salaries = readFromStorage(
        STORAGE_KEYS.employeeSalaries,
        seedEmployeeSalaries
      );
      const index = salaries.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Salary record not found');
      const current = salaries[index];
      const updatedRecord = { 
        ...current, 
        ...data,
        net_salary: (data.base_salary ?? current.base_salary) + 
                    (data.bonuses ?? current.bonuses) - 
                    (data.deductions ?? current.deductions)
      };
      const updated = [...salaries];
      updated[index] = updatedRecord;
      writeToStorage(STORAGE_KEYS.employeeSalaries, updated);
      return { ...updatedRecord };
    },
    delete: async (id) => {
      await delay(300);
      const salaries = readFromStorage(
        STORAGE_KEYS.employeeSalaries,
        seedEmployeeSalaries
      );
      const index = salaries.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Salary record not found');
      const updated = salaries.filter(s => s.id !== id);
      writeToStorage(STORAGE_KEYS.employeeSalaries, updated);
      return { success: true };
    }
  }
};
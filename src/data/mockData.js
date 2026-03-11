export const mockLeads = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    company: 'Tech Corp',
    status: 'new',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@startup.io',
    company: 'Innovation Labs',
    status: 'contacted',
    created_at: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@enterprise.com',
    company: 'Global Industries',
    status: 'qualified',
    created_at: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@techstart.com',
    company: 'NextGen Solutions',
    status: 'lost',
    created_at: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'd.wilson@corporation.com',
    company: 'Mega Corp',
    status: 'new',
    created_at: '2024-01-11T11:00:00Z'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.a@innovate.com',
    company: 'Creative Tech',
    status: 'contacted',
    created_at: '2024-01-10T13:30:00Z'
  }
];

export const mockActions = [
  {
    id: '1',
    title: 'Call John Smith',
    description: 'Follow up on product demo',
    due_date: '2024-01-20T10:00:00Z',
    assigned_to: 'Alice Cooper',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Send proposal to Sarah Johnson',
    description: 'Send customized proposal for enterprise plan',
    due_date: '2024-01-19T15:30:00Z',
    assigned_to: 'Bob Martin',
    status: 'completed'
  },
  {
    id: '3',
    title: 'Prepare quarterly review',
    description: 'Compile Q1 performance metrics',
    due_date: '2024-01-18T09:00:00Z',
    assigned_to: 'Carol White',
    status: 'overdue'
  },
  {
    id: '4',
    title: 'Update CRM records',
    description: 'Clean up duplicate entries',
    due_date: '2024-01-21T17:00:00Z',
    assigned_to: 'David Lee',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Schedule team meeting',
    description: 'Discuss project milestones',
    due_date: '2024-01-22T14:00:00Z',
    assigned_to: 'Eve Brown',
    status: 'pending'
  },
  {
    id: '6',
    title: 'Review employee timesheets',
    description: 'Approve pending timesheets',
    due_date: '2024-01-17T18:00:00Z',
    assigned_to: 'Frank Miller',
    status: 'completed'
  }
];

export const mockEmployees = [
  {
    id: '1',
    name: 'Alice Cooper',
    email: 'alice.cooper@company.com',
    department: 'Sales',
    position: 'Sales Manager',
    hire_date: '2022-03-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Bob Martin',
    email: 'bob.martin@company.com',
    department: 'Marketing',
    position: 'Marketing Specialist',
    hire_date: '2022-06-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol.white@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    hire_date: '2021-09-10T00:00:00Z'
  },
  {
    id: '4',
    name: 'David Lee',
    email: 'david.lee@company.com',
    department: 'HR',
    position: 'HR Coordinator',
    hire_date: '2023-01-05T00:00:00Z'
  },
  {
    id: '5',
    name: 'Eve Brown',
    email: 'eve.brown@company.com',
    department: 'Sales',
    position: 'Account Executive',
    hire_date: '2022-11-12T00:00:00Z'
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.miller@company.com',
    department: 'Engineering',
    position: 'Frontend Developer',
    hire_date: '2023-04-18T00:00:00Z'
  }
];

export const mockEmployeeSalaries = [
  {
    id: '1',
    employee_id: '1',
    employee_name: 'Alice Cooper',
    base_salary: 75000,
    bonuses: 5000,
    deductions: 2000,
    net_salary: 78000,
    month: 'January',
    year: 2024
  },
  {
    id: '2',
    employee_id: '2',
    employee_name: 'Bob Martin',
    base_salary: 65000,
    bonuses: 3000,
    deductions: 1800,
    net_salary: 66200,
    month: 'January',
    year: 2024
  },
  {
    id: '3',
    employee_id: '3',
    employee_name: 'Carol White',
    base_salary: 95000,
    bonuses: 8000,
    deductions: 2500,
    net_salary: 100500,
    month: 'January',
    year: 2024
  },
  {
    id: '4',
    employee_id: '4',
    employee_name: 'David Lee',
    base_salary: 55000,
    bonuses: 2000,
    deductions: 1500,
    net_salary: 55500,
    month: 'January',
    year: 2024
  },
  {
    id: '5',
    employee_id: '5',
    employee_name: 'Eve Brown',
    base_salary: 62000,
    bonuses: 3500,
    deductions: 1700,
    net_salary: 63800,
    month: 'January',
    year: 2024
  },
  {
    id: '6',
    employee_id: '6',
    employee_name: 'Frank Miller',
    base_salary: 72000,
    bonuses: 4000,
    deductions: 1900,
    net_salary: 74100,
    month: 'January',
    year: 2024
  },
  {
    id: '7',
    employee_id: '1',
    employee_name: 'Alice Cooper',
    base_salary: 75000,
    bonuses: 4500,
    deductions: 2000,
    net_salary: 77500,
    month: 'February',
    year: 2024
  },
  {
    id: '8',
    employee_id: '2',
    employee_name: 'Bob Martin',
    base_salary: 65000,
    bonuses: 3200,
    deductions: 1800,
    net_salary: 66400,
    month: 'February',
    year: 2024
  }
  
];
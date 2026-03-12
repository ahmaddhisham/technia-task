import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '../components/DataTable';
import { mockApi } from '../api/mockApi';
import { mockEmployees } from '../data/mockData.js';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal } from '../components/Modal';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = [currentYear - 1, currentYear, currentYear + 1];

export function EmployeeSalariesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingSalary, setEditingSalary] = useState(null);
  const [filterEmployee, setFilterEmployee] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  
  const queryClient = useQueryClient();

  const { data: salaries = [], isLoading, error } = useQuery({
    queryKey: ['employee-salaries'],
    queryFn: mockApi.employeeSalaries.getAll,
  });

  const createMutation = useMutation({
    mutationFn: mockApi.employeeSalaries.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['employee-salaries']);
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => mockApi.employeeSalaries.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['employee-salaries']);
      setEditingSalary(null);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: mockApi.employeeSalaries.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['employee-salaries']);
    },
  });

  // Filter salaries based on selected filters
  const filteredSalaries = salaries.filter(salary => {
    if (filterEmployee !== 'all' && salary.employee_id !== filterEmployee) return false;
    if (filterMonth !== 'all' && salary.month !== filterMonth) return false;
    if (filterYear !== 'all' && salary.year !== parseInt(filterYear)) return false;
    return true;
  });

  // Calculate summary statistics
  const summary = filteredSalaries.reduce((acc, salary) => {
    acc.totalBase += salary.base_salary || 0;
    acc.totalBonuses += salary.bonuses || 0;
    acc.totalDeductions += salary.deductions || 0;
    acc.totalNet += salary.net_salary || 0;
    return acc;
  }, { totalBase: 0, totalBonuses: 0, totalDeductions: 0, totalNet: 0 });

  const handleEdit = (salary) => {
    setEditingSalary(salary);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      deleteMutation.mutate(id);
    }
  };

  const columns = [
    {
      accessorKey: 'employee_name',
      header: 'Employee',
    },
    {
      accessorKey: 'base_salary',
      header: 'Base Salary',
      cell: ({ getValue }) => {
        const value = getValue();
        return `$${value?.toLocaleString() || 0}`;
      },
    },
    {
      accessorKey: 'bonuses',
      header: 'Bonuses',
      cell: ({ getValue }) => {
        const value = getValue();
        return `$${value?.toLocaleString() || 0}`;
      },
    },
    {
      accessorKey: 'deductions',
      header: 'Deductions',
      cell: ({ getValue }) => {
        const value = getValue();
        return `$${value?.toLocaleString() || 0}`;
      },
    },
    {
      accessorKey: 'net_salary',
      header: 'Net Salary',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span className="font-semibold text-green-600">
            ${value?.toLocaleString() || 0}
          </span>
        );
      },
    },
    {
      accessorKey: 'month',
      header: 'Month',
    },
    {
      accessorKey: 'year',
      header: 'Year',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const employeeId = formData.get('employee_id');
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    
    const baseSalary = parseFloat(formData.get('base_salary')) || 0;
    const bonuses = parseFloat(formData.get('bonuses')) || 0;
    const deductions = parseFloat(formData.get('deductions')) || 0;
    
    const data = {
      employee_id: employeeId,
      employee_name: employee ? employee.name : '',
      base_salary: baseSalary,
      bonuses: bonuses,
      deductions: deductions,
      month: formData.get('month'),
      year: parseInt(formData.get('year')),
    };

    if (editingSalary) {
      updateMutation.mutate({ id: editingSalary.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const resetFilters = () => {
    setFilterEmployee('all');
    setFilterMonth('all');
    setFilterYear('all');
  };

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading salaries: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Employee Salaries</h1>
        <button
          onClick={() => {
            setEditingSalary(null);
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'Add Salary Record'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-600">Total Base Salary</p>
          <p className="text-xl font-bold">${summary.totalBase.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-600">Total Bonuses</p>
          <p className="text-xl font-bold text-green-600">${summary.totalBonuses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-600">Total Deductions</p>
          <p className="text-xl font-bold text-red-600">${summary.totalDeductions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-600">Total Net Payroll</p>
          <p className="text-xl font-bold text-blue-600">${summary.totalNet.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-medium mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <select
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="all">All Employees</option>
              {mockEmployees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="all">All Months</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingSalary(null);
        }}
        title={editingSalary ? 'Edit Salary Record' : 'Add New Salary Record'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee</label>
              <select
                name="employee_id"
                defaultValue={editingSalary?.employee_id}
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Employee</option>
                {mockEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Month</label>
              <select
                name="month"
                defaultValue={editingSalary?.month}
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Month</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <select
                name="year"
                defaultValue={editingSalary?.year || currentYear}
                required
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Base Salary ($)</label>
              <input
                type="number"
                name="base_salary"
                defaultValue={editingSalary?.base_salary}
                required
                min="0"
                step="100"
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bonuses ($)</label>
              <input
                type="number"
                name="bonuses"
                defaultValue={editingSalary?.bonuses || 0}
                min="0"
                step="100"
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deductions ($)</label>
              <input
                type="number"
                name="deductions"
                defaultValue={editingSalary?.deductions || 0}
                min="0"
                step="100"
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
              disabled={createMutation.isLoading || updateMutation.isLoading}
            >
              {editingSalary ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingSalary(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Salary Records Table */}
      <DataTable 
        data={filteredSalaries} 
        columns={columns}
        loading={isLoading} 
      />

      {/* Export Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            const csvContent = [
              ['Employee', 'Base Salary', 'Bonuses', 'Deductions', 'Net Salary', 'Month', 'Year'].join(','),
              ...filteredSalaries.map(s => 
                [
                  s.employee_name,
                  s.base_salary,
                  s.bonuses,
                  s.deductions,
                  s.net_salary,
                  s.month,
                  s.year
                ].join(',')
              )
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `salaries_${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
}
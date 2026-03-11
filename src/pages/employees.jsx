import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '../components/DataTable';
import { mockApi } from '../api/mockApi';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'hire_date',
    header: 'Hire Date',
    cell: ({ getValue }) => {
      const date = getValue();
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => row.original.onEdit?.(row.original)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => row.original.onDelete?.(row.original.id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    ),
  },
];

export function EmployeesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const queryClient = useQueryClient();

  const { data: employees = [], isLoading, error } = useQuery({
    queryKey: ['employees'],
    queryFn: mockApi.employees.getAll,
  });

  const createMutation = useMutation({
    mutationFn: mockApi.employees.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => mockApi.employees.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
      setEditingEmployee(null);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: mockApi.employees.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      department: formData.get('department'),
      position: formData.get('position'),
      hire_date: new Date(formData.get('hire_date')).toISOString(),
    };

    if (editingEmployee) {
      updateMutation.mutate({ id: editingEmployee.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Add onEdit and onDelete handlers to each employee row
  const employeesWithHandlers = employees.map(employee => ({
    ...employee,
    onEdit: handleEdit,
    onDelete: handleDelete
  }));

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading employees: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'Add New Employee'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-medium mb-4">
            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={editingEmployee?.name}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={editingEmployee?.email}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                defaultValue={editingEmployee?.department}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                defaultValue={editingEmployee?.position}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hire Date</label>
              <input
                type="date"
                name="hire_date"
                defaultValue={editingEmployee?.hire_date?.split('T')[0]}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={createMutation.isLoading || updateMutation.isLoading}
              >
                {createMutation.isLoading || updateMutation.isLoading ? 'Saving...' : (editingEmployee ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingEmployee(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <DataTable 
        data={employeesWithHandlers} 
        columns={columns} 
        loading={isLoading} 
      />
    </div>
  );
}
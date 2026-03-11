import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '../components/DataTable';
import { mockApi } from '../api/mockApi';
import { mockEmployees } from '../data/mockData.js';

const columns = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'due_date',
    header: 'Due Date',
    cell: ({ getValue }) => {
      const date = getValue();
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
  },
  {
    accessorKey: 'assigned_to',
    header: 'Assigned To',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue();
      const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-green-100 text-green-800',
        overdue: 'bg-red-100 text-red-800',
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
          {status}
        </span>
      );
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

export function ActionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingAction, setEditingAction] = useState(null);
  const queryClient = useQueryClient();

  const { data: actions = [], isLoading, error } = useQuery({
    queryKey: ['actions'],
    queryFn: mockApi.actions.getAll,
  });

  const createMutation = useMutation({
    mutationFn: mockApi.actions.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['actions']);
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => mockApi.actions.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['actions']);
      setEditingAction(null);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: mockApi.actions.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['actions']);
    },
  });

  const handleEdit = (action) => {
    setEditingAction(action);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this action?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      due_date: new Date(formData.get('due_date')).toISOString(),
      assigned_to: formData.get('assigned_to'),
      status: formData.get('status'),
    };

    if (editingAction) {
      updateMutation.mutate({ id: editingAction.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Add onEdit and onDelete handlers to each action
  const actionsWithHandlers = actions.map(action => ({
    ...action,
    onEdit: handleEdit,
    onDelete: handleDelete
  }));

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading actions: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Actions</h1>
        <button
          onClick={() => {
            setEditingAction(null);
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-600 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Action'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-medium mb-4">
            {editingAction ? 'Edit Action' : 'Add New Action'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={editingAction?.title}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                defaultValue={editingAction?.description}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="due_date"
                defaultValue={editingAction?.due_date?.split('T')[0]}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
              <select
                name="assigned_to"
                defaultValue={editingAction?.assigned_to}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Employee</option>
                {mockEmployees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                defaultValue={editingAction?.status || 'pending'}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={createMutation.isLoading || updateMutation.isLoading}
              >
                {createMutation.isLoading || updateMutation.isLoading ? 'Saving...' : (editingAction ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAction(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <DataTable 
        data={actionsWithHandlers} 
        columns={columns} 
        loading={isLoading} 
      />
    </div>
  );
}
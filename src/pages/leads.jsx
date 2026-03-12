import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '../components/DataTable';
import { mockApi } from '../api/mockApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal } from '../components/Modal';

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
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue();
      const colors = {
        new: 'bg-blue-100 text-blue-800',
        contacted: 'bg-yellow-100 text-yellow-800',
        qualified: 'bg-green-100 text-green-800',
        lost: 'bg-red-100 text-red-800',
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
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
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => row.original.onDelete?.(row.original.id)}
          className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
        >
          <FaTrash />
        </button>
      </div>
    ),
  },
];

export function LeadsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: mockApi.leads.getAll,
  });

  const createMutation = useMutation({
    mutationFn: mockApi.leads.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => mockApi.leads.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
      setEditingLead(null);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: mockApi.leads.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
    },
  });

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      status: formData.get('status'),
    };

    if (editingLead) {
      updateMutation.mutate({ id: editingLead.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Add onEdit and onDelete handlers to each lead
  const leadsWithHandlers = leads.map(lead => ({
    ...lead,
    onEdit: handleEdit,
    onDelete: handleDelete
  }));

  const totalLeads = leads.length;
  const statusCounts = leads.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    },
    {}
  );

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading leads: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your sales pipeline from new leads to closed deals.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingLead(null);
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-xl cursor-pointer"
        >
          {showForm ? 'Cancel' : 'Add New Lead'}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Total Leads
          </p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{totalLeads}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            New
          </p>
          <p className="mt-2 text-xl font-semibold text-blue-700">
            {statusCounts.new || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4">
          <p className="text-xs font-medium text-green-600 uppercase tracking-wide">
            Qualified
          </p>
          <p className="mt-2 text-xl font-semibold text-green-700">
            {statusCounts.qualified || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4">
          <p className="text-xs font-medium text-yellow-600 uppercase tracking-wide">
            Contacted
          </p>
          <p className="mt-2 text-xl font-semibold text-yellow-700">
            {statusCounts.contacted || 0}
          </p>
        </div>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingLead(null);
        }}
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingLead?.name}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={editingLead?.email}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              defaultValue={editingLead?.company}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              defaultValue={editingLead?.status || 'new'}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              disabled={createMutation.isLoading || updateMutation.isLoading}
            >
              {createMutation.isLoading || updateMutation.isLoading ? 'Saving...' : (editingLead ? 'Update' : 'Create')}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingLead(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <DataTable 
        data={leadsWithHandlers} 
        columns={columns} 
        loading={isLoading} 
      />
    </div>
  );
}
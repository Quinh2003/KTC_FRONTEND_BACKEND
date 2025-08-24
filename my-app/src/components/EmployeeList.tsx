
import { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeApi';
import type { Employee } from '../types/employee';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  onEdit: (employee: Employee) => void;
}

export default function EmployeeList({ onEdit }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    getEmployees()
      .then(setEmployees)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await deleteEmployee(id);
      fetchData();
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) return <div className="text-center py-12 text-xl text-indigo-400 animate-pulse">Loading employees...</div>;
  if (error) return <div className="text-center py-6 text-red-600 font-bold text-lg">{error}</div>;

  return (
    <div className="overflow-x-auto mt-2 animate-fade-in">
      <table className="min-w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        <thead className="bg-gradient-to-r from-indigo-100 to-blue-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-indigo-700">ID</th>
            <th className="px-4 py-3 text-left font-semibold text-indigo-700">Full Name</th>
            <th className="px-4 py-3 text-left font-semibold text-indigo-700">Email</th>
            <th className="px-4 py-3 text-left font-semibold text-indigo-700">Phone</th>
            <th className="px-4 py-3 text-left font-semibold text-indigo-700">Gender</th>
            <th className="px-4 py-3 text-left font-semibold text-indigo-700">DOB</th>
            <th className="px-4 py-3 text-left font-semibold text-indigo-700">Active</th>
            <th className="px-4 py-3 text-center font-semibold text-indigo-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-8 text-gray-400 text-lg">No employees found.</td>
            </tr>
          ) : employees.map(emp => (
            <tr key={emp.id} className="border-t hover:bg-indigo-50/60 transition group">
              <td className="px-4 py-3 text-gray-700 font-semibold">{emp.id}</td>
              <td className="px-4 py-3 font-bold text-indigo-800 group-hover:underline">{emp.fullName}</td>
              <td className="px-4 py-3 text-gray-600">{emp.email}</td>
              <td className="px-4 py-3 text-gray-600">{emp.phoneNumber}</td>
              <td className="px-4 py-3 text-gray-600 capitalize">{emp.gender.toLowerCase()}</td>
              <td className="px-4 py-3 text-gray-600">{emp.dateOfBirth}</td>
              <td className="px-4 py-3">
                <span className={emp.active ? "inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-bold shadow-sm" : "inline-block px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-500 font-bold shadow-sm"}>
                  {emp.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(emp)}
                  className="p-2 rounded-full bg-blue-50 hover:bg-blue-200 text-blue-700 shadow transition"
                  title="Edit"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="p-2 rounded-full bg-red-50 hover:bg-red-200 text-red-700 shadow transition"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

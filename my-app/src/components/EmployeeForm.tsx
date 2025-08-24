
import { useState, useEffect } from 'react';
import type { Employee, EmployeeCreateRequest } from '../types/employee';
import { createEmployee, updateEmployee } from '../api/employeeApi';
import { UserPlus, Save, XCircle } from 'lucide-react';

interface Props {
  employee?: Employee | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const initialForm: EmployeeCreateRequest = {
  fullName: '',
  email: '',
  dateOfBirth: '',
  gender: 'MALE',
  phoneNumber: '',
  password: '',
  active: true,
};

export default function EmployeeForm({ employee, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<EmployeeCreateRequest>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setForm({
        fullName: employee.fullName,
        email: employee.email,
        dateOfBirth: employee.dateOfBirth,
        gender: employee.gender,
        phoneNumber: employee.phoneNumber,
        password: '', // Không show password cũ
        active: employee.active,
      });
    } else {
      setForm(initialForm);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (employee) {
        // Chỉ gửi password nếu người dùng nhập vào
        const updateData: any = { ...form };
        if (!form.password) {
          delete updateData.password;
        }
        await updateEmployee(employee.id, updateData);
      } else {
        await createEmployee(form);
      }
      onSuccess();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
  className="max-w-xl mx-auto bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl p-6 border border-indigo-100 animate-fade-in"
    >
  <div className="flex items-center gap-2 mb-5">
        <UserPlus className="text-indigo-500 drop-shadow" size={32} />
  <h2 className="text-xl md:text-2xl font-extrabold text-indigo-700 tracking-tight">
          {employee ? 'Edit Employee' : 'Add Employee'}
        </h2>
      </div>
      {error && <div className="mb-4 text-red-600 font-bold text-lg animate-shake">{error}</div>}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-2">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-800 text-base shadow-sm"
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-2">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            disabled={!!employee}
            className="w-full px-4 py-2 border-2 border-indigo-100 rounded-lg bg-gray-100 text-gray-500 text-base shadow-sm"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-2">Phone Number</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            pattern="^\d{10}$"
            className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-800 text-base shadow-sm"
            placeholder="0123456789"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-2">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!employee}
              type="password"
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-800 text-base shadow-sm"
              placeholder={employee ? 'Enter new password' : ''}
            />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-2">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-800 text-base shadow-sm"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-2">Date of Birth</label>
          <input
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
            type="date"
            className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-800 text-base shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-2">Active</label>
          <select
            name="active"
            value={form.active ? 'true' : 'false'}
            onChange={e => setForm(f => ({ ...f, active: e.target.value === 'true' }))}
            required
            className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-800 text-base shadow-sm"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>
  <div className="flex gap-3 mt-7 justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold px-5 py-2 rounded-lg shadow transition text-base disabled:opacity-60"
        >
          <Save size={18} />
          {employee ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-lg shadow transition text-base"
        >
          <XCircle size={18} />
          Cancel
        </button>
      </div>
    </form>
  );
}

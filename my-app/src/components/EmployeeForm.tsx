import { useState, useEffect } from "react"
import type { Employee, EmployeeCreateRequest } from "../types/employee"
import { createEmployee, updateEmployee } from "../api/employeeApi"

interface Props {
  employee?: Employee | null
  onSuccess: () => void
  onCancel: () => void
}

const initialForm: EmployeeCreateRequest = {
  fullName: "",
  email: "",
  dateOfBirth: "",
  gender: "MALE",
  phoneNumber: "",
  password: "",
  active: true,
}

export default function EmployeeForm({ employee, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<EmployeeCreateRequest>(initialForm)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!employee) {
      setForm({ ...initialForm })
    } else {
      setForm({
        fullName: employee.fullName,
        email: employee.email,
        dateOfBirth: employee.dateOfBirth,
        gender: employee.gender,
        phoneNumber: employee.phoneNumber,
        password: "",
        active: employee.active,
      })
    }
  }, [employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (employee) {
        const updateData: any = { ...form }
        if (!form.password) {
          delete updateData.password
        }
        await updateEmployee(employee.id, updateData)
      } else {
        await createEmployee(form)
      }
      onSuccess()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-purple-200 p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-100 rounded-xl">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-purple-800">{employee ? "Edit Employee" : "Add Employee"}</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium animate-shake">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              disabled={!!employee}
              autoComplete="off"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-100 text-slate-500 transition-all duration-200"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Phone Number</label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              pattern="^\d{10}$"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200"
              placeholder="0123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!employee}
              type="password"
              autoComplete="new-password"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200"
              placeholder={employee ? "Enter new password" : "Enter password"}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Date of Birth</label>
            <input
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
              type="date"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-purple-700 mb-2">Status</label>
            <select
              name="active"
              value={form.active ? "true" : "false"}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.value === "true" }))}
              required
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:transform-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {loading ? "Saving..." : employee ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  )
}

import { useEffect, useState } from "react"
import { getEmployeesPaginated, deleteEmployee } from "../api/employeeApi"
import type { Employee, PaginatedEmployeeResponse } from "../types/employee"

interface Props {
  onEdit: (employee: Employee) => void
}

export default function EmployeeList({ onEdit }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const pageSize = 4

  const fetchData = (pageNum = page) => {
    setLoading(true)
    getEmployeesPaginated(pageNum, pageSize)
      .then((res: PaginatedEmployeeResponse) => {
        setEmployees(res.data)
        setTotalPages(res.totalPages)
        setHasNext(res.hasNext)
        setHasPrevious(res.hasPrevious)
        setPage(res.pageNumber)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return
    try {
      await deleteEmployee(id)
      fetchData(page)
    } catch (e: any) {
      setError(e.message)
    }
  }

  if (loading)
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center gap-3 text-purple-600">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
          <span className="text-lg font-medium">Loading employees...</span>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="text-center py-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium">
        {error}
      </div>
    )

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h3 className="text-xl font-black text-purple-800 mb-2">Employee List</h3>
      </div>

      <div className="overflow-x-auto rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50/80">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-purple-100 via-pink-50 to-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-purple-700 text-sm uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left font-semibold text-purple-700 text-sm uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-4 text-left font-semibold text-purple-700 text-sm uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left font-semibold text-purple-700 text-sm uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left font-semibold text-purple-700 text-sm uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-4 text-left font-semibold text-purple-700 text-sm uppercase tracking-wider">
                DOB
              </th>
              <th className="px-6 py-4 text-left font-semibold text-purple-700 text-sm uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center font-semibold text-purple-700 text-sm uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-500 text-lg">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="w-12 h-12 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    No employees found
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((emp, index) => (
                <tr
                  key={emp.id}
                  className={`hover:bg-purple-100/40 transition-colors duration-200 ${index % 2 === 0 ? "bg-white/80" : "bg-purple-50/40"}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{emp.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-purple-700">{emp.fullName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{emp.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{emp.phoneNumber}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 capitalize">{emp.gender.toLowerCase()}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{emp.dateOfBirth}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        emp.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {emp.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => onEdit(emp)}
                        className="p-2 rounded-lg bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 hover:from-purple-300 hover:to-pink-200 text-purple-700 transition-colors duration-200 border border-purple-100"
                        title="Edit Employee"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="p-2 rounded-lg bg-gradient-to-br from-pink-100 via-white to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-600 transition-colors duration-200 border border-pink-100"
                        title="Delete Employee"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-100 via-pink-50 to-white text-purple-700 font-medium hover:from-purple-200 hover:to-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 border border-purple-100"
            onClick={() => setPage(page - 1)}
            disabled={!hasPrevious}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-purple-700 font-medium">
              Page {page + 1} of {totalPages}
            </span>
          </div>

          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-100 via-pink-50 to-white text-purple-700 font-medium hover:from-purple-200 hover:to-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 border border-purple-100"
            onClick={() => setPage(page + 1)}
            disabled={!hasNext}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

import { useState } from "react"
import EmployeeList from "./components/EmployeeList"
import EmployeeForm from "./components/EmployeeForm"
import type { Employee } from "./types/employee"
import "./App.css"

function App() {
  const [editing, setEditing] = useState<Employee | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleEdit = (emp: Employee) => {
    setEditing(emp)
    setShowForm(true)
  }
  const handleAdd = () => {
    setEditing(null)
    setShowForm(true)
  }
  const handleSuccess = () => {
    setShowForm(false)
    setEditing(null)
    setRefreshKey((k) => k + 1)
  }
  const handleCancel = () => {
    setShowForm(false)
    setEditing(null)
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-7xl mx-auto">
    <div className="bg-gradient-to-r from-purple-200 via-white to-pink-200 rounded-2xl border border-purple-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-purple-800 tracking-tight mb-2">Employee Management</h1>
            </div>
            <button
              onClick={handleAdd}
              className="text-purple-80 inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Employee
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8 animate-fade-in">
            <EmployeeForm
              key={editing ? editing.id : "add-" + refreshKey}
              employee={editing}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        )}

  <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-purple-200 p-8">
            <EmployeeList key={refreshKey} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  )
}

export default App

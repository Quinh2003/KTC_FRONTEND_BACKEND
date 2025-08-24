import { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import type { Employee } from "./types/employee";
import "./App.css";

function App() {
  const [editing, setEditing] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (emp: Employee) => {
    setEditing(emp);
    setShowForm(true);
  };
  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };
  const handleSuccess = () => {
    setShowForm(false);
    setEditing(null);
    setRefreshKey((k) => k + 1);
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-2xl p-10 border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight drop-shadow">
            Employee Management
          </h1>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition text-lg"
          >
            + Add Employee
          </button>
        </div>

        {showForm && (
  <div className="mb-8 animate-fade-in">
    <EmployeeForm
      key={editing ? editing.id : "add-" + refreshKey} // thêm refreshKey để reset
      employee={editing}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  </div>
)}

        {/* Key prop to force reload list after add/edit/delete */}
        <EmployeeList key={refreshKey} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default App;


import type { Employee, EmployeeCreateRequest, EmployeeUpdateRequest } from '../types/employee';

const API_URL = 'http://localhost:8080/api/employees';

export async function getEmployees(): Promise<Employee[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch employees');
  return res.json();
}

export async function getEmployee(id: number): Promise<Employee> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch employee');
  return res.json();
}

export async function createEmployee(data: EmployeeCreateRequest): Promise<Employee> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create employee');
  return res.json();
}

export async function updateEmployee(id: number, data: EmployeeUpdateRequest): Promise<Employee> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update employee');
  return res.json();
}

export async function deleteEmployee(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete employee');
}

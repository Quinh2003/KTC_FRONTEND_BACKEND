export interface PaginatedEmployeeResponse {
  data: Employee[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';


export interface Employee {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: string; // ISO string
  gender: Gender;
  phoneNumber: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface EmployeeCreateRequest {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  password: string;
  active: boolean;
}


export interface EmployeeUpdateRequest {
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: Gender;
  phoneNumber?: string;
  password?: string;
  active?: boolean;
}

export interface ErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}


import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { Employee, EmployeeCreateRequest } from "../types/employee"
import { createEmployee, updateEmployee } from "../api/employeeApi"

interface Props {
  employee?: Employee | null
  onSuccess: () => void
  onCancel: () => void
}


export default function EmployeeForm({ employee, onSuccess, onCancel }: Props) {
  // Validation schema must be inside component to access employee
  const validationSchema = yup.object({
    fullName: yup.string().required("Full name is required").min(2, "At least 2 characters").max(100, "Max 100 characters"),
    email: yup.string().required("Email is required").email("Invalid email address"),
    dateOfBirth: yup.string().required("Date of birth is required").matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
    gender: yup.string().oneOf(["MALE", "FEMALE", "OTHER"]).required("Gender is required"),
    phoneNumber: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be 10 digits"),
    password: employee
      ? yup.string().notRequired().default("")
      : yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
    active: yup.boolean().required(),
  }) as yup.ObjectSchema<EmployeeCreateRequest>;


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeCreateRequest>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      gender: "MALE",
      phoneNumber: "",
      password: "",
      active: true,
    },
  })

  useEffect(() => {
    if (employee) {
      reset({
        fullName: employee.fullName,
        email: employee.email,
        dateOfBirth: employee.dateOfBirth,
        gender: employee.gender,
        phoneNumber: employee.phoneNumber,
        password: "",
        active: employee.active,
      })
    } else {
      reset()
    }
  }, [employee, reset])

  const onSubmit = async (data: EmployeeCreateRequest) => {
    try {
      // Convert string to boolean for 'active' if needed
      const submitData = {
        ...data,
        active: typeof data.active === 'string' ? data.active === 'true' : !!data.active,
        password: data.password ?? ""
      };
      if (employee) {
        const updateData: any = { ...submitData }
        if (!submitData.password) delete updateData.password
        await updateEmployee(employee.id, updateData)
      } else {
        await createEmployee(submitData)
      }
      onSuccess()
    } catch (e: any) {
      alert(e.message)
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200 ${errors?.fullName ? 'border-red-500' : 'border-slate-200'}`}
              placeholder="Nguyễn Văn A"
            />
            {errors?.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              disabled={!!employee}
              autoComplete="off"
              className={`w-full px-4 py-3 border-2 rounded-xl bg-slate-100 text-slate-500 transition-all duration-200 ${errors?.email ? 'border-red-500' : 'border-slate-200'}`}
              placeholder="email@example.com"
            />
            {errors?.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber")}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200 ${errors?.phoneNumber ? 'border-red-500' : 'border-slate-200'}`}
              placeholder="0123456789"
            />
            {errors?.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Password</label>
            <input
              type="password"
              autoComplete="new-password"
              {...register("password")}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200 ${errors?.password ? 'border-red-500' : 'border-slate-200'}`}
              placeholder={employee ? "Enter new password" : "Enter password"}
            />
            {errors?.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Gender</label>
            <select
              {...register("gender")}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200 ${errors?.gender ? 'border-red-500' : 'border-slate-200'}`}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors?.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200 ${errors?.dateOfBirth ? 'border-red-500' : 'border-slate-200'}`}
            />
            {errors?.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-purple-700 mb-2">Status</label>
            <select
              {...register("active")}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50 text-slate-800 transition-all duration-200 ${errors?.active ? 'border-red-500' : 'border-slate-200'}`}
            >
              <option value={true as any}>Active</option>
              <option value={false as any}>Inactive</option>
            </select>
            {errors?.active && <p className="text-red-500 text-sm mt-1">{errors.active.message}</p>}
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
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:transform-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {isSubmitting ? "Saving..." : employee ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  )
}

package com.example.demo.service;

import com.example.demo.dto.EmployeeCreateRequest;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.EmployeeUpdateRequest;
import com.example.demo.entities.Employee;
import com.example.demo.handler.DuplicateEmailException;
import com.example.demo.handler.EmployeeNotFoundException;
import com.example.demo.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public EmployeeDTO createEmployee(EmployeeCreateRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists: " + request.getEmail());
        }
        Employee employee = new Employee();
        employee.setFullName(request.getFullName());
        employee.setEmail(request.getEmail());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setGender(request.getGender());
        employee.setPhoneNumber(request.getPhoneNumber());
        employee.setActive(request.getActive() != null ? request.getActive() : true);
        employee.setHashedPassword(passwordEncoder.encode(request.getPassword()));
        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDTO(savedEmployee);
    }

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
        return convertToDTO(employee);
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeUpdateRequest employee2) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
        if (employee2.getFullName() != null) {
            employee.setFullName(employee2.getFullName());
        }
        if (employee2.getDateOfBirth() != null) {
            employee.setDateOfBirth(employee2.getDateOfBirth());
        }
        if (employee2.getGender() != null) {
            employee.setGender(employee2.getGender());
        }
        if (employee2.getPhoneNumber() != null) {
            employee.setPhoneNumber(employee2.getPhoneNumber());
        }
        if (employee2.getActive() != null) {
            employee.setActive(employee2.getActive());
        }
        if (employee2.getPassword() != null) {
            employee.setHashedPassword(passwordEncoder.encode(employee2.getPassword()));
        }
        Employee updatedEmployee = employeeRepository.save(employee);
        return convertToDTO(updatedEmployee);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }
        employeeRepository.deleteById(id);
    }

    private EmployeeDTO convertToDTO(Employee employee) {
        return new EmployeeDTO(
                employee.getId(),
                employee.getFullName(),
                employee.getEmail(),
                employee.getDateOfBirth(),
                employee.getGender(),
                employee.getPhoneNumber(),
                employee.getActive(),
                employee.getCreatedAt(),
                employee.getUpdatedAt()
        );
    }
}

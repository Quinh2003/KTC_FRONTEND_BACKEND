package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;
import java.util.List;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Employee> findByPhoneNumber(String phoneNumber);

    List<Employee> findByActive(Boolean active);

    List<Employee> findByFullNameContainingIgnoreCase(String fullName);
    // Define query methods here
}

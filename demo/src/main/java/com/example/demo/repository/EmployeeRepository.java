package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Employee;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Employee> findByPhoneNumber(String phoneNumber);

    List<Employee> findByActive(Boolean active);

    List<Employee> findByFullNameContainingIgnoreCase(String fullName);
    Page<Employee> findAll(Pageable pageable);
    // Define query methods here
}

package com.example.demo.dto;

import java.time.LocalDate;

import com.example.demo.enums.Gender;

import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeUpdateRequest {

    @Size(min = 2, max = 100)
    private String fullName;

    @Past
    private LocalDate dateOfBirth;

    private Gender gender;

    @Pattern(regexp = "^\\d{10}$", message = "Số điện thoại phải gồm 10 chữ số")
    private String phoneNumber;

    private Boolean active = true;

    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    // Getters and Setters
}

package org.example.infrastructure.persistence;

import org.example.domain.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UniversityRepository extends JpaRepository<University, Long> {
    List<University> findByNameContaining(String name);
}

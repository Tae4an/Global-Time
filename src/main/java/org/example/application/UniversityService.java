package org.example.application;

import org.example.domain.University;
import org.example.infrastructure.persistence.UniversityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityService {
    private final UniversityRepository universityRepository;

    public UniversityService(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    public List<University> searchUniversity(String query) {
        if (query == null || query.isEmpty()) {
            return universityRepository.findAll();
        }
        return universityRepository.findByNameContaining(query);
    }
}

package org.example.presentation;

import org.example.application.UniversityService;
import org.example.domain.University;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UniversityController {
    private final UniversityService universityService;

    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping("/api/universities/search")
    public List<University> searchUniversities(@RequestParam(required = false) String query) {
        return universityService.searchUniversity(query);
    }
}

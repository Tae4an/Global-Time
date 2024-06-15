package org.example.presentation;

import org.example.application.NationalityService;
import org.example.domain.Nationality;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/nationalities")
public class NationalityController {
    private final NationalityService nationalityService;

    public NationalityController(NationalityService nationalityService) {
        this.nationalityService = nationalityService;
    }

    @GetMapping
    public List<Nationality> getAllNationalities() {
        return nationalityService.findAll();
    }

    @PostMapping
    public Nationality createNationality(@RequestBody Nationality nationality) {
        return nationalityService.save(nationality);
    }
}

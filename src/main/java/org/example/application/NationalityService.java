package org.example.application;

import org.example.domain.Nationality;
import org.example.infrastructure.persistence.NationalityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NationalityService {
    private final NationalityRepository nationalityRepository;

    public NationalityService(NationalityRepository nationalityRepository) {
        this.nationalityRepository = nationalityRepository;
    }

    public List<Nationality> findAll() {
        return nationalityRepository.findAll();
    }

    public Nationality save(Nationality nationality) {
        return nationalityRepository.save(nationality);
    }
}

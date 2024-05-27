package org.example.presentation;

import org.example.application.UniversityService;
import org.example.domain.University;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class UniversityController {


    private final UniversityService universityService;

    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping("/university/search")
    public String searchUniversity(@RequestParam(value = "query", required = false) String query, Model model) {
        List<University> universities = universityService.searchUniversity(query);
        model.addAttribute("universities", universities);
        return "university_search"; // 템플릿 이름
    }
}

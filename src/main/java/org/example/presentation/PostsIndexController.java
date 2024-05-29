package org.example.presentation;

import org.example.application.PostsService;
import org.example.application.dto.PostsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/search")
public class PostsIndexController {

    private final PostsService postsService;

    @GetMapping
    public Page<PostsDto.Response> search(@RequestParam String keyword, Pageable pageable) {
        return postsService.search(keyword, pageable);
    }
}

package org.example.presentation;

import org.example.application.PostsService;
import org.example.application.dto.PostsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostsApiController {

    private final PostsService postsService;

    @GetMapping
    public ResponseEntity<Page<PostsDto.Response>> list(@RequestParam(value = "page", defaultValue = "0") int page,
                                                        @RequestParam(value = "keyword", defaultValue = "") String keyword,
                                                        Pageable pageable) {
        Page<PostsDto.Response> postsPage = postsService.search(keyword, pageable);
        return ResponseEntity.ok(postsPage);
    }

    @PostMapping
    public ResponseEntity<Long> save(@RequestBody PostsDto.Request dto, @RequestParam("nickname") String nickname) {
        return ResponseEntity.ok(postsService.save(dto, nickname));
    }
}

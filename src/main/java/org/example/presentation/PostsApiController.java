package org.example.presentation;

import org.example.application.PostsService;
import org.example.application.dto.CommentDto;
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
    public ResponseEntity<Long> save(@RequestBody PostsDto.Request dto) {
        return ResponseEntity.ok(postsService.save(dto, dto.getWriter()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostsDto.Response> findById(@PathVariable Long id) {
        PostsDto.Response post = postsService.findById(id);
        return ResponseEntity.ok(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody PostsDto.Request dto) {
        postsService.update(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postsService.delete(id);
        return ResponseEntity.ok().build();
    }

    // 댓글 단일 조회 엔드포인트 추가
    @GetMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<CommentDto.Response> getComment(@PathVariable Long postId, @PathVariable Long commentId) {
        CommentDto.Response comment = postsService.findCommentById(commentId);
        return ResponseEntity.ok(comment);
    }
}

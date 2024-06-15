package org.example.application;

import org.example.application.dto.CommentDto;
import org.example.application.dto.PostsDto;
import org.example.domain.Posts;
import org.example.domain.User;
import org.example.infrastructure.persistence.CommentRepository;
import org.example.infrastructure.persistence.PostsRepository;
import org.example.infrastructure.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class PostsService {

    private final PostsRepository postsRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    /* CREATE */
    @Transactional
    public Long save(PostsDto.Request dto, String nickname) {
        /* User 정보를 가져와 dto에 담아준다. */
        User user = userRepository.findByNickname(nickname);
        dto.setUser(user);
        log.info("PostsService save() 실행");
        Posts posts = dto.toEntity();
        postsRepository.save(posts);

        return posts.getId();
    }
    /* READ */

    @Transactional(readOnly = true)
    public PostsDto.Response findById(Long id) {
        Posts posts = postsRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id: " + id));
        return new PostsDto.Response(posts);
    }
    /* UPDATE */

    @Transactional
    public void update(Long id, PostsDto.Request dto) {
        Posts posts = postsRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + id));
        posts.update(dto.getTitle(), dto.getContent());
    }
    /* DELETE */

    @Transactional
    public void delete(Long id) {
        Posts posts = postsRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + id));
        postsRepository.delete(posts);
    }
    /* Views Counting */

    @Transactional
    public int updateView(Long id) {
        return postsRepository.updateView(id);
    }
    /* Paging and Sort */

    @Transactional(readOnly = true)
    public Page<Posts> pageList(Pageable pageable) {
        return postsRepository.findAll(pageable);
    }
    /* search */

    @Transactional(readOnly = true)
    public Page<PostsDto.Response> search(String keyword, Pageable pageable) {
        Page<Posts> postsList = postsRepository.findByTitleContaining(keyword, pageable);
        return postsList.map(PostsDto.Response::new);
    }

    // 댓글 단일 조회 메서드 추가
    public CommentDto.Response findCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .map(CommentDto.Response::new)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글이 없습니다. id=" + commentId));
    }
}

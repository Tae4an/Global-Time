package org.example.domain;

import org.example.infrastructure.persistence.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @AfterEach
    public void clear() {
        userRepository.deleteAll();
    }

    @Test
    public void 유저_생성_가져오기() {
        String username = "Taesan";
        String rawPassword = "123!@#qwe";
        String encPassword = encoder.encode(rawPassword);
        userRepository.save(User.builder()
                .username(username)
                .password(encPassword)
                .nickname("태산")
                .email("xotks7524@naver.com")
                .role(Role.USER)
                .nationality("Korean") // nationality 설정
                .university("Seoul University") // university 설정
                .build());

        List<User> userList = userRepository.findAll();

        User user = userList.get(0);

        assertThat(user.getUsername()).isEqualTo(username);
        assertThat(user.getPassword()).isEqualTo(encPassword);
    }
}

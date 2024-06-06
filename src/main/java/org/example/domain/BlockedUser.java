package org.example.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "blocked_user")
public class BlockedUser extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "blocked_username", nullable = false, length = 255)
    private String blockedUsername;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "nickname", nullable = false, length = 255)
    private String nickname;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "block_username", nullable = false, length = 255)
    private String blockUsername;

    @Column(name = "blocked_date", nullable = false)
    @CreatedDate
    private String blockedDate;

    @OneToOne
    @JoinColumn(name = "block_username", referencedColumnName = "username", insertable = false, updatable = false)
    private User user;

}

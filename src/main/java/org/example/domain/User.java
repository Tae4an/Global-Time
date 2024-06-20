package org.example.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30, unique = true)
    private String username; // 아이디

    @Column(nullable = false, length = 30)
    private String realName; // 실명

    @Column(nullable = false, length = 30)
    private String department; // 학과

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(length = 100)
    private String password;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false)
    private String university; // 대학교 필드 추가

    @Column(nullable = false)
    private String nationality; // 국적 필드 추가

    @Lob
    @Column(nullable = true)
    private byte[] studentCard; // 학생증 이미지 Blob 데이터 추가

    @Column(nullable = false)
    private boolean verified; // 인증 여부 필드 추가


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    /* 회원정보 수정 */
    public void modify(String nickname, String password, String university, String nationality, String department) {
        this.nickname = nickname;
        this.password = password;
        this.university = university;
        this.nationality = nationality;
        this.department = department;
    }

    /* 학생증 데이터 설정 */
    public void setStudentCard(byte[] studentCard) {
        this.studentCard = studentCard;
    }
    /* 인증 여부 설정 */
    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    /* 소셜로그인시 이미 등록된 회원이라면 수정날짜만 업데이트해줘서
     * 기존 데이터를 보존하도록 예외처리 */
    public User updateModifiedDate() {
        this.onPreUpdate();
        return this;
    }

    public String getRoleValue() {
        return this.role.getValue();
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}

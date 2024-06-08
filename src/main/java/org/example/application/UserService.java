package org.example.application;

import org.example.application.dto.UserDto;
import org.example.domain.User;
import org.example.infrastructure.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Transactional
    public void userJoin(UserDto.Request dto, MultipartFile studentCardFile) throws IOException {
        String studentCardUrl = saveStudentCard(studentCardFile);
        dto.setPassword(encoder.encode(dto.getPassword()));
        User user = dto.toEntity();
        user.setStudentCardUrl(studentCardUrl);
        user.setVerified(false); // 초기값은 인증되지 않음으로 설정
        userRepository.save(user);
    }

    private String saveStudentCard(MultipartFile file) throws IOException {
        // 파일 저장 로직 (예: S3 또는 로컬 파일 시스템)
        return "savedFilePath"; // 저장된 파일의 경로 반환
    }

    @Transactional(readOnly = true)
    public Map<String, String> validateHandling(Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }
        return validatorResult;
    }

    @Transactional
    public void modify(UserDto.Request dto) {
        User user = userRepository.findById(dto.toEntity().getId()).orElseThrow(() ->
                new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        String encPassword = encoder.encode(dto.getPassword());
        user.modify(dto.getNickname(), encPassword, dto.getUniversity(), dto.getNationality(), dto.getDepartment());
    }

    @Transactional
    public void verifyStudent(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
        user.setVerified(true);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public boolean checkUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    @Transactional(readOnly = true)
    public boolean checkNicknameExists(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}

package org.example.presentation;

import org.example.application.UserService;
import lombok.RequiredArgsConstructor;
import org.example.application.dto.UserDto;
import org.example.application.validator.CustomValidators;
import org.example.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Map;

/**
 * 회원 관련 Controller
 */
@RequiredArgsConstructor
@Controller
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final CustomValidators.EmailValidator EmailValidator;
    private final CustomValidators.NicknameValidator NicknameValidator;
    private final CustomValidators.UsernameValidator UsernameValidator;

    @InitBinder
    public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(EmailValidator);
        binder.addValidators(NicknameValidator);
        binder.addValidators(UsernameValidator);
    }

    @PostMapping("/auth/joinProc")
    @ResponseBody
    public ResponseEntity<?> joinProc(@Valid @RequestPart("user") UserDto.Request dto, @RequestPart("studentCard") MultipartFile studentCardFile, Errors errors) throws IOException {
        if (errors.hasErrors()) {
            Map<String, String> validatorResult = userService.validateHandling(errors);
            return ResponseEntity.badRequest().body(validatorResult);
        }
        userService.userJoin(dto, studentCardFile);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/auth/modify")
    public ResponseEntity<?> modifyUser(@RequestBody UserDto.ModifyRequest dto) {
        try {
            userService.modifyUser(dto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("auth Modify ErrorMessage :" + e);
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/auth/checkUsername")
    @ResponseBody
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        boolean exists = userService.checkUsernameExists(username);
        return ResponseEntity.ok(Map.of("available", !exists));
    }

    @GetMapping("/auth/checkNickname")
    @ResponseBody
    public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
        boolean exists = userService.checkNicknameExists(nickname);
        return ResponseEntity.ok(Map.of("available", !exists));
    }

    @PostMapping("/auth/verifyStudent")
    @ResponseBody
    public ResponseEntity<?> verifyStudent(@RequestParam Long userId) {
        userService.verifyStudent(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
}

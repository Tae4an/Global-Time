package org.example.presentation;

import org.example.application.UserService;
import lombok.RequiredArgsConstructor;
import org.example.application.dto.UserDto;
import org.example.application.validator.CustomValidators;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
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
    public ResponseEntity<?> joinProc(@Valid @RequestBody UserDto.Request dto, Errors errors) {
        if (errors.hasErrors()) {
            Map<String, String> validatorResult = userService.validateHandling(errors);
            return ResponseEntity.badRequest().body(validatorResult);
        }
        userService.userJoin(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/auth/login")
    public String login() {
        return "forward:/index.html"; // 리액트 애플리케이션의 엔트리 포인트로 리디렉션
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/";
    }

    @GetMapping("/auth/modify")
    public String modify() {
        return "forward:/index.html"; // 리액트 애플리케이션의 엔트리 포인트로 리디렉션
    }
}

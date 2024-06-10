package org.example.presentation;

import lombok.RequiredArgsConstructor;
import org.example.application.UserService;
import org.example.application.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api")
public class AdminController {

    private final UserService userService;

    @GetMapping("/admin/users")
    @ResponseBody
    public ResponseEntity<List<UserDto.Response>> getUsersForApproval() {
        List<UserDto.Response> users = userService.getUsersForApproval();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/admin/approve/{userId}")
    @ResponseBody
    public ResponseEntity<?> approveUser(@PathVariable Long userId) {
        userService.verifyStudent(userId);
        return ResponseEntity.ok().build();
    }
}

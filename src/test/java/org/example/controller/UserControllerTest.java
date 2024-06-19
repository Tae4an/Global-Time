package org.example.controller;

import org.example.application.UserService;
import org.example.application.security.auth.CustomUserDetailsService;
import org.example.application.validator.CustomValidators;
import org.example.domain.User;
import org.example.infrastructure.persistence.UserRepository;
import org.example.presentation.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private CustomValidators.EmailValidator emailValidator;

    @MockBean
    private CustomValidators.NicknameValidator nicknameValidator;

    @MockBean
    private CustomValidators.UsernameValidator usernameValidator;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @BeforeEach
    public void setUp() {
        // Mock user details and password encoding
        User mockUser = new User();
        mockUser.setUsername("testuser");
        mockUser.setPassword(bCryptPasswordEncoder.encode("password"));
        when(userRepository.findByUsername("testuser")).thenReturn(java.util.Optional.of(mockUser));
    }

    @Test
    @WithMockUser
    public void whenInvalidInput_thenReturnsStatus400() throws Exception {
        mockMvc.perform(post("/api/auth/joinProc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"\", \"password\":\"short\", \"nickname\":\"\", \"email\":\"invalid email\", \"university\":\"\", \"nationality\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenValidLogin_thenReturnsStatus302() throws Exception {
        mockMvc.perform(post("/auth/loginProc")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username", "testuser")
                        .param("password", "password"))
                .andExpect(status().is3xxRedirection());
    }

    @Test
    public void whenInvalidLogin_thenReturnsStatus403() throws Exception {
        mockMvc.perform(post("/auth/loginProc")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username", "wronguser")
                        .param("password", "wrongpassword"))
                .andExpect(status().isForbidden());
    }
}

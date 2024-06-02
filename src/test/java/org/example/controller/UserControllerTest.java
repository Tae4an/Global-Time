package org.example.controller;

import org.example.application.UserService;
import org.example.application.validator.CustomValidators;
import org.example.presentation.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

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

    @Test
    @WithMockUser
    public void whenInvalidInput_thenReturnsStatus400() throws Exception {
        mockMvc.perform(post("/api/auth/joinProc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"\", \"password\":\"short\", \"nickname\":\"\", \"email\":\"invalid email\", \"university\":\"\", \"nationality\":\"\"}"))
                .andExpect(status().isBadRequest());
    }
}

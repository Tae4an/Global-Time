package org.example.application.security.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class CustomUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if ("application/json".equals(request.getContentType())) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, String> authRequestMap = objectMapper.readValue(request.getInputStream(), Map.class);
                String username = authRequestMap.get("username");
                String password = authRequestMap.get("password");

                // 디버깅 로그 추가
                System.out.println("Attempting authentication with username: " + username + " and password: " + password);

                UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
                setDetails(request, authRequest);
                return this.getAuthenticationManager().authenticate(authRequest);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            return super.attemptAuthentication(request, response);
        }
    }
}

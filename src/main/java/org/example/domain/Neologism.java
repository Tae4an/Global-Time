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
@Table(name = "neologism")
public class Neologism {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "korean_name", nullable = false, length = 255)
    private String koreanName;

    @Column(name = "english_name", nullable = false, length = 255)
    private String englishName;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

}

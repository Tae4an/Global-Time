# Global Time

## GLobal Time 프로젝트 계획서
#### 팀 구성:

-   **이은범(프론트엔드 개발)**
-   **원유건 및 최태산 (백엔드 개발)**
-   **서황덕(프로젝트 매니저)**

#### 1\. 프로젝트 목표

언어 장벽을 해소하고 모든 학생이 정보를 자유롭게 교류하며 소통할 수 있는 커뮤니티 플랫폼 개발.

#### 2\. 주제 선정 배경

현재 대학 커뮤니티는 주로 한국어로만 운영되며 외국인 유학생들이 정보 접근에 어려움을 겪고 있음. 언어 장벽을 없애고 모든 학생이 활발히 상호작용할 수 있는 포괄적인 커뮤니티 환경을 조성하고자 함.

#### 3\. 대표 주요 기능

-   **다국어 지원**: 사용자가 선택한 언어로 플랫폼을 이용할 수 있음.
-   **익명 게시판**: 사용자는 익명으로 활동하며 자유롭게 의견을 교환할 수 있음.
-   **번역 기능**: 게시물 및 댓글을 다양한 언어로 번역해주는 기능 제공.
-   **소셜 네트워킹**: 친구 추가, 메시지 교환, 그룹 생성 등의 기능 지원.
-   **이벤트 및 공지 사항**: 학교 행사와 중요 공지를 다국어로 제공.

#### 4\. 차별성

-   **비동기식 번역 기능**: 게시글과 댓글 '번역 보기' 버튼 추가, 사용자 클릭 시 비동기 방식으로 콘텐츠 번역 제공. 페이지 새로고침 필요 없이 실시간 다양한 언어로 번역 결과 제공, 사용자 경험 향상. 실시간 커뮤니케이션 중요한 토론 및 댓글 섹션에서 빠른 정보 교환 가능, 언어 장벽 효과적 제거.
-   **번역되지 않는 신조어 번역 기능**: 사용자 커뮤니티 직접 참여, 신조어 데이터베이스에 추가 및 번역 제안 가능. 번역되지 않는 신조어 문제 해결, 사용자 직접 번역 추가 또는 수정 가능. 번역의 정확성과 풍부함 향상, 한국어의 독특한 신조어 많은 점 고려, 유학생들 현지 문화와 언어에 깊이 통합될 수 있도록 도움.

#### 5\. 예상되는 어려움 및 대처 계획

-   **번역의 정확성**: 자연어 처리 기술의 복잡성으로 인해 번역 오류가 발생할 수 있음. React-i18next와 Google Cloud Translation API를 사용하여 번역 품질 개선 예정.
-   **익명성 관리**: 익명 사용자의 부적절한 사용을 방지하기 위한 정책 및 기술적 조치 필요. 강력한 사용자 인증 시스템과 익명성 관리 정책 개발 예정.
-   **신조어나 유행어의 번역**: 신조어나 유행어의 경우 일반 번역 시스템에서 정확한 번역이 어려울 수 있음. 이를 해결하기 위해 커뮤니티에서 자주 사용하는 용어를 데이터베이스에 추가하고, 번역 시스템을 주기적으로 업데이트하여 번역 품질을 개선할 계획.
#### 6\. 관련 오픈소스 소프트웨어

-   **Google Cloud Translation API**: 다양한 언어 간 텍스트 번역 지원.
-   **React-i18next**: 다국어 지원을 위한 강력하고 유연한 React 라이브러리.
-   **Fetch API**: 비동기 통신을 통해 서버로부터 데이터를 효율적으로 가져옴.

#### 7\. 기대 효과

-   언어 장벽 없이 모든 학생이 정보를 공유하고 교류할 수 있는 환경 제공.
-   다양한 문화적 배경을 가진 학생들 간의 이해와 소통 증진.
-   학교 커뮤니티의 활성화와 유학생들의 학교 생활 적응 도움.

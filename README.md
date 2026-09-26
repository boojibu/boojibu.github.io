# boojibu.github.io

백엔드와 데이터 엔지니어링 기술 블로그. Jekyll로 생성하고 GitHub Pages로 배포합니다.

## 배포

저장소 Settings → Pages에서 Deploy from a branch / main / (root)를 사용합니다.
main에 변경 사항이 반영되면 https://boojibu.github.io 에 자동 배포됩니다.
로컬에서 수정·검증·커밋한 뒤 사용자가 검토합니다. 사용자가 해당 변경의 푸시를 명시적으로 요청한 경우에만 main으로 푸시하고, Actions에서 Check blog build와 Pages 배포 성공 여부를 확인합니다.

## 글 작성

1. templates/post.md를 복사해 _posts/YYYY-MM-DD-slug.md로 저장합니다. 처음에는 _posts 폴더를 만드세요.
2. title, description, date, tags를 수정합니다. 날짜는 파일명과 맞추고 +0900을 유지합니다.
3. 본문을 Markdown으로 작성합니다. 미래 날짜의 글은 기본적으로 공개되지 않습니다.
4. 로컬에서 확인한 뒤 커밋하고 변경 내용을 검토합니다. 검토 후 푸시할 때 사이트에 반영됩니다.

사용할 태그 예시: Backend, Data, Product, Blockchain.
초안은 _drafts/slug.md에 보관하면 기본 사이트 배포에서 제외됩니다. 단, 공개 저장소에 푸시한 초안 원문은 GitHub에서 볼 수 있습니다.
이미지는 assets/images/에 추가하고 /assets/images/파일명 경로로 연결하세요.

templates는 사이트 배포에서 제외됩니다. 실제 경험을 바탕으로 첫 글을 작성하기 전까지 홈에는 준비 중 안내가 표시됩니다.

## 수정할 곳

- _config.yml: 제목, 설명, 사이트 주소
- about.md: 소개
- projects.md: 프로젝트 목록 화면
- _projects/: 프로젝트 소개 문서
- assets/js/search.js: 검색과 필터
- assets/css/style.css: 디자인
- _layouts/: 공통 화면 및 글 레이아웃

## 로컬 미리보기 (Ruby와 Bundler 필요)

```sh
bundle install
bundle exec jekyll serve
```

http://localhost:4000 에서 확인합니다. 초안까지 보려면 --drafts 옵션을 추가하세요.
Windows에서는 Ruby 설치 환경에 따라 WSL에서 실행하는 것이 편할 수 있습니다.

## 검증

GitHub Actions에서 GitHub Pages용 Jekyll 빌드를 실행합니다.
성공한 실행의 blog-preview 아티팩트에는 생성된 HTML이 들어 있습니다.

## 디자인

Tale과 No Style Please의 간결한 글 중심 구성을 참고한 자체 레이아웃입니다. 외부 테마 코드나 패키지는 사용하지 않습니다. 시스템 글꼴, 날짜와 제목 중심 목록, 읽기 편한 본문 너비를 사용합니다. 본문용 표, 코드 블록, 인용문과 모바일 레이아웃을 지원합니다.

## 프로젝트 등록과 글 연결

1. `templates/project.md`를 `_projects/project-slug.md`로 복사합니다. 처음에는 `_projects` 폴더를 만드세요.
2. `project_id`는 중복되지 않는 영문 소문자·숫자·하이픈 조합으로 정합니다. 파일명과 같은 값을 권장합니다.
3. 제목·설명·상태·역할·기간을 수정하고, 저장소와 서비스 링크는 실제 공개 URL만 입력합니다. 필요 없는 항목은 삭제해도 됩니다.
4. 관련 글의 front matter에 `project: project-slug`를 추가합니다. 하나의 글은 하나의 프로젝트에 속하고, 태그는 여러 개를 쓸 수 있습니다.
5. 프로젝트 페이지는 `/projects/project-slug/`에 생성되고 관련 글은 오래된 글부터 나옵니다. 프로젝트를 지정하지 않은 글은 전체 글 목록에서 볼 수 있습니다.

프로젝트 문서만으로 글이 생성되지는 않습니다. 실제 글은 `_posts`에 작성합니다. 프로젝트와 글의 연결은 파일명이 아니라 `project_id` 값으로 결정되므로, ID를 바꿀 때는 관련 글의 `project` 값도 함께 바꾸세요.

## 검색과 필터

홈에서 제목·본문·설명·태그·프로젝트명을 검색합니다. 띄어쓰기로 나눈 검색어를 모두 포함하는 글을 찾으며 대소문자를 구분하지 않습니다. 태그와 프로젝트 필터는 검색어와 함께 적용됩니다.

선택한 조건은 주소의 `q`, `tag`, `project`에 반영되어 링크를 공유하거나 새로고침해도 유지됩니다. 글의 태그를 누르면 해당 태그로 필터링된 홈으로 이동합니다. JavaScript를 끄거나 검색 파일을 불러오지 못해도 전체 글 목록과 프로젝트 페이지는 읽을 수 있습니다.

검색은 외부 서비스 없이 브라우저에서 `/search.json`을 읽어 처리합니다. 이 파일에는 공개 글의 본문이 들어갑니다. 초안은 기본 배포 및 검색에 포함되지 않지만, 공개 저장소에 올린 원문 자체는 누구나 볼 수 있습니다.

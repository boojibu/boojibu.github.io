# boojibu.github.io

백엔드와 데이터 엔지니어링 기술 블로그. Jekyll로 생성하고 GitHub Pages로 배포합니다.

## 배포

저장소 Settings → Pages에서 Deploy from a branch / main / (root)를 사용합니다.
main에 변경 사항이 반영되면 https://boojibu.github.io 에 자동 배포됩니다.
PR의 Check blog build가 성공하는지 확인한 다음 병합하세요.

## 글 작성

1. templates/post.md를 복사해 _posts/YYYY-MM-DD-slug.md로 저장합니다. 처음에는 _posts 폴더를 만드세요.
2. title, description, date, tags를 수정합니다. 날짜는 파일명과 맞추고 +0900을 유지합니다.
3. 본문을 Markdown으로 작성합니다. 미래 날짜의 글은 기본적으로 공개되지 않습니다.
4. 브랜치에 커밋하고 PR 빌드 확인 후 main으로 병합합니다.

사용할 태그 예시: Backend, Data, Product, Blockchain.
초안은 _drafts/slug.md에 보관하면 배포에서 제외됩니다. 단, 공개 저장소에서는 초안 원문도 누구나 볼 수 있습니다.
이미지는 assets/images/에 추가하고 /assets/images/파일명 경로로 연결하세요.

templates는 사이트 배포에서 제외됩니다. 실제 경험을 바탕으로 첫 글을 작성하기 전까지 홈에는 준비 중 안내가 표시됩니다.

## 수정할 곳

- _config.yml: 제목, 설명, 사이트 주소
- about.md: 소개
- projects.md: 실제 프로젝트와 관련 글
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

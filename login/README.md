# Login

## spec

- mongodb collection 새롭게 생성
- index page에서 로그인 폼 생성
- 로그인 정보를 /login path로 POST 요청
  - 이 때 로그인 정보는 암호화 되어야 함
- DB에 저장된 로그인 정보는 /list path에서 확인 가능
  - 이 때 로그인 정보는 복호화 되어야 함

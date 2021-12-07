# Login

## How to Run

```
npm run start
```

## spec

- /signup
  - localhost:8080/signup 페이지로 접속 후 id 및 password 입력
  - signupValidation 검사 실패시 에러
  - ID로 DB 검사 후 존재하는 ID일시 '이미 존재하는 ID' 메시지와함께 에러
  - password 암호화 후 새로운 User 모델 생성
  - 생성된 User 객체 DB 저장
  - 로그인 페이지로 redirect
- /login
  - redirect된 localhost:8080/login 페이지에서 id 및 Password 입력
  - loginValidation 검사 실패시 에러
  - ID로 DB 검사 후 일치하는 ID가 없을시 '유저 못 찾음' 메시지와 함께 에러
  - 사용자가 입력한 Password값과 복호화한 DB에 저장된 password 값 확인
    - 값이 같지 않은 경우 에러
    - 값이 같은 경우 header에 jwt 토큰 저장하고 로그인 성공 메시지 전송

## used libraries

- @hapi/joi
  - id / Password validation check
- body-parser
  - for POST request
- crypto-js
  - encrypt & decrypt password
- dotenv
  - Storing secret keys
- express
  - NodeJS Framework
- jsonwebtoken
  - jwt for authentication
- mongoose
  - MongoDB object modeling tool

## todo

- import sorting eslint
- Add user message after sign up
  - then redirect to login page
- Add CI with github actions
- Migration secret key from dotenv to github secret

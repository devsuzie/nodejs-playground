# nodejs

## REST API

1. Uniform Interface

- 하나의 자료는 하나의 URL로
- URL 하나를 알면 둘을 알 수 있어야 함
- 요청과 응답은 정보가 충분히 들어있어야 함

2. Client-Server 역할 구분

- 브라우저는 요청만 할 뿐
- 서버는 응답만 할 뿐

3. Stateless

- 요청 1과 요청 2는 의존성이 없어야 함

4. Cacheable (브라우저가 알아서 잘 해줌)

- 서버에서 보내주는 정보들은 캐싱이 가능해야 함
- 캐싱을 위한 버전 같은 것도 관리 잘 해야 함

5. Layered System
6. Code on Demand

## DB 종류

1. 관계형 DB

- table 형식
- MySQL | MariaDB | Oracle | My SQL Server
- SQL 이라는 언어를 써야함 (Query Language)
- Relational의 의미
  - 데이터들 간의 관계를 정해서 데이터를 저장할 수 있다는 뜻
  - 테이블 형 DB에서는 3차원 데이터를 표현하기 어려운데 이를 극복하기 위해 테이
    블을 하나 더 만들고, 테이블간의 관계를 생성한다는 뜻애서 Relational DB라고불
    림

2. NoSQL

- SQL 언어를 사용하지 않고도 사용할 수 있는 DB
- Dynamo | Oracle NoSQL | MongoDB | Redis | Cassandra
- 종류
  - Key-value 모델
  - Document 모델: MongoDB가 여기에 속함
  - Graph 모델
  - Wide-column 모델
- Scaling이 쉬움
  - 관계형 DB에서는 확장을 위해 Scale Up (서버 성능 확장)을 함
  - NoSQL DB에서는 Scale Out 으로 데이터를 분산 저장함
- 스키마 정의 없이 사용 가능
  - 스키마를 정의하기 위해 Mongoose 사용

## EJS

- HTML 쉽게 쓸 수 있도록 도와주는 템플릿 엔진 ([문서](https://ejs.co/))
- HTML 안에 서버 데이터를 집어 넣을 수 있음
- index.html -> index.ejs 사용 가능
- ejs 파일은 `views` 폴더 안에 있어야 함
- ejs 파일 내에서 js 문법 쓰고 싶으면 line 의 앞, 뒤에 `<% %>` 붙이면 됨

## JWT

- json web token이 필요한 이유

  - 로그인 하고 나서 post 요청 등 API 통신을 할 때 로그인 한 유저인지 아닌지 알
    기 위해서 (valid한 유저인지)
  - 로그인할 때 토큰 발급 받고 나서 다음 요청 보낼때 마다 토큰을 보여주면 됨

- token 만들고 나서 정보 궁금하면
  - jwt debugger에서 decoded 내용 확인 가능
  - 내가 payload에 담아서 보낸 내용이 잘 담겼는지 등
  - 여기서 토큰 유효 기간 설정도 가능함

## Mongodb Operator (연산자)

- $set: 값을 바꾸고 싶을때 사용
  ```
  {$set: {totalPost: 바꿀 값}}
  ```
- $inc: 값을 증가하고 싶을때 사용
  ```
  {$inc: {totalPost: 기존 값에 더해줄 값}}
  ```

## Javascript Ajax

- 서버와 통신할 수 있게 도와주는 JS 문법
- 새로고침 없이 서버에 요청할 수 있음 (url 보내서 API 요청하는 방식과 다름)
- HTML 에서 불가능한 DELETE 요청을 가능하게 해줌
- `$.ajax` ajax 요청할 수 있는 함수

## 회원 인증 방법

- session-based
  - 로그인시 쿠키 발급 후 session data를 서버 메모리에 저장
- token-based (jwt)
  - 로그인시 서버에서 웹 토큰을 발급해서 브라우저에 전송 (요청할때마다 헤더에 토
    큰을 담아서 전송)
- Open Authentication (OAuth)
  - google 프로필 정보를 가져옴

## 미들웨어

- `app.use()`: 요청과 응답사이에 동작하는 코드

## 게시물 빨리 검색하기

- Binary Search: 많은 수의 게시물 중 빠르게 찾는 방법 (내림차순으로 정렬 되어 있
  어야 사용 가능)
- MongoDB는 `_id` 순으로 미리 정렬되어 있어서 Binary Search 가능
- 문자열 (제목)에 Indexing - 미리 정렬하면 Binary Search 적용할 수 있음
  - mongoDB 콜렉션에서 `Indexs` 탭에서 text index 설정 가능
  - 띄어쓰기로 구분하여 검색 결과를 도출하기 때문에 검색할 문서 양을 정해두거나
    text index 만들때 다르게 만들면 됨
  - searchIndex로 생성하면 문제 해결: Index Analyzer를 lucene.korean으로 변경

## Mongoose

- validation 쉽게 할 수 있도록 스키마 정의 가능
- 예전에는 MongoDB Native가 구려서 많이 사용했으나 `MongoDB Compass`로
  Validation 처리 가능

## 댓글 또는 채팅 기능

- 게시물간의 종속 관계 표현하고 싶을때 부모 정보까지 저장해야함
- 글 & 댓글 == 채팅방 & 메시지
- 댓글이 엄청나게 많아질때 어떻게 처리할것인가
  - 컬렉션을 만들어서 저장

## 실시간으로 데이터 가져오는 법

- 1초마다 서버에 get 요청 보내기 (부하 생길 수 있음 / 거의 DDos 공격)
- 서버와 유저간 실시간 소통 채널 열기 (Server Sent Events)
  - 클라이언트에서 요청 없이 서버에서 계속해서 응답을 보내줄 수 있음
  - header content-type에 `text/event-stream` 추가
  - 서버와 실시간 자료 전달시 문자만 전달 가능 (JSON.stringify 사용 해줘야함)

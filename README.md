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

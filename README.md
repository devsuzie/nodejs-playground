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

2. NoSQL

- Object 자료형으로 입출력 가능
- Dynamo | Oracle NoSQL | MongoDB | Redis | Cassandra

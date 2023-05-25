# realworld
2023 yourssu realworld 프로젝트 C조 리포지토리입니다. 

### 팀원
| [Bori (@nijuy)](https://github.com/nijuy) | [Poly (@indianaPoly)](https://github.com/indianaPoly) |
| :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/87255462?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/95522176?v=4" width="150"/> 

### 규칙
#### 개발 규칙
1. dev 브랜치에서 작업
2. interface 및 타입 지정은 컴포넌트 외부에서 지정

#### 명명 규칙
0. `파일명`은 대문자, `변수명`은 소문자로 시작 + 카멜 케이스
1. `prop type` : 앞 글자 대문자 + 컴포넌트명 + Prop
2. `state` : 컴포넌트 이름 + Data
3. `핸들러 함수` : on + 핸들러 명 + 컴포넌트이름 + Data (이벤트 핸들러는 외부에서 지정후 사용)
4. `이벤트` : tag + Event (formEvent, buttonEvent, ... ⭕ / e ❌)
5. `map 함수 매개변수` : 배열이름 + Data

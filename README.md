<h1>YourSSU-RealWorld-PB</h1>

<div align="center">
 <img src="https://github.com/nijuy/realworld-PB/assets/87255462/eb7f1128-ad9a-480d-bbf3-b4733b472720" >
</div>

<h2> 👀 프로젝트 소개 </h2>

숭실대학교 중앙동아리 유어슈, 웹 프론트엔드팀

[RealWorld](https://github.com/gothinkster/realworld) 클론 코딩 & 페어 프로그래밍 프로젝트

프로젝트 기간: 2023.05.20~2023.07.07

리팩토링 기간: 2023.08~2023.09

<h4> 😎 팀원 </h4>

| [Bori (@nijuy)](https://github.com/nijuy)                  | [Poly (@indianaPoly)](https://github.com/indianaPoly)      |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
|<img src="https://avatars.githubusercontent.com/u/87255462?v=4"/> | <img src="https://avatars.githubusercontent.com/u/95522176?v=4"/> |

<h4> 👩‍💻 페어 프로그래밍 가이드라인 👨‍💻 </h4>
1. 15분마다 역할 교체 <br/>
2. Bori의 노트북으로 진행 (온라인일 경우 Live share 기능 사용)

<h2> 🛠 기술 스택 </h2>

`TypeScript` `Vite` `React` `react-router-dom` `axios` `recoil` `recoil-persist` `react-query` `qs`

<h2> 📁 폴더 구조 </h2>

```
📦src
 ┣ 📂api // api 호출 함수
 ┣ 📂components // 여러 페이지에서 사용하는 컴포넌트
 ┃ ┣ 📂layout // Header, Footer 등 화면 구조의 뼈대
 ┣ 📂pages // 페이지
 ┣ 📂recoil
 ┃ ┗ 📂atom // recoil atom 정의
 ┣ 📂services // 서비스 함수 (토큰)
 ┣ 📂types // 타입 정의
 ┣ 📜App.tsx // Routing
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```
<h2> ✨ 실행 </h2>
<h4> Installation </h4>

```
$ git clone https://github.com/nijuy/realworld-PB.git
$ cd realworld-PB
```
<h4> Frontend </h4>

```
$ npm install --global yarn
$ yarn install
$ yarn run dev
```

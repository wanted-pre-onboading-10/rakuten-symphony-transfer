# 라쿠텐심포니 코리아 Frontend Developer 기술 과제
원티드 프리온보딩 라쿠텐심포니 코리아 링크 페이지 과제 리포입니다.

<br/>

## 📌 배포

- [배포링크](https://rakuten-absolute.netlify.app)

<br/>

## 📌 요구 사항 및 구현 방향

### 링크 목록 화면

- 링크 아이템 클릭 시 상세페이지 이동
- 유효기간 실시간 반영
- 유효기간 이내 URL 클릭 시, 클립보드 복사
- 파일 개수 및 파일 사이즈 표기
- 받는 사람 표기

### 링크 상세 화면

- 링크 정보 표시
- 유효기간 이내인 경우, 파일 목록 표시

<br/>

## 📌 기술 스택

<div align="center" >
	<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
	<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-%231572B6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
	<img alt="Styled Components" src="https://img.shields.io/badge/Styled-Components-pink.svg?style=for-the-badge&logo=Styled-Components&logoColor=white" />
</div>


<br/>

## 📌 로컬 환경 구동

프로젝트 클론

```bash
git clone https://github.com/wanted-pre-onboading-10/rakuten-symphony-transfer.git
```

프로젝트 디렉토리 들어가기

```bash
cd rakuten-symphony-transfer
```

패키지 설치 및 프로젝트 시작

```bash
yarn install && yarn start
```

<br/>

## 📌 팀원

|[이욱창](https://github.com/wook95)|[김태희](https://github.com/tae100k)|[문현돈](https://github.com/hyundonny)|[이경은](https://github.com/2kyung19)|
| ----- | ---- | ----- |  ----- |
|<img src="https://avatars.githubusercontent.com/u/80494742?v=4" width="200"/>|<img src="https://avatars.githubusercontent.com/u/78027252?v=4" width="200" />| <img src="https://avatars.githubusercontent.com/u/10048956?v=4" width="200" />|<img src="https://avatars.githubusercontent.com/u/32586712?v=4" width="200" />

<br/>

## 📌 팀원별 역할 및 회고

### 김태희

- 역할
    - api 데이터 바인딩
    - 유효 기간 남아있을 시, 상세페이지로 이동, 링크 복사 기능 구현
    - Avatar 컴포넌트 사용
    - 유틸함수를 사용하여 파일 크기, 개수, 유효 기간 등 표시
- 회고
    - ****📜**** [React, TS로 구현한 라쿠텐 파일 저장소](https://www.notion.so/React-TS-da79d1ebe8fe4916a098d083ee2fbec8)
    

### 문현돈

- 역할
    - 링크 상세 페이지 구현
    - 파일 썸네일 구현 위한 유틸 함수 구현
- 회고
    - CSS 처리가 이미 되어있었기 때문에 빠르게 작업을 진행할 수 있었다. 하지만 내가 맡은 페이지에서 컴포넌트로 분리할 수 있음에도 불구하고 분리되어 있지 않은 코드가 꽤 많이 있어서 따로 분리시켜주는 작업을 먼저 진행했다. 또한, 페이지 파일 안에 styled-components로 구현된 스타일 코드도 함께 있었는데 SoC 원칙에 따라 컴포넌트와 스타일을 각각 별개의 파일에 두는 것이 맞다고 생각해 분리해주었다.
    - 주어진 thumbnailUrl로 svg 파일에 접근이 안 되는 문제가 생겨, 썸네일을 구현하는데 어려움을 겪었다. api 명세에 주어진 thumbnailUrl을 보니 불러오는 파일 형식이 매번 url 끝에 오는 패턴을 확인했다. 따라서 우선, svg 파일을 불러오는 링크인지 확인하고, svg 파일을 불러오는 링크라면 public 폴더 안에 저장해둔 svg 파일들을 thumbnailUrl 대신 활용하고, svg 외의 다른 파일 형식을 불러오는 링크는 thumbnailUrl을 활용하는 방식으로 문제를 해결했다.

### 이경은

- 역할
    - 숫자 콤마 함수, 유효기간 계산, 생성 날짜 함수 등 유틸함수 구현
- 회고
    - 기간 계산, 날짜 규격 계산을 진행하면서 date 생성자에 대해 깊게 공부해볼 수 있었다.

### 이욱창

- 역할
    - 404 페이지 구현
    - react-router로 라우팅 구현
    - 파일 용량 계산 함수 구현
- 회고
    - 이번 과제는 한사람이 할 수 있을정도로 양이 적었기 때문에 맡은 부분에서 뭘 더 할수 있을까 생각을 해보다 404 페이지를 구현했습니다. 구현하며 react-router v6에 조금 더 익숙해 질 수 있었습니다.
    - 이번 과제에서 준 api는 cors 에러가 걸려있었는데 맡은 팀원이 혼자 해결하는것이 아니라, 이런 문제가 있다고 공유하고 같이 해결 방법을 논의했기에 모두 다 같이 성장할 수 있었습니다☺️

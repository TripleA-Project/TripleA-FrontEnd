## component 렌더링 확인용 dynamic route 사용법

경로: `localhost:3000/ui/{component 경로 이름}`

```tsx
// localhost:3000/ui/Avatar 로 테스트하고 싶은경우

// @/components/ComponentTest
import Avatar from './Avatar'; // (1)내가 렌더링해서 확인하고 싶은 컴포넌트를 import로 불러온뒤

export const ComponentList = {
  'Avatar': <Avatar />, // (2)주소에 입력할 경로의 이름을 key에, 컴포넌트를 해당 key의 value로 추가 , 'Avatar/User' 와 같이 /가 붙지 않는다면 Avatar로만 키를 작성해도 괜찮음
  /.../
};

// (3) 로컬에서 실행해서 주소를 입력해 렌더링 확인
// (4) 경로를 잘못 입력했을 경우 현재 등록된 key의 이름과, 입력된 이름을 표시하도록 에러 페이지 구성함 -> 확인해서 경로를 수정하거나 컴포넌트를 추가해서 진행
```

## 모바일 테스트 등을 위해 ip를 연동해서 실행하고 싶은 경우

(별도로 호스트 지정하지 않을 경우 0.0.0.0 , localhost로 실행됩니다)

`ip가 111.111.111.111`이라고 가정

- 모바일도 해당 ip로 설정 (같은 wifi 사용)
- ipconfig 등을 통해 확인한 ip주소를 입력

```bash
yarn dev -H 111.111.111.111
```

or

```bash
yarn build
yarn start -H 111.111.111.111
```

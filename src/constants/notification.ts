export const NotificationTemplate = {
  LikeNewsLoginRequired: {
    content: `
      관심뉴스를 보시려면
      회원가입 / 로그인을 해주세요 :)
    `,
    buttonText: '회원가입 / 로그인 하러가기',
    linkURL: '/login',
  },
  LikeEmpty: {
    content: `
      관심 카테고리/종목을
      선택해주세요!
    `,
    buttonText: '선택하러 가기',
    linkURL: '',
  },
  BookmarkLoginRequired: {
    content: `
      일반회원 / 유료회원만
      북마크가 가능합니다.
    `,
    buttonText: '로그인 하러가기',
    linkURL: '/login',
  },
  ChartLoginRequired: {
    content: `
      유료 회원만 차트를 볼 수 있습니다.
    `,
    buttonText: '로그인 하러가기',
    linkURL: '/login',
  },
};

export const NewsDetailNotificationTemplate = {
  NewsDetailLoginRequired: {
    title: `
      비회원은 열람할 수 없어요!
    `,
    content: `
      회원가입 후 구독하시면
      미국 주식 기사 요약문, 기사번역,
      감성분석, 키워드 등을 제공해드려요.
    `,
    buttonText: 'Triple A 이용하러 가기',
    linkURL: '/login',
  },
  NoReadToday: {
    title: `
      오늘 열람 가능한 횟수를
      모두 사용했어요.
    `,
    content: `
      구독 후 번역&요약 글, 감성분석,
      키워드, AI분석을 확인할 수 있어요!
    `,
    buttonText: '구독하러 가기',
    linkURL: '/mypage/edit/subscribe',
  },
};

export const LockNotificationTemplate = {
  Chart: {
    title: '구독제 회원만 열람가능',
    content: `
      멤버십 회원이 되어 무제한 이용해보세요!
    `,
    buttonText: '지금 바로 구독하기',
    linkURL: '/mypage/membership',
  },
  FailStepPayInfo: {
    title: '구독제 회원만 열람 가능',
    content: `
      구독 결제 중 취소하신적이 있으신가요?
      결제완료 후 멤버십 회원이 되어
      무제한 이용해보세요.
    `,
    buttonText: '지금 바로 구독하기',
    linkURL: '/mypage/membership',
  },
  MoreLikeRequiredSubscribe: {
    title: '구독제 회원에게만!',
    content: `
      4개 이상의 관심 종목을 설정하려면
      멤버십 회원이 되어보세요.
    `,
    buttonText: '지금 바로 구독하기',
    linkURL: '/mypage/membership',
  },
};

export const HistoryNotificationTemplate = {
  RequiredSubscribe: {
    content: `
      구독후 내가 본 기사 조회가
      가능합니다
    `,
    buttonText: '구독하러 가기',
    linkURL: '/mypage/membership',
  },
};

export const ServerErrorNotificationTemplate = {
  Timeout: {
    title: `
      요청 만료
    `,
    content: `
      요청을 처리하는 시간이 
      오래걸려 중단되었습니다. 
      이용에 불편을 드려 죄송합니다.
    `,
  },
};

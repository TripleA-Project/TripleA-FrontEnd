import { Metadata } from 'next';
import {
  BlueMediumButton,
  GrayMidiumButton,
  GrayMidiumRoundedButton,
  BlueLongButton,
  BlueSemiLargeButton,
  BlueLargeButton,
  BlackMediumButton,
  BlueSmallButton,
  BlueBorderButton,
  GrayTextButton,
  TextButton,
  SearchButton,
  SearchShortButton,
  BookMarkButton,
  BookMarkGrayButton,
  BookMarkOnButton,
  BookMarkNumberButton,
  HeartOnButton,
  HeartButton,
  LeftButton,
  BackButton,
  BottomButton,
  RightButton,
  CancelButton,
  CancelGrayButton,
  UpButton,
  ExportButton,
  ChecktButton,
  CheckOntButton,
  PenButton,
  ShareButton,
  XButton,
} from '@/components/Button';

export const metadata: Metadata = {
  title: 'TripleA | 뉴스',
  description: 'Triple A 뉴스',
};

function Home() {
  return (
    <div>
      home (News)
      <BlueMediumButton title="우왕" />
      <GrayMidiumButton title="오오" />
      <BlueLongButton title="오우" />
      <GrayMidiumRoundedButton title="더 Radius" />
      <BlueSemiLargeButton />
      <BlueLargeButton />
      <BlackMediumButton />
      <div className="flex">
        <BlueSmallButton />
        <BlueBorderButton />
      </div>
      <GrayTextButton title="코드 재발송" />
      <TextButton title="으음" />
      <SearchButton />
      <SearchShortButton />
      <BookMarkButton />
      <BookMarkOnButton />
      <BookMarkNumberButton />
      <HeartOnButton />
      <HeartButton />
      <LeftButton />
      <BackButton />
      <BottomButton />
      <RightButton />
      <CancelButton />
      <UpButton />
      <ExportButton />
      <ChecktButton />
      <CheckOntButton />
      <PenButton />
      <ShareButton />
      <BookMarkGrayButton />
      <CancelGrayButton />
      <XButton />
    </div>
  );
}

export default Home;

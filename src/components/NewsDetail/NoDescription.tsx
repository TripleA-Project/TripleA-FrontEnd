import { MdSentimentVeryDissatisfied } from 'react-icons/md';

function NoDescription() {
  return (
    <div className="flex flex-col items-center gap-[26px] pt-9">
      <MdSentimentVeryDissatisfied className="text-4xl" />
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold">요약문이 제공되지 않는</p>
        <p className="text-xl font-semibold">기사입니다.</p>
      </div>
    </div>
  );
}

export default NoDescription;

import { useState } from 'react';
import { AppIcons } from '../Icons';

interface BenfitBarProps {
  benefitCount: number;
}

function BenefitBar({ benefitCount }: BenfitBarProps) {
  const [isRender, setIsRender] = useState(true);
  const [active, setActive] = useState(true);

  return isRender ? (
    <div
      className={`animate__animated ${
        active ? 'animate__fadeInUp' : 'animate__fadeOutDown'
      } fixed_inner fixed bottom-[63px] w-full bg-black/75 text-white`}
    >
      <div className="box-border flex items-center justify-between px-[18px] py-3.5">
        <div className="flex flex-1 items-center justify-center text-sm text-white">
          오늘 남은 열람 가능 횟수&nbsp;&nbsp;:&nbsp;<span className="font-semibold"> {benefitCount ?? 0}회</span>
        </div>
        <AppIcons.CloseFill.DarkGray
          onClick={() => {
            setActive(false);
            setTimeout(() => {
              setIsRender(false);
            }, 200);
          }}
        />
      </div>
    </div>
  ) : null;
}

export default BenefitBar;

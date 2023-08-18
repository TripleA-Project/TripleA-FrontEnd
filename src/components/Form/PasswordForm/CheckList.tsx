import { ForwardedRef, forwardRef } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';

interface CheckListItem {
  label: string;
  rule: boolean;
}

type CheckList = CheckListItem[];

type CheckListIcons = {
  valid: React.ReactNode;
  inValid: React.ReactNode;
};

interface CheckListProps extends React.HTMLProps<HTMLDivElement> {
  checkList: CheckList;
  icons?: CheckListIcons;
}

export function createCheckList({ checkList }: { checkList: CheckList }): CheckList {
  return checkList;
}

function ForwardCheckList(
  {
    checkList,
    icons = {
      valid: <BsCheckCircle className="shrink-0 text-xs text-[#4bbd17]" />,
      inValid: <ImCancelCircle className="shrink-0 text-xs text-error" />,
    },
    ...props
  }: CheckListProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} {...props}>
      {checkList.map((checkListItem, idx) => {
        return (
          <div className="flex items-center gap-2" key={`checkList-${checkListItem.label}-${idx}`}>
            <div className="inline-flex items-center justify-center">
              {checkListItem.rule === true ? icons.valid : icons.inValid}
            </div>
            <div className="text-sm font-bold">{checkListItem.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export const CheckList = forwardRef<HTMLDivElement, CheckListProps>(ForwardCheckList);

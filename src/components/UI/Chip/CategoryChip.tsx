import React, { useEffect, useRef, useState } from 'react';
import { MdGrid3X3 } from 'react-icons/md';
import { AppIcons } from '@/components/Icons';
import { type Category } from '@/interfaces/Category';
import { type OnChipChangeResult } from './SymbolChip';

export interface CategoryChipProps {
  category?: Category;
  loading?: boolean;
  selected?: boolean;
  shadowEffect?: boolean;
  showHashTagIcon?: boolean;
  closeButton?: boolean;
  onChange?: () => Promise<OnChipChangeResult>;
  onClose?: () => void;
}

function CategoryChip({
  category,
  loading,
  selected = false,
  shadowEffect,
  showHashTagIcon,
  closeButton,
  onChange,
  onClose,
}: CategoryChipProps) {
  const [checked, setChecked] = useState(selected);
  const [isRender, setIsRender] = useState(true);
  const changeTrigger = useRef<boolean>(false);

  const handleClick = () => {
    if (onChange) {
      setChecked((prev) => !prev);
      changeTrigger.current = true;
    }
  };

  const handleChange = async () => {
    if (onChange && changeTrigger.current === true) {
      const { status } = await onChange();

      if (status === 'error') {
        setChecked((prev) => !prev);

        changeTrigger.current = false;

        return;
      }

      changeTrigger.current = false;
    }
  };

  useEffect(() => {
    handleChange();
  }, [checked]); /* eslint-disable-line */

  useEffect(() => {
    setChecked(!!selected);
  }, [selected]);

  if (loading) {
    return showHashTagIcon ? (
      <div
        className={`box-border inline-flex h-9 w-[100px] cursor-pointer select-none items-center gap-1.5 rounded-full border border-[#E5E7EC] bg-white px-3.5 py-2 align-top`}
      >
        <div className="skeleton_loading">
          <div
            className="h-6 w-6"
            style={{
              clipPath:
                "path('M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z')",
            }}
          />
        </div>
        <div className="flex-1 select-none text-xs">
          <span>&nbsp;</span>
        </div>
      </div>
    ) : (
      <div className="skeleton_loading inline-block cursor-pointer select-none border-slate-300 align-top">
        <div
          className={`box-border inline-flex h-9 w-[100px] items-center gap-1.5 rounded-full border bg-white px-3.5 py-2 align-top`}
        >
          <div className="flex-1 text-xs ![background:none]">
            <span>&nbsp;</span>
          </div>
        </div>
      </div>
    );
  }

  return category && isRender ? (
    <div
      className={`box-border inline-flex h-9 w-max ${
        showHashTagIcon ? 'min-w-[84px]' : ''
      } max-w-sm shrink-0 cursor-pointer select-none items-center justify-between rounded-full border px-3.5 py-2 align-top transition-transform ${
        checked ? 'border-[#FC954A] bg-[#FFF0E4]' : 'border-[#E5E7EC] bg-white'
      } ${shadowEffect ? 'my-2.5 ml-[9px]' : 'm-0'} ${
        checked && shadowEffect ? 'shadow-[0_0_15px_0_rgba(252,149,74,0.3)]' : 'shadow-none'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-1.5">
        {showHashTagIcon ? <MdGrid3X3 className="shrink-0 text-2xl text-black" /> : null}
        <div className="shrink-0 select-none text-xs">
          <span>{category.category}</span>
        </div>
      </div>
      {closeButton ? (
        <button
          className="ml-2"
          onClick={() => {
            onClose && onClose();
            setIsRender(false);
          }}
        >
          <AppIcons.CloseFill.Orange />
        </button>
      ) : null}
    </div>
  ) : null;
}

export default CategoryChip;

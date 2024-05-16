'use client';

import { styled } from '@mui/system';
import { useController, useFormContext } from 'react-hook-form';
import { FreeTierUserSearchFormData } from '../../../form-context/SearchFormContext';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Button from '@/components/Button/Button';
import { SearchIcon } from '@/components/Icons/SearchIcon';
import { searchMemoRules } from './memoRules';
import { useAdminUserSearchStatus } from '@/redux/slice/adminUserSearchSlice';
import { AdminUserTypeKey } from '@/redux/slice/adminUserListSlice';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  height: 38px;
  padding: 8px 4px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

function MemoSearchField() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<FreeTierUserSearchFormData>();
  const { field } = useController({ control, name: 'memo', rules: searchMemoRules });

  const { searchStatus } = useAdminUserSearchStatus<AdminUserTypeKey.FreeTierUsers>();

  return (
    <div className="absolute left-0 top-0 h-[38px]">
      <div className="flex w-max items-center">
        <TextareaAutosize
          minRows={1}
          maxRows={20}
          className="w-[180px] resize-none sm:w-[260px]"
          placeholder="검색할 메모 내용을 입력해 주세요"
          disabled={isSubmitting || searchStatus === 'loading'}
          value={field.value}
          onChange={field.onChange}
        />
        <div className="flex h-[38px] items-center self-start">
          <Button
            className="group flex h-fit w-fit shrink-0 gap-2 px-2 py-1 text-xs"
            bgColorTheme="none"
            textColorTheme="black"
            type="submit"
            disabled={isSubmitting || searchStatus === 'loading'}
          >
            <SearchIcon
              width={'1em'}
              height={'1em'}
              className="text-base transition-colors duration-200 group-hover:[&>*]:stroke-[#FD954A]"
            />
            <span className="sr-only">검색</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MemoSearchField;

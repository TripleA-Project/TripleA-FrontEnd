'use client';

import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { FreeTrialFormData } from '@/interfaces/FormData';
import { SiteUserPayload, SiteUsersPayload } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import dynamic from 'next/dynamic';
import Chip from '@mui/material/Chip';
import { idListRules } from './idListRules';
import { useState } from 'react';

interface FreeTierUserInputProps {
  freeTrialableUsers: SiteUsersPayload;
}

const ReactSearchAutocomplete = dynamic(
  () => import('react-search-autocomplete').then((mod) => mod.ReactSearchAutocomplete),
  {
    ssr: false,
    loading(loadingProps) {
      return (
        <div className="skeleton_loading w-full">
          <div className="h-12 w-full rounded-full" />
        </div>
      );
    },
  },
);

function FreeTierUserInput({ freeTrialableUsers }: FreeTierUserInputProps) {
  const { control: freeTrialFormControl } = useFormContext<FreeTrialFormData>();
  const { field: freeTrialUserIdField, fieldState: freeTrialUserIdFieldState } = useController({
    control: freeTrialFormControl,
    name: 'idList',
  });
  const { append } = useFieldArray({
    control: freeTrialFormControl,
    name: 'idList',
    rules: idListRules,
  });

  const [inputSearchString, setInputSearchString] = useState('');

  const formatResult = (user: SiteUserPayload) => {
    return <div className="py-2 text-sm font-medium">{user.email}</div>;
  };

  return (
    <div className="p-2">
      <div
        onChangeCapture={(e) => {
          /*
            inputSearchString 프롭을 변경해서
            입력한 텍스트는 그대로 반영하고,
            유저를 선택한 이후에는 값을 초기화해주기 위해 
            캡처링 이벤트 활용
            (   
              react-search-autocomplete 라이브러리 자체에서 
              onChange 지원해주지 않아, 우회해서 함
            )
          */
          const target = e.target as HTMLElement;

          if (target.tagName === 'INPUT') {
            const changeTargetInput = target as HTMLInputElement;

            setInputSearchString(changeTargetInput.value);
          }
        }}
      >
        <ReactSearchAutocomplete
          className="w-full"
          items={freeTrialableUsers.filter(
            (user) => !freeTrialUserIdField.value.find((idField) => idField.id === user.id),
          )}
          fuseOptions={{
            keys: ['email'],
          }}
          resultStringKeyName="email"
          inputSearchString={inputSearchString}
          formatResult={formatResult}
          placeholder="유저를 검색하고 추가해주세요"
          showNoResultsText="유저를 찾을 수 없습니다"
          showIcon={false}
          styling={{
            height: '48px',
            boxShadow: 'rgba(32, 33, 36, 0.28) 0px 1px 3px 0px',
            hoverBackgroundColor: '#ededed',
            zIndex: 2,
          }}
          onSelect={(result) => {
            const { id } = result as SiteUserPayload;
            append({ id });

            setInputSearchString('');
          }}
        />
        <div className="min-h-[24px]">
          <span className="ml-3.5 text-xs text-[#d32f2f]">
            {freeTrialUserIdFieldState.error?.root ? freeTrialUserIdFieldState.error.root.message : ' '}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4 text-center font-bold">추가한 무료체험 유저 목록</h3>
        {!freeTrialUserIdField.value?.length ? (
          <div className="py-2 text-center font-bold text-[#828282]">등록된 유저가 없습니다</div>
        ) : (
          <TargetFreeTrialUserList freeTrialableUsers={freeTrialableUsers} />
        )}
      </div>
    </div>
  );
}

export default FreeTierUserInput;

const TargetFreeTrialUserList = ({ freeTrialableUsers }: { freeTrialableUsers: SiteUsersPayload }) => {
  const { control: freeTrialFormControl } = useFormContext<FreeTrialFormData>();
  const { field: freeTrialUserIdField } = useController({ control: freeTrialFormControl, name: 'idList' });
  const { remove } = useFieldArray({ control: freeTrialFormControl, name: 'idList', rules: idListRules });

  const targetFreeTrialUsers = freeTrialableUsers.filter((user) =>
    freeTrialUserIdField.value.find((idField) => idField.id === user.id),
  );

  const onDelete = (id: number) => {
    const targetIndex = freeTrialUserIdField.value.findIndex((idField) => idField.id === id);

    remove(targetIndex);
  };

  return (
    <ul className="flex w-full flex-col items-center gap-y-2 overflow-y-auto overflow-x-hidden">
      {targetFreeTrialUsers.map(({ id }) => {
        return (
          <li key={id} className="w-[90%] max-w-[340px]">
            <Chip
              sx={{ width: '100%', justifyContent: 'space-between' }}
              label={freeTrialableUsers.find((user) => user.id === id)!.email}
              variant="outlined"
              onDelete={onDelete}
            />
          </li>
        );
      })}
    </ul>
  );
};

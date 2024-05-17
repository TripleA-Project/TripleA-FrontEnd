'use client'

import { AdminUserTypeKey } from "@/redux/slice/adminUserListSlice";
import { useAdminUserSearch } from "@/redux/slice/adminUserSearchSlice";
import FullNameSearchField from "./fields/fullName/FullNameSearchField";
import FreeTierStartDateSearchField from "./fields/freeTierStartDate/FreeTierStartDateSearchField";
import FreeTierEndDateSearchField from "./fields/freeTierEndDateSearchField/FreeTierEndDateSearchField";
import MemoSearchField from "./fields/memo/MemoSearchField";
import EmailSearchField from "./fields/email/EmailSearchField";

function UserSearchValueField () {
  const { search } = useAdminUserSearch<AdminUserTypeKey.FreeTierUsers>();

  const selectedSearchType = search.type ?? 'email';

  if (selectedSearchType === 'fullName') return <FullNameSearchField />;
  if (selectedSearchType === 'freeTierStartDate') return <FreeTierStartDateSearchField />;
  if (selectedSearchType === 'freeTierEndDate') return <FreeTierEndDateSearchField />;
  if (selectedSearchType === 'memo') return <MemoSearchField />;

  return <EmailSearchField />;
}

export default UserSearchValueField
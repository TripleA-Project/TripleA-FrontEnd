'use client';

import { FreeTrialUsersPayload } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import { AdminUserTypeKey, useAdminUserList } from '@/redux/slice/adminUserListSlice';
import dynamic from 'next/dynamic';
import { useLayoutEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

interface FreeTrialUserTableContainerProps {
  freeTierUsers: FreeTrialUsersPayload;
}

const FreeTrialUserTable = dynamic(() => import('./FreeTrialUserTable'), {
  ssr: false,
  loading(loadingProps) {
    return (
      <div className="max-h-[426px] min-h-[400px] max-w-full overflow-auto">
        <FreeTrialUserTableLoading />
      </div>
    );
  },
});

function FreeTrialUserTableContainer({ freeTierUsers }: FreeTrialUserTableContainerProps) {
  const { dispatch, setDefaultUsers, users } = useAdminUserList<AdminUserTypeKey.FreeTierUsers>();

  useLayoutEffect(() => {
    dispatch(setDefaultUsers(freeTierUsers ?? []));
  }, [freeTierUsers]); /* eslint-disable-line */

  return (
    <div className="relative max-h-[426px] min-h-[400px] max-w-full overflow-auto">
      <FreeTrialUserTable freeTierUsers={users} />
    </div>
  );
}

export default FreeTrialUserTableContainer;

const FreeTrialUserTableLoading = function FreeTrialUserTableLoading() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: '8px',
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0C1B46',
      color: theme.palette.common.white,
      fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    height: '48px',
  }));

  return (
    <Table className="min-w-max">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">선택</StyledTableCell>
          <StyledTableCell align="center">이메일</StyledTableCell>
          <StyledTableCell align="center">이름</StyledTableCell>
          <StyledTableCell align="center">무료체험 시작일</StyledTableCell>
          <StyledTableCell align="center">무료체험 종료일</StyledTableCell>
          <StyledTableCell align="center">메모</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: 4 }).map((_, idx) => {
          return (
            <StyledTableRow key={idx}>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-8 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-24 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-16 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-16 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-16 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-16 rounded-lg" />
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

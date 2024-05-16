'use client';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { FreeTrialUsersPayload } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import UserCheckBox from './UserCheckBox';
import UserTableSearching from '../../../_components/userTable/UserTableSearching';

interface FreeTrialUserTableProps {
  freeTierUsers: FreeTrialUsersPayload;
  withCheckBox?: boolean;
}

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

function FreeTrialUserTable({ freeTierUsers, withCheckBox = true }: FreeTrialUserTableProps) {
  return (
    <Table stickyHeader className="min-w-max">
      <TableHead>
        <TableRow>
          {withCheckBox ? <StyledTableCell align="center">선택</StyledTableCell> : null}
          <StyledTableCell align="center">이메일</StyledTableCell>
          <StyledTableCell align="center">무료체험 시작일</StyledTableCell>
          <StyledTableCell align="center">무료체험 종료일</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody className="relative">
        <UserTableSearching />
        {Array.from(freeTierUsers).map((freeTierUser) => {
          return (
            <StyledTableRow key={freeTierUser.email}>
              {withCheckBox ? (
                <StyledTableCell align="center">
                  <UserCheckBox user={freeTierUser} />
                </StyledTableCell>
              ) : null}
              <StyledTableCell align="center">{freeTierUser.email}</StyledTableCell>
              <StyledTableCell align="center">{freeTierUser.freeTierStartDate}</StyledTableCell>
              <StyledTableCell align="center">{freeTierUser.freeTierEndDate}</StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default FreeTrialUserTable;

FreeTrialUserTable.Loading = function FreeTrialUserTableLoading() {
  return (
    <Table className="min-w-max">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">선택</StyledTableCell>
          <StyledTableCell align="center">이메일</StyledTableCell>
          <StyledTableCell align="center">무료체험 시작일</StyledTableCell>
          <StyledTableCell align="center">무료체험 종료일</StyledTableCell>
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
            </StyledTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

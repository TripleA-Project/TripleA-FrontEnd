'use client';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { SiteUser } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import dayjs from 'dayjs';
import UserTableSearching from './UserTableSearching';
import UserCheckBox from './CheckBox';

export const membershipLabel = {
  BASIC: '일반',
  PREMIUM: '구독',
} as const;

interface UserTableProps {
  userList: SiteUser[];
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

function UserTable({ userList, withCheckBox = true }: UserTableProps) {
  return (
    <Table stickyHeader className="min-w-max">
      <TableHead>
        <TableRow>
          {withCheckBox ? <StyledTableCell align="center">선택</StyledTableCell> : null}
          <StyledTableCell align="center">id</StyledTableCell>
          <StyledTableCell align="center">이메일</StyledTableCell>
          <StyledTableCell align="center">이름</StyledTableCell>
          <StyledTableCell align="center">구독</StyledTableCell>
          <StyledTableCell align="center">관리자</StyledTableCell>
          <StyledTableCell align="center">가입일</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody className="relative">
        <UserTableSearching />
        {Array.from(userList)
          .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))
          .map((user) => {
            return (
              <StyledTableRow key={user.email}>
                {withCheckBox ? (
                  <StyledTableCell align="center">
                    <UserCheckBox user={user} />
                  </StyledTableCell>
                ) : null}
                <StyledTableCell align="center">{user.id}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.fullName}</StyledTableCell>
                <StyledTableCell align="center">{membershipLabel[user.membership]}</StyledTableCell>
                <StyledTableCell align="center">{user.memberRole === 'ADMIN' ? `✅` : ''}</StyledTableCell>
                <StyledTableCell align="center">{dayjs(user.createdAt).format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>
              </StyledTableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default UserTable;

UserTable.Loading = function UserTableLoading() {
  return (
    <Table className="min-w-max">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">선택</StyledTableCell>
          <StyledTableCell align="center">id</StyledTableCell>
          <StyledTableCell align="center">이메일</StyledTableCell>
          <StyledTableCell align="center">이름</StyledTableCell>
          <StyledTableCell align="center">구독</StyledTableCell>
          <StyledTableCell align="center">관리자</StyledTableCell>
          <StyledTableCell align="center">가입일</StyledTableCell>
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
                <span className="inline-block h-6 w-8 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-24 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-16 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-8 rounded-lg" />
              </StyledTableCell>
              <StyledTableCell align="center" className="skeleton_loading text-center">
                <span className="inline-block h-6 w-8 rounded-lg" />
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

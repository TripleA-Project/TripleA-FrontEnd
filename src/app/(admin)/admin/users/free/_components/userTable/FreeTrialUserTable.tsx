'use client';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// [TODO] API 데이터로 렌더링
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

function FreeTrailUserTable() {
  return (
    <Table stickyHeader className="min-w-max">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">선택</StyledTableCell>
          <StyledTableCell align="center">이메일</StyledTableCell>
          <StyledTableCell align="center">무료체험 시작일</StyledTableCell>
          <StyledTableCell align="center">무료체험 종료일</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody className="relative">
        <StyledTableRow>
          <StyledTableCell align="center">
            <input type="checkbox" />
          </StyledTableCell>
          <StyledTableCell align="center">test@email.com</StyledTableCell>
          <StyledTableCell align="center">2022.03.05</StyledTableCell>
          <StyledTableCell align="center">2022.03.06</StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  );
}

export default FreeTrailUserTable;

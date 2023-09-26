import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const WaitSearchLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#eee',
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: 'orange',
  },
}));

export default WaitSearchLinearProgress;

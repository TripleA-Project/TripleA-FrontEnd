import FitPage from '@/components/Layout/FitPage';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';

export default function ChartPageLoading() {
  return (
    <FitPage>
      <div className="box-border flex h-full w-full items-center justify-center px-4">
        <MuiSpinner />
      </div>
    </FitPage>
  );
}

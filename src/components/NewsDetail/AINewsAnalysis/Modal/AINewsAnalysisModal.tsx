import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Analysis, { type AnalysisProps } from '../Analysis';
import AINewsAnalysisError from '../AINewsAnalysisError';
import Loading from '../Loading';
import Header from './Header';
import { ProfilePayload } from '@/interfaces/Dto/User';
import AnalysisDemo from '../AnalysisDemo';

export interface AINewsAnalysisModalProps extends AnalysisProps {
  active?: boolean;
  onClose?: () => void;
  user?: ProfilePayload;
}

function AINewsAnalysisModal({ id, summary, active = false, onClose, user }: AINewsAnalysisModalProps) {
  const handleClick = () => {
    onClose && onClose();
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return active ? (
    <div className="fixed_inner fixed top-[45px] z-10 h-[calc(100vh-92px)] !p-0 backdrop-blur-[2px]">
      <div className="flex h-full w-full cursor-pointer items-center justify-center" onClick={handleClick}>
        <div
          className="box-border w-[320px] cursor-default rounded-xl bg-white p-2 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]"
          onClick={handleContentClick}
        >
          <ErrorBoundary FallbackComponent={AINewsAnalysisError}>
            <Suspense fallback={<Loading />}>
              <div className="mb-4">
                <Header onClose={onClose} />
              </div>
              {user?.email === process.env.NEXT_PUBLIC_DEMO_ACCOUNT ? (
                <AnalysisDemo id={id} summary={summary} />
              ) : (
                <Analysis id={id} summary={summary} />
              )}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  ) : null;
}

export default AINewsAnalysisModal;

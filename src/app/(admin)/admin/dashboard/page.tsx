import { Metadata } from 'next';
import { Suspense } from 'react';
import UserStatistics from './_components/UserStatistics';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { ErrorBoundary } from 'react-error-boundary';
import DashBoardErrorBoundary from './_components/DashBoardErrorBoundary';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 유저 통계',
  description: 'Triple A 관리자 | 유저 통계',
};

function AdminDashBoard() {
  return (
    <div className="box-border p-4">
      <div className="h-6" />
      <ErrorBoundary FallbackComponent={DashBoardErrorBoundary}>
        <Suspense
          fallback={
            <>
              <div className="box-border flex h-[calc(100vh-131px)] w-full items-center justify-center p-page px-4">
                <div className="flex w-full items-center justify-center">
                  <MuiSpinner />
                </div>
              </div>
            </>
          }
        >
          <UserStatistics />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default AdminDashBoard;

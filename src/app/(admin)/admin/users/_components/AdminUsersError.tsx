'use client';

interface AdminUsersErrorBoundaryProps {
  error: any;
}

function AdminUsersError({ error }: AdminUsersErrorBoundaryProps) {
  return <div className="flex h-[320px] w-full items-center justify-center">유저 목록을 가져올 수 없습니다</div>;
}

export default AdminUsersError;

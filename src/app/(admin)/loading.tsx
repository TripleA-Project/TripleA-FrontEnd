import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';

function AdminLoading() {
  return (
    <div className="box-border flex h-[calc(100vh-115px)] w-full items-center justify-center p-page px-4">
      <div className="flex w-full items-center justify-center">
        <MuiSpinner />
      </div>
    </div>
  );
}

export default AdminLoading;

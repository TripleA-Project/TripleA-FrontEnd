import FreeTrailUserTable from './userTable/FreeTrialUserTable';

// [TODO] API 데이터로 렌더링

function AdminFreeTrialManagePage() {
  return (
    <div>
      <section className="h-[64px]">
        <h2 className="text-xl font-bold">무료체험 관리</h2>
      </section>
      <section>
        <FreeTrailUserTable />
      </section>
    </div>
  );
}

export default AdminFreeTrialManagePage;

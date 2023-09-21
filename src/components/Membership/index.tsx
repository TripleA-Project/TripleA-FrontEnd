import MembershipGradeSummaryList from './MembershipGradeSummary/MembershipGradeSummaryList';

function Membership() {
  return (
    <div className={`box-border justify-center bg-[#F5F7F9] px-9 py-7`}>
      <div className="flex flex-col gap-6">
        <MembershipGradeSummaryList />
      </div>
    </div>
  );
}

export default Membership;

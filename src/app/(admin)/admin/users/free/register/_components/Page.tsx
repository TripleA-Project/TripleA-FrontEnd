import { SiteUsersPayload } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import FreeTierEndDateInput from './fields/end-date/FreeTierEndDateInput';
import MemoTextArea from './fields/memo/MemoTextarea';
import FreeTierStartDateInput from './fields/start-date/FreeTierStartDateInput';
import FreeTierUserInput from './fields/users/FreeTierUserInput';
import FormContext from './FormContext';
import FormControl from '../FormControl';
import GradientBox from '@/components/UI/Gradient/GradientBox';
import RegisterModal from './modal/RegisterModal';

interface AdminRegisterFreeTrialUserPageProps {
  freeTrialableUsers: SiteUsersPayload;
}

function AdminRegisterFreeTrialUserPage({ freeTrialableUsers }: AdminRegisterFreeTrialUserPageProps) {
  return (
    <div>
      <FormContext>
        <section className="sticky top-[52px] z-[3] flex h-[64px] w-full -translate-y-[52px] items-center justify-between bg-white">
          <h2 className="text-xl font-bold">무료체험 등록</h2>
          <FormControl />
          <GradientBox />
        </section>
        <section className="mt-4 flex h-96 w-full flex-col gap-x-4 gap-y-4 sm:flex-row">
          <div className="flex-1 rounded-lg border border-gray-300 bg-white">
            <FreeTierUserInput freeTrialableUsers={freeTrialableUsers} />
          </div>
          <div className="flex flex-1 flex-col gap-y-2 bg-white">
            <FreeTierStartDateInput />
            <FreeTierEndDateInput />
            <div className="flex-1">
              <MemoTextArea />
            </div>
          </div>
        </section>
        <RegisterModal />
      </FormContext>
    </div>
  );
}

export default AdminRegisterFreeTrialUserPage;

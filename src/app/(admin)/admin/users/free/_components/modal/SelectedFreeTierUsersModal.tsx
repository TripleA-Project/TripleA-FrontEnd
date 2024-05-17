'use client';

import { useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import FreeTrialModalWrapper from './FreeTrialModalWrapper';
import { AppIcons } from '@/components/Icons';
import FreeTrialUserTable from '../userTable/FreeTrialUserTable';

function SelectedFreeTierUsersModal() {
  const { modal } = useModal('selected:freeTier');

  if (modal.open && modal.modalType === 'selected:freeTier' && typeof window !== 'undefined') {
    return createPortal(
      <FreeTrialModalWrapper>
        <SelectedFreeTierUsersModalContent />
      </FreeTrialModalWrapper>,
      document.body,
    );
  }

  return null;
}

export default SelectedFreeTierUsersModal;

const SelectedFreeTierUsersModalContent = () => {
  const { modal, closeModal } = useModal('selected:freeTier');

  if (!modal.data?.selectedUsers?.length) return null;

  return (
    <section className="relative rounded-xl bg-white p-4 shadow-lg">
      <button className="absolute right-2 top-2 flex items-center justify-center" onClick={closeModal}>
        <AppIcons.CloseFill.Gray />
      </button>
      <h4 className="mb-4 text-xl font-bold">선택된 유저 목록</h4>
      <div className="relative max-h-[240px] max-w-full overflow-auto">
        <FreeTrialUserTable freeTierUsers={modal.data.selectedUsers} withCheckBox={false} />
      </div>
    </section>
  );
};

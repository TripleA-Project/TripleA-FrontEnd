'use client';

import { useModal } from '@/redux/slice/modalSlice';
import { createPortal } from 'react-dom';
import UserManageModalWrapper from './UserManageModalWrapper';
import { AppIcons } from '@/components/Icons';
import UserTable from '../userTable/UserTable';

function SelectedUsersModal() {
  const { modal } = useModal('selected:user');

  return modal.open && modal.modalType === 'selected:user' && typeof window !== 'undefined'
    ? createPortal(
        <UserManageModalWrapper>
          <SelectedUsersModalContent />
        </UserManageModalWrapper>,
        document.body,
      )
    : null;
}

export default SelectedUsersModal;

const SelectedUsersModalContent = () => {
  const { modal, closeModal } = useModal('selected:user');

  if (!modal.data?.selectedUsers?.length) return null;

  return (
    <section className="relative p-4">
      <button className="absolute right-2 top-2 flex items-center justify-center" onClick={closeModal}>
        <AppIcons.CloseFill.Gray />
      </button>
      <h4 className="mb-4 text-xl font-bold">선택된 유저 목록</h4>
      <div className="relative max-h-[240px] max-w-full overflow-auto">
        <UserTable userList={modal.data.selectedUsers} withCheckBox={false} />
      </div>
    </section>
  );
};

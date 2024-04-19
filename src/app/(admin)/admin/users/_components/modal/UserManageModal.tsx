import AsAdminModal from './AsAdminModal';
import AsUserModal from './AsUserModal';
import DeleteUserModal from './DeleteUserModal';

function UserManageModal() {
  return (
    <>
      <DeleteUserModal />
      <AsAdminModal />
      <AsUserModal />
    </>
  );
}

export default UserManageModal;

interface UserManageModalWrapper {
  children: React.ReactNode;
}

function UserManageModalWrapper({ children }: UserManageModalWrapper) {
  return (
    <div className="fixed_inner fixed top-0 z-[12] h-full bg-black/10 backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative box-border w-full rounded-xl bg-white p-3 shadow-lg">{children}</div>
      </div>
    </div>
  );
}

export default UserManageModalWrapper;

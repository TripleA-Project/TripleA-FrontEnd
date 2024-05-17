interface FreeTrialModalWrapper {
  children: React.ReactNode;
}

function FreeTrialModalWrapper({ children }: FreeTrialModalWrapper) {
  return (
    <div className="fixed_inner fixed top-0 z-[12] h-full bg-black/10 backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative box-border h-max max-h-full w-full overflow-auto p-3">{children}</div>
      </div>
    </div>
  );
}

export default FreeTrialModalWrapper;

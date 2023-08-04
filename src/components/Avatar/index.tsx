import { AppProfiles, ProfileKeys } from '../Icons';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  profileIndex?: number;
  fullName: string;
}

function Avatar({ fullName, profileIndex, ...props }: AvatarProps) {
  const keys = `Profile${profileIndex ?? 1}` as ProfileKeys;
  const Profile = AppProfiles[keys];

  return (
    <div
      className="flex h-[66px] w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F5F7F9]"
      {...props}
    >
      <Profile />
    </div>
  );
}

export default Avatar;

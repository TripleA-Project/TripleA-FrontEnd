import Image from 'next/image';
import Profile from '../../../public/profile1.png';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  fullName: string;
}

function Avatar({ fullName, ...props }: AvatarProps) {
  return (
    <div
      className="flex h-[66px] w-[66px] items-center justify-center overflow-hidden rounded-full bg-[#F5F7F9]"
      {...props}
    >
      <Image src={Profile} alt="profile image" />
    </div>
  );
}

export default Avatar;

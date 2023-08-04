import { MdSentimentVeryDissatisfied, MdOutlineErrorOutline } from 'react-icons/md';
import { AppIcons } from '../Icons';
import { type IconBaseProps } from 'react-icons';

interface NotificationIconProps extends IconBaseProps {}

export const NotificationIcons = {
  Lock: (props: NotificationIconProps) => <AppIcons.Lock {...props} />,
  VeryDissatisfied: (props: NotificationIconProps) => <MdSentimentVeryDissatisfied {...props} />,
  Error: (props: NotificationIconProps) => <MdOutlineErrorOutline {...props} />,
};

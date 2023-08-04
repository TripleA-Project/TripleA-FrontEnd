import { type IconBaseProps } from 'react-icons';
import { SearchIcon } from './SearchIcon';
import { BackArrowGray, NoBarBackArrowBlack } from './BackArrow';
import { CloseFillDarkGray, CloseFillGray, CloseFillOrange } from './CloseFill';
import { BlackLogo, GrayLogo, OrangeLogo } from './Logo';
import { LockIcon } from './Lock';
import { BookmarkFill, BookmarkNoFill } from './Bookmark';
import { HeartGrayFill, HeartOrangeFill, HeartOutline } from './Heart';
import { ShareIcon } from './ShareIcon';
import { TranslationIcon } from './TranslationIcon';
import { EditIcon } from './EditIcon';
import { TrendNewsIcon } from './TrendNewsIcon';
import { MessageIcon } from './MessageIcon';
import { Profile1, Profile2, Profile3, Profile4 } from './Profile';

export interface IconProp extends IconBaseProps {}
type Icon = (props: IconProp) => JSX.Element;
interface Icons {
  Search: Icon;
  BackArrow: {
    Bar: Icon;
    NoBar: Icon;
  };
  CloseFill: {
    Gray: Icon;
    DarkGray: Icon;
    Orange: Icon;
  };
  Lock: Icon;
  Translation: Icon;
  Share: Icon;
  Edit: Icon;
  Bookmark: {
    NoFill: Icon;
    Fill: Icon;
  };
  Heart: {
    Outline: Icon;
    Fill: {
      Gray: Icon;
      Orange: Icon;
    };
  };
  TrendNews: Icon;
  Message: Icon;
}

interface Logos {
  Orange: Icon;
  Gray: Icon;
  Black: Icon;
}

export type ProfileKeys = 'Profile1' | 'Profile2' | 'Profile3' | 'Profile4';

interface Profiles extends Record<ProfileKeys, Icon> {}

export const AppLogos: Logos = {
  Orange: (props) => <OrangeLogo {...props} />,
  Gray: (props) => <GrayLogo {...props} />,
  Black: (props) => <BlackLogo {...props} />,
};

export const AppProfiles: Profiles = {
  Profile1: (props) => <Profile1 {...props} />,
  Profile2: (props) => <Profile2 {...props} />,
  Profile3: (props) => <Profile3 {...props} />,
  Profile4: (props) => <Profile4 {...props} />,
};

export const AppIcons: Icons = {
  Search: (props) => <SearchIcon {...props} />,
  BackArrow: {
    Bar: (props) => <BackArrowGray {...props} />,
    NoBar: (props) => <NoBarBackArrowBlack {...props} />,
  },
  CloseFill: {
    Gray: (props) => <CloseFillGray {...props} />,
    DarkGray: (props) => <CloseFillDarkGray {...props} />,
    Orange: (props) => <CloseFillOrange {...props} />,
  },
  Lock: (props) => <LockIcon {...props} />,
  Translation: (props) => <TranslationIcon {...props} />,
  Share: (props) => <ShareIcon {...props} />,
  Edit: (props) => <EditIcon {...props} />,
  Bookmark: {
    NoFill: (props) => <BookmarkNoFill {...props} />,
    Fill: (props) => <BookmarkFill {...props} />,
  },
  Heart: {
    Outline: (props) => <HeartOutline {...props} />,
    Fill: {
      Gray: (props) => <HeartGrayFill {...props} />,
      Orange: (props) => <HeartOrangeFill {...props} />,
    },
  },
  TrendNews: (props) => <TrendNewsIcon {...props} />,
  Message: (props) => <MessageIcon {...props} />,
};

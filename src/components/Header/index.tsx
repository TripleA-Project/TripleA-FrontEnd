import React from 'react';
import HeaderItem from './HeaderItem';
import { IconButtonProps } from '../Button/IconButton';
import SearchBar from './SearchBar';

export interface HeaderProps {
  leftIcon?: IconButtonProps['icon'] | 'LogoIcon';
  rightIcon?: IconButtonProps['icon'];
  title?: string;
  pathName?: string;
}

/**
 *
 *
 * ```tsx
 *import { MdOutlineArrowBackIos } from 'react-icons/md'
 *
 * // 사용예시
 * //페이지 단에서 호출하며 프롭스로 전달
 * // 주의 사항
 * //리액트 아이콘 내려줄 시 해당 페이지는 클라이언트 컨포넌트가 되야함
 * // title 프롭스 전달시 해당 페이지에 변경 사항 없는 타이틀 title= '차트' 이런 식으로 삽입
 * // 기사 볼 시나 차트의 심볼 들어갈 시 데이터에서 받아온 정보를 프롭스를 타이틀에 title={data.symbol} 삽입
 * // /search 주소에선 <Header/> 호출시 searchInput 바로 나옴
 * <Header leftIcon={MdOutlineArrowBackIos} title={data} rightIcon='heart' />
 * <Header leftIcon='arrowleft' title='내가 본 기사' rightIcon='heartfill' />
 *
 * ```
 *
 *
 *
 * @returns JSX.Element
 */

function Header({ leftIcon, rightIcon, title, pathName }: HeaderProps) {
  return (
    <header className="fixed left-0 top-0 z-10 w-full bg-white">
      <div className="mx-auto w-full min-w-[390px] max-w-[768px]">
        {pathName === '/search' ? (
          <SearchBar leftIcon={leftIcon} rightIcon={rightIcon} />
        ) : (
          <HeaderItem leftIcon={leftIcon} rightIcon={rightIcon} title={title} />
        )}
      </div>
    </header>
  );
}

export default Header;

import ActionInput from '@/components/ActionInput/ActionInput';
import Button from '@/components/Button/Button';
import IconButton from '@/components/Button/IconButton';
import { HeartIcon } from '@/components/Button/Icons';
import { Metadata } from 'next';
import Image from 'next/image';
import Logo from '/public/Logo.svg'
export const metadata: Metadata = {
  title: '로그인',
  description: 'Triple A 로그인',
};


// onClick이벤트 사용위해 아래처럼 function만들어 사용하시면 됩니다
// icons에서 가져와서 사용해주세요😀
function Login() {
  const handleClick = async () => {
    'use server';
    console.log('얍얍!!');
  };
  const handleClick2 = async () => {
    'use server';
    console.log('두번째 얍')
  }
  return (
    <div>
      <div>
        <div  className='flex justify-center items-center  py-11 font-semibold'>
          <button className='flex gap-3'>
            <Image src={Logo} alt='Logo' />Triple A
          </button>
        </div>
        <div className="flex-coulmn">
          <label className="ml-4 text-xs font-semibold text-[#454C52]" htmlFor="email">
            이메일
          </label>
          <input
            placeholder="이메일 입력"
            id="email"
            className="mx-auto mt-1 flex h-[46px] w-[358px] rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1] "
          />
        </div>
        <div className="flex-coulmn mt-3">
          <label className="ml-4 text-xs font-semibold text-[#454C52]" htmlFor="password">
            비밀번호
          </label>
          <input
            placeholder="비밀번호 입력"
            id="password"
            className="mx-auto mt-1 flex h-[46px] w-[358px] rounded-lg border-[1px] border-solid pl-4 placeholder-[#DBDEE1]"
          />
        </div>
        <div className="align-center mt-6">
          <input className="ml-4 shadow-none" type="checkbox" id="checkbox" value={'자동로그인'} />
          <label className="ml-2 text-sm text-[#5B6267]" htmlFor="checkbox">
            자동 로그인
          </label>
        </div>
        <Button className="box-border mx-auto mt-2 font-bold " sizeTheme='medium' bgColorTheme="lightgray" textColorTheme="white">
          로그인
        </Button>
        <div className="mx-auto flex justify-center">
          <button className="text-xs text-[#454C52]" onClick={handleClick}>회원가입</button>
          <button className="p-5 text-xs text-[#454C52]">아이디찾기</button>
          <button className="text-xs text-[#454C52]">비밀번호찾기</button>
        </div>
       
      </div>
    </div>
  );
}

export default Login;

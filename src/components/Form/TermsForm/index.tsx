'use client';

import Button from '@/components/Button/Button';
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';
import { UseStepFormContext } from '../StepForm';
import IconButton from '@/components/Button/IconButton';
import { useRef, useState } from 'react';
import { CheckFillIcon, CheckIcon } from '@/components/Button/Icons';
import SignupModal from '@/components/Modal/SignupModal';
import { signup } from '@/service/auth';
import { FormData } from '@/interfaces/FormData';

export interface TermsFormData {
  newsLetter: boolean;
}

function TermsForm() {
  const {
    register,
    handleSubmit,
    done,
    prev,
    getValues,
    setValue,
    formState: { isValid },
  } = useFormContext() as UseStepFormContext<FormData>;

  const checkedAllRef = useRef<HTMLInputElement>(null);

  const values = getValues();

  const [openModal1, setOpenModal1] = useState(false);
  const onClickModal1 = () => {
    setOpenModal1(!openModal1);
  };
  const [openModal2, setOpenModal2] = useState(false);
  const onClickModal2 = () => {
    setOpenModal2(!openModal2);
  };

  const onValid = async (data: FormData) => {
    try {
      const signupResponse = await signup({
        email: values.email!,
        password: values.password!,
        passwordCheck: values.passwordCheck!,
        fullName: values.fullName!,
        newsLetter: values.newsLetter!,
        emailKey: values.emailKey!,
      });
      console.log(signupResponse);

      done();
    } catch (error) {
      console.error(error);
    }
  };

  const onInvalid = (errors: FieldErrors<FormData>) => {
    console.log({ errors });
  };

  const [CheckedAll, setCheckedAll] = useState(false);
  const [Checked1st, setChecked1st] = useState(false);
  const [Checked2nd, setChecked2nd] = useState(false);
  const [togleCheck, setTogleCheck] = useState(getValues().newsLetter);

  const handleCheckAll = () => {
    const targetChecked = checkedAllRef.current?.checked ?? false;

    setCheckedAll(targetChecked);

    setChecked1st(targetChecked);
    setChecked2nd(targetChecked);
    setTogleCheck(targetChecked);

    setValue('newsLetter', targetChecked);
  };

  return (
    <div>
      <form className="flex-coulmn pt-[54px]" onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className=" mt-5 flex pt-[25px] text-lg font-semibold">이용약관에 동의해주세요.</div>
        <div>
          <div className="border-lightgray mt-10 flex border-b">
            <input ref={checkedAllRef} hidden id="all" type="checkbox"></input>
            <label
              onClick={handleCheckAll}
              className="ml-2 flex items-center justify-center gap-2 pb-[21px]"
              htmlFor="all"
            >
              {CheckedAll ? <CheckFillIcon /> : <CheckIcon />}
              <span className=" font-bold">전체 동의하기</span>
            </label>
          </div>
          <div>
            <div className="mt-11 flex">
              <input hidden id="first" type="checkbox"></input>
              <label
                onClick={() => {
                  setChecked1st((prev) => !prev);
                }}
                className="ml-2 flex items-center justify-center gap-2"
                htmlFor="first"
              >
                {Checked1st ? <CheckFillIcon /> : <CheckIcon />}
                <span className="font-bold">[필수]이용약관 동의</span>
              </label>
              <IconButton
                type="button"
                icon="right"
                bgColorTheme="none"
                textColorTheme="black"
                onClick={onClickModal1}
              />
            </div>
          </div>
          <div>
            <div className="mt-4 flex">
              <input hidden id="personalInfo" type="checkbox"></input>
              <label
                onClick={() => {
                  setChecked2nd((prev) => !prev);
                }}
                className="ml-2 flex items-center justify-center gap-2"
                htmlFor="personalInfo"
              >
                {Checked2nd ? <CheckFillIcon /> : <CheckIcon />}
                <span className="font-bold">[필수]개인정보 처리방침 동의</span>
              </label>
              <IconButton
                type="button"
                icon="right"
                bgColorTheme="none"
                textColorTheme="black"
                onClick={onClickModal2}
              />
            </div>
          </div>
          <div>
            <div className="mt-4 flex">
              <input hidden id="newsLetter" {...register('newsLetter', { value: togleCheck })} type="checkbox"></input>
              <label
                onClick={() => {
                  setTogleCheck((prev) => !prev);
                }}
                className="ml-2 flex items-center justify-center gap-2"
                htmlFor="newsLetter"
              >
                {togleCheck ? <CheckFillIcon /> : <CheckIcon />}
                <span className="font-bold">[선택]뉴스레터 이메일 수신 동의</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-col">
          <Button
            type="submit"
            sizeTheme="fullWidth"
            className="relative top-[300px] mx-auto mt-14 box-border font-bold"
            bgColorTheme={!Checked1st || !Checked2nd ? 'lightgray' : 'orange'}
            textColorTheme="white"
            disabled={!Checked1st || !Checked2nd}
          >
            다음
          </Button>
        </div>

        {openModal1 && (
          <SignupModal
            size="small"
            title={<h2>서비스 이용약관</h2>}
            content={
              <p>
                <span className="font-semibold">제 1조 목적</span>
                <br />
                본 이용약관(이하 약관이라 함)은 주식회사 시스메틱(이하 회사라 함)이 제공하는 모야 서비스(이하 서비스라
                함)의 이용에 관하여 회사와 본 서비스를 이용하는 (이하 회원이라 함)과의 권리, 의무 및 책임 사항, 기타
                필요한 사항 규정을 목적으로 합니다.
                <br />
                <br />
                서비스를 이용하고자 하는 회원은 본 약관의 규정에 따라 이용해야만 합니다.
                <br />
                비회원의 경우 회사가 제공하는 서비스기능에 대해 이용이 불가능합니다.
                <br />
                본 서비스에 개별 이용약관이 존재할 경우, 고객은 본 약관 외에 개별 이용약관의 규정에 따라 본 서비스를
                이용해야 합니다. 회사는 합리적인 사유에 의거해 약관을 변경할 수 있으며, 약관이 변경될 경우 이를
                공시합니다. 본 약관의 조건에 따라, 회사는 회원에게 서비스를 사용할 수 있는 제한적이며 이전 불가능한,
                비배타적, 비상업적인 권리를 부여합니다.
                <br />
                <br />
                <span className="font-semibold">제 2조 용어의 정의</span>
                <br />
                본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                <br />
                서비스: 접속 가능한 유무선 단말기의 종류와는 상관없이 이용 가능한, 회사가 제공하는 모든 서비스를
                의미합니다. 회원: 회사와 서비스 이용 계약을 체결하고, 서비스에 접속하여 본 약관에 따라 회사가 제공하는
                서비스를 이용하는 개인 또는 기업을 의미합니다.
                <br />
                아이디(ID): 고객의 식별과 서비스 이용을 위하여 고객이 정하고 회사가 승인하는 로그인 수단(e-mail,
                facebook ID, google+ ID)을 의미합니다.
                <br />
                비밀번호: 회원이 부여 받은 아이디(ID) 와 일치하는 회원의 비밀보호를 위해 회원 자신이 설정한 문자, 숫자의
                조합을 의미합니다.
                <br />
                유료 서비스: 회사가 유료로 제공하는 각종 서비스(아이템 등 월 또는 년으로 비용을 지불 하는 서비스) 및
                제반 서비스를 의미합니다. 애플리케이션이란 iOS와 AndroidOS에서 이용할 수 있도록 설계되어, 앱스토어나
                구글 플레이스토어 등의 플랫폼을 통하여 배포되는 무선 통신장치용 프로그램을 의미합니다.
                <br />
                <br />
                <span className="font-semibold">제 3조 약관의 명시와 설명 및 개정</span>
                <br />
                본 약관은 회사가 제공하는 서비스의 내용과 회사정보와 함께 회원이 쉽게 확인 할 수 있도록 모야 APP과
                웹사이트(http://watch.moya.ai/policy)에 게시합니다. 회사는 약관의 규제에 관한 법률. 정보통신망 이용촉진
                및 정보보호 등에 관한 법률 등에 관계법령을 위배하지 않는 범위에서 이 약관을 개정 할 수 있습니다. 회사가
                약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여야 하며, 약관이 변경되었음을 적용일자 30일 전부터
                적용일자까지 공지해야 합니다. 회원에게 불리한 약관개정의 경우에는 공지 외에 일정기간 서비스 내 공지사항,
                전자우편, 로그인 시 동의 창 등 전자적 수단을 통해 명확히 통지합니다. 회원이 개정약관에 동의하지 않는
                경우 회사는 개정 약관의 내용을 적용할 수 없으며, 이 경우 회원은 이용계약을 해지할 수 있습니다. 약관 개정
                시, 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우에는 회사는 이용계약을 해지할 수 있으며 회원이
                가입한 유료서비스 이용기간이 남아 있는 경우, 유료서비스 환불은 7조 “유료서비스 결제 및 환불정책”을
                따릅니다. 회원이 지속적으로 접속하거나, 서비스를 이용하는 것은 회원이 약관의 가장 최신 버전을 승인했음을
                의미합니다.
                <br />
                <br />
                <span className="font-semibold">제 4조 약관 외 준칙</span>
                <br />
                회사는 유료 서비스 및 개별 서비스에 대해서는 별도의 이용약관 및 정책(이하 유료 서비스약관 등)을 둘 수
                있으며, 해당 내용이 이 약관과 상충할 경우에는 유료 서비스약관 등이 우선하여 적용됩니다. 이 약관에서
                정하지 아니한 사항이나 해석에 대해서는 유료 서비스약관 등 및 관계법령(&quot;정보통신망 이용촉진 및
                정보보호등에 관한 법률&quot;, &quot;약관의 규제에 관한 법률, 전기통신사업법&quot; 등) 또는 상관례에
                따릅니다.
                <br />
                <br />
                <span className="font-semibold">제 5조 이용계약 체결</span>
                <br />
                이용계약은 회원이 되고자 하는 자가 약관의 내용에 대하여 동의를 한 다음 회원 가입신청을 하고 회사가 이를
                승낙하여 체결됩니다. 회사는 가입신청자의 신청을 즉시 승낙함을 원칙으로 합니다. 다만, 다음에 해당하는
                신청에 대하여는 승낙을 하지 않거나 사후에 계약을 해지할 수 있습니다. 가입신청자가 이 약관에 의해
                회원자격을 상실한 적이 있는 경우. 단, 회사의 재가입 승낙을 얻은 경우는 예외로 함 허위의 정보를
                기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우(facebook ID, e-mail, google+ ID 도용 등) 회원의
                귀책사유로 인해 승인이 불가하거나, 기타 규정을 위반하여 신청하는 경우 2항 b호에 해당되는 경우 부정한
                목적과 방법으로 이용신청을 한 회원의 계정은 사전 통지 없이 삭제될 수 있으며, 관법령에 따라 처벌을 받을
                수 있습니다. 회사는 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있으며, 이런 경우 회사는
                이를 가입신청자에게 고지합니다. 이용계약의 성립 시기는 회사가 가입완료를 신청절차 상에서 표시한 시점으로
                합니다. 회사는 회원에 대해 회사 정책에 따라 등급별로 구분하여 이용범위, 서비스 메뉴 등을 세분하여 이용에
                차등을 둘 수 있습니다.
                <br />
                <br />
                <span className="font-semibold">제 6조 애플리케이션</span>
                <br />
                사용 애플리케이션의 기존 버전을 사용할 수 있는 회원의 권리는 회원의 기기에 설치된 애플리케이션의 가장
                최신 버전을 받을 수 있거나 보유하게 되는 즉시 소멸합니다 회원 다음과 같은 행위를 할 수 없습니다.
                애플리케이션의 임대, 재허락, 발행, 수정, 개조, 또는 분해 애플리케이션을 탑재할 권한이 없는, 불법적인,
                위조 또는 개조된 하드웨어나 소프트웨어의 사용 애플리케이션의 이전 버전 재설치(&quot;다운그레이드&quot;)
                애플리케이션에 접속하거나 애플리케이션을 이용하는 것과 관련한 모든 법률, 규칙 또는 회사나 제3자의 지위
                또는 권리 위반행위 회사를 통하지 않고 다른 방식으로 애플리케이션을 취득함
                <br />
                <br />
                <span className="font-semibold">제 7조 유료 서비스 결제 및 환불</span>
                <br />
                회원은 유료서비스에 대하여 다음의 방법 중 가능한 방법을 선택하여 결제할 수 있으며, 회사는 회원이 선택한
                결제방법에 대하여 어떠한 명목의 수수료도 추가하여 징수하지 않습니다. 단, 회원이 선택한 결제수단의
                제공업체가 별도로 존재할 경우, 회원은 해당 결제수단에서 요구되는 절차를 이행하여야 합니다. 아이폰 및
                안드로이드 등 플랫폼을 통한 인앱결제 회원은 유료서비스를 이용할 때 다음에 해당하는 행위를 하여서는
                안됩니다. 비정상적인 방법으료 유료서비스를 이용하거나 시스템에 접근 타인의 명의, 결제정보를 도용하여
                회사의 유료서비스를 이용 기타 불법적이거나 부당한 행위 유료서비스는 구독 형태로 제공되며, 자동 구독
                갱신이 꺼져있지 않은 경우 현재 구독기간 종료 24시간 전에 다음 구독이 갱신됩니다. 구독 취소는 앱을
                다운로드 받은 플랫폼의 정책을 따릅니다. 회원에게 유료서비스 이용을 위한 대금이 잘못 과금된 경우, 회사는
                회원이 대금을 결제한 방법과 동일한 방법으로 과금된 금액을 환불합니다. 회사는 유료서비스를 연중무휴, 1일
                24시간 제공함을 원칙으로 합니다. 회사는 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상
                상당한 이유가 있는 경우 유료서비스의 제공을 일시적으로 중단할 수 있고, 이 경우 회사는 이를 회원에게
                통지합니다. 단, 회사가 사전에 통지할 수 없는 사유가 있는 경우 이를 사후에 통지할 수 있습니다. 회사는
                상당한 이유가 있는 경우, 제공하고 있는 전부 또는 일부의 유료서비스를 변경할 수 있습니다. 단, 변경된
                내용이 중대하거나 회원에게 불리한 경우에는 회사가 해당 유료서비스를 제공받는 회원에게 통지합니다. 회원은
                유료서비스 이용 전 회사가 제공하는 유료서비스의 상세 내용과 거래의 조건을 정확히 확인한 후 구매햐여야
                합니다. 이를 확인하지 않고 구매하여 발생한 손실 및 손해는 회원에게 귀속됩니다. 회사가 관계 법령의 변경,
                천재지변 또는 이에 준하는 불가항력으로 인해 유료서비스를 재공할 수 없는 경우에는 유료서비스 제공에 대한
                책임이 면제됩니다. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 「정보통신망 이용촉진 및
                정보보호에 관한 법률」, 「콘텐츠산업진흥법」, 「전자상거래등에서의 소비자보호에 관한 법률」, 「약관의
                규제에 관한 법률」, 문화체육관광부장관이 정하는 「디지털콘텐츠 이용자보호지침」 및 기타 관계 법령, 또는
                상관례에 따릅니다.
                <br />
                <br />
                <span className="font-semibold">제 8조 회원정보의 변경 및 탈퇴</span>
                <br />
                회원은 설정 페이지에서 로그인 ID를 열람하거나 탈퇴할 수 있습니다. 서비스 관리를 위해 필요한 로그인ID,
                성별은 수정이 불가능합니다. 로그인 비밀번호는 비밀번호 찾기 기능을 이용해 변경 가능합니다. 제 8조 인터넷
                접속 애플리케이션을 포함한 서비스는 인터넷 접속을 필요로 할 수 있으며, 인터넷 접속 및 사용에 따른 요금
                발생은 회원의 책임 하에 있습니다.
                <br />
                <br />
                <span className="font-semibold">제 9조 연락처</span>
                <br />
                만약 회원이 서비스에 대한 질문 또는 불만족스러운 부분이 있을 경우 다음의 연락처로 연락 주시기 바랍니다.
                <br />
                moya.ai / help@moya.ai
                <br />
                <br />
                <span className="font-semibold">제 10조 부칙</span>
                <br />
                이 약관은 2023년 01월 01일부터 적용됩니다.
                <br />
                이용약관 버전번호: 2.1
                <br />
                공고일자 : 2023년 01월 01일
                <br />
                시행일자 : 2023년 01월 01일
              </p>
            }
            mainBtn="메인 버튼"
            subBtn="서브 버튼"
          />
        )}
        {openModal2 && (
          <SignupModal
            size="small"
            title={<h2>개인정보 처리방침</h2>}
            content={
              <p>
                이 개인정보처리방침은 주식회사 시스메틱이 어떤 정보를 수집, 사용, 관리하는지에 대한 내용을 포함하고
                있습니다.
                <br />
                주식회사 시스메틱(“회사”)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련
                법령상의 개인정보보호 규정을 준수하며,
                <br />
                관련 법령에 의거한 개인정보처리방침을 정해 이용자 권익 보호에 최선을 다하고 있습니다.
                <br />
                회사는 개인정보처리방침을 통해 제공되는 서비스(&quot;서비스&quot;)를 이용하는 회원 및 콘텐츠 구독자(이하
                ‘이용자’)로부터 수집하는
                <br />
                개인정보의 항목, 개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용 기간과 개인정보 보호를 위해
                취해지고 있는 조치를
                <br />
                안내해 드립니다. 이 개인정보처리방침은 2023년 1월 1일부터 적용됩니다.
                <br />
                <br />
                <span className="font-semibold">수집하는 개인정보의 항목 및 수집 방법</span>
                <br />
                <br />
                닉네임, 아이디(이메일 주소), 비밀번호, 휴대폰 번호는 필수로 수집합니다.
                <br />
                유료 서비스를 이용하면 결제와 관련된 정보를 추가로 수집합니다.
                <br />
                IP 주소, 쿠키, 방문기록, 서비스 이용 기록은 서비스를 이용할 때 자동으로 수집됩니다. 회사는 서비스 제공을
                위해 기본적으로 몇 가지 정보를 요청합니다.
                <br />
                •필수: 닉네임, 아이디(이메일 주소), 비밀번호, 휴대폰 번호
                <br />
                •(카드 결제 시) 카드번호, 유효기간, 비밀번호 앞 2자리, 생년월일 또는 사업자등록번호
                <br />
                ◦단, 회사는 카드번호 뒤 4자리를 제외한 결제 정보를 보관하지 않습니다.
                <br />
                IP 주소, 쿠키, 방문 기록, 서비스 이용 기록은 이용자가 서비스를 이용할 때 자동으로 수집됩니다.
                <br />
                회사는 사이트를 통해 개인정보를 수집합니다.
                <br />
                <br />
                <span className="font-semibold">개인정보의 수집 및 이용 목적</span>
                <br />
                <br />
                수집한 개인정보는 서비스 제공에 관한 계약 이행및 이용 요금 정산, 회원 관리, 서비스 개선 및 마케팅,
                광고에의 활용을 위해 사용됩니다.
                <br />
                회사는 수집한 개인정보를 서비스 제공에 관한 계약 이행, 이용자 관리, 서비스 개선 및 마케팅, 광고에의
                활용을 목적으로 사용하고 있습니다.
                <br />
                • 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 이용 요금 정산: 서비스 및 콘텐츠 제공, 특정 맞춤
                서비스 제공, 서비스 구매 및 요금 결제(구독결제서비스 결제 포함), 증빙서류 발급, 요금추심, 환불 처리 등
                <br />
                • 이용자 관리: 서비스 이용에 따른 본인 확인, 개인 식별, 부정 이용 방지, 회원 가입 및 서비스 이용 의사
                확인, 가입 횟수 제한, 분쟁 조정을 위한 기록 보존, 불만처리 등 민원처리, 고지사항 전달 등<br />
                • 서비스 개선 및 마케팅, 광고에의 활용: 서비스 이용에 대한 통계 확인, 서비스의 유효성 확인, 이벤트 및
                광고성 정보 제공, 접속 빈도 파악 등<br />
                <br />
                <span className="font-semibold">개인정보의 보유 및 이용기간</span>
                <br />
                <br />
                개인정보는 원칙적으로 수집 및 이용 목적이 달성되면 파기하지만 경우에 따라 일정 기간 보관할 수 있습니다.
                <br />
                회사가 수집한 개인정보는 원칙적으로 수집 및 이용 목적이 달성되면 지체없이 파기합니다.
                <br />
                단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를
                부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다. 이용자에게 개인정보 보관기간에 대해
                회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는 아래와 같습니다.
                <br />
                <span className="font-semibold">부정 가입 및 이용 방지</span>
                <br />
                •항목: 이메일 주소, 닉네임, 휴대폰 번호
                <br />
                •보존 기간: 탈퇴일로부터 1년
                <br />
                <span className="font-semibold">분쟁 조정 및 이용자 문의 대응</span>
                <br />
                •항목: 이메일 주소, 닉네임, 휴대폰 번호
                <br />
                •보존 기간: 탈퇴일로부터 1년
                <br />
                회사는 아래와 같이 관계법령에서 정한 일정한 기간동안 개인정보를 보관합니다. 이 경우 회사는 보관하는
                정보를 그 보관의 목적으로만 이용합니다.
                <br />
                <span className="font-semibold">계약 또는 청약철회 등에 관한 기록</span>
                <br />
                •보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률
                <br />
                •보존 기간: 5년
                <br />
                <span className="font-semibold">대금결제 및 재화 등의 공급에 관한 기록</span>
                <br />
                •보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률
                <br />
                •보존 기간: 5년
                <br />
                <span className="font-semibold">소비자의 불만 또는 분쟁처리에 관한 기록</span>
                <br />
                •보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률
                <br />
                •보존 기간: 3년
                <br />
                <span className="font-semibold">표시/광고에 관한 기록</span>
                <br />
                •보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
                <br />
                •보존 기간 : 6개월
                <br />
                <span className="font-semibold">본인확인에 관한 기록</span>
                <br />
                •보존 이유 : 정보통신망 이용촉진 및 정보보호 등에 관한 법률
                <br />
                •보존 기간 : 6개월
                <br />
                <span className="font-semibold">웹사이트 방문기록</span>
                <br />
                •보존 이유 : 통신비밀보호법
                <br />
                •보존 기간 : 3개월
                <br />
                <span className="font-semibold">전자금융 거래에 관한 기록</span>
                <br />
                •보존 이유: 전자금융거래법
                <br />
                •보존 기간: 5년
                <br />
                <br />
                <span className="font-semibold">개인정보 수집 이용에 대한 동의를 거부할 권리</span>
                <br />
                <br />
                위의 개인정보 수집,이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 서비스 제공을
                받을수 없거나 제약이 있을수 있습니다. <br />
                <br />
                <span className="font-semibold">개인정보 제공 및 취급위탁</span>
                <br />
                <br />
                개인정보는 원칙적으로 외부에 제공하지 않지만 경우에 따라 제공할 수 있습니다. 유료 서비스를 이용하는 경우
                요금 정산을 위해 정해진 수탁업체에게 정해진 범위 내에서 개인정보를 위탁 처리합니다.
                <br />
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                <br />
                다만, 아래의 경우는 예외로 합니다.
                <br />
                <br />
                •이용자가 사전에 동의한 경우
                <br />
                •법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
                <br />
                •통계작성, 학술연구나 시장조사를 위해 특정 개인을 식별할 수 없는 형태로 가공해 제공하는 경우
                <br />
                회사는 편리하고 더 나은 서비스를 제공하기 위해 정해진 범위 내에서 개인정보를 위탁해 처리합니다.
                <br />
                •결제 처리: 나이스페이먼츠(주)
                <br />
                •서비스 제공을 위한 서버 운영: AWS(Amazon Web Services, Inc.)
                <br />
                이용되는 개인정보 항목은 스티비 계정 이메일 주소, 서비스 이용 기록에 한함.
                <br />
                <br />
                <span className="font-semibold">개인정보 파기절차 및 파기방법</span>
                <br />
                <br />
                개인정보의 수집 및 이용 목적이 달성 되면, 개인정보를 신속하고 안전한 방법으로 파기합니다.
                <br />
                회사는 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 해당 정보를 지체
                없이 파기합니다.
                <br />
                이용자가 제공한 정보는 수집 및 이용 목적이 달성된 후 별도의 데이터베이스로 옮겨져(종이의 경우 별도의
                서류함)
                <br />
                내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정기간 저장된 후
                파기됩니다.
                <br />
                별도 데이터베이스로 옮겨진 개인정보는 법률에 의한 경우가 아니면 보유되는 이외의 다른 목적으로 이용되지
                않습니다.
                <br />
                전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 이용해 삭제하고, 종이에 출력된
                개인정보는 분쇄기로 분쇄하거나 소각해 파기됩니다.
                <br />
                <br />
                <span className="font-semibold">만 14세 미만 아동에 관한 사항</span>
                <br />
                <br />
                회사는 만 14세 미만 아동의 회원 가입을 받지 않습니다.
                <br />
                <br />
                <span className="font-semibold">개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</span>
                <br />
                적절하고 유용한 서비스를 제공하기 위해 쿠키를 사용합니다. 웹 브라우저 설정에서 쿠키 저장을 거부할 수
                있습니다.
                <br />
                회사는 이용자에게 보다 적절하고 유용한 서비스를 제공하기 위해 이용자의 정보를 수시로 저장하고 불러오는
                &apos;쿠키(cookie)&apos;를 사용합니다.
                <br />
                쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터로 전송하는 아주 작은 텍스트 파일로서
                이용자의 기기에 저장됩니다. 이용자는 쿠키의 사용여부를 선택할 수 있습니다.
                <br />
                쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를
                허용하거나 쿠키를 저장할 때마다 확인을 거치거나,
                <br />
                모든 쿠키의 저장을 거부할 수 있습니다. 단, 쿠키 설치를 거부하였을 경우 로그인이 필요한 일부 서비스
                이용에 어려움이 있을 수 있습니다.
                <br />
                <br />
                <span className="font-semibold">개인정보보호를 위한 기술적, 관리적 대책</span>
                <br />
                <br />
                회사는 개인정보보호를 위해 최선의 최선의 기술적, 관리적 노력을 하고 있습니다.
                <br />
                비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알고 있으며,
                <br />
                개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다.
                <br />
                따라서 비밀번호가 다른 사람에게 알려지지 않도록 주의하시기 바랍니다.
                <br />
                회사는 해킹이나 컴퓨터 바이러스에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 필요한
                보안조치를 이용하고 있으며,
                <br />
                더욱 향상된 보안조치를 확보할 수 있도록 가능한 모든 기술적 방법을 구비하기 위해 노력하고 있습니다.
                <br />
                회사는 개인정보를 취급하는 직원을 최소한으로 제한하고 있으며,
                <br />
                관련 직원들에 대한 교육을 수시로 실시해 본 방침의 이행 및 준수 여부를 확인하고 있습니다.
                <br />
                <br />
                <span className="font-semibold">개인정보에 관한 민원 서비스</span>
                <br />
                <br />
                회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위해 개인정보관리책임자를 두고
                있습니다.
                <br />
                개인정보와 관련한 문의사항이 있으시면 아래의 개인정보관리책임자에게 연락 주시기 바랍니다. 귀하의 문의
                사항에 신속하고 성실하게 답변해드리겠습니다.
                <br />
                <br />
                <span className="font-semibold">개인정보관리책임자</span>
                <br />
                <br />
                •이름 : 박혜정
                <br />
                •전화번호: 02-6338-1880
                <br />
                •이메일 : help@moya.ai
                <br />
                기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
                <br />
                •개인정보 분쟁조정위원회 (kopico.go.kr)
                <br />
                •개인정보침해신고센터(privacy.kisa.or.kr)
                <br />
                •경찰청 사이버안전국(cyberbureau.police.go.kr)
                <br />
                <br />
                <span className="font-semibold">개인정보처리방침의 변경</span>
                <br />
                <br />
                법령 및 방침에 따른 추가, 삭제 및 정정 시 변경사항 시행 7일 전부터 공지사항을 통해 고지할 것입니다.
                <br />
                이 개인정보 처리방침은 2023년 1월 1일부터 적용됩니다.
                <br />
                개인정보 처리방침 버전번호: 1.0
                <br />
                공고일자 : 2023년 1월 1일
                <br />
                시행일자 : 2023년 1월 1일
              </p>
            }
            mainBtn="메인 버튼"
            subBtn="서브 버튼"
          />
        )}
      </form>
    </div>
  );
}
export default TermsForm;

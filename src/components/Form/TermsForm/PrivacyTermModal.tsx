'use client';

import React from 'react';
import TermModal from './TermModal';

interface Props {
  onClose?: () => void;
}

function PrivacyTermModal({ onClose }: Props) {
  return (
    <TermModal title="개인정보 처리방침" onClose={onClose}>
      <section>
        <p>
          이 개인정보처리방침은 주식회사 시스메틱이 어떤 정보를 수집, 사용, 관리하는지에 대한 내용을 포함하고 있습니다.
        </p>
        <p>
          주식회사 시스메틱(“회사”)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령상의
          개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정해 이용자 권익 보호에 최선을 다하고
          있습니다.
        </p>
        <p>
          회사는 개인정보처리방침을 통해 제공되는 서비스(&quot;서비스&quot;)를 이용하는 회원 및 콘텐츠 구독자(이하
          ‘이용자’)로부터 수집하는 개인정보의 항목, 개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용 기간과
          개인정보 보호를 위해 취해지고 있는 조치를 안내해 드립니다. 이 개인정보처리방침은 2023년 1월 1일부터
          적용됩니다.
        </p>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">수집하는 개인정보의 항목 및 수집 방법</h3>
        <ol className="box-border list-decimal px-4">
          <li>닉네임, 아이디(이메일 주소), 비밀번호, 휴대폰 번호는 필수로 수집합니다.</li>
          <li>유료 서비스를 이용하면 결제와 관련된 정보를 추가로 수집합니다.</li>
          <li>
            IP 주소, 쿠키, 방문기록, 서비스 이용 기록은 서비스를 이용할 때 자동으로 수집됩니다. 회사는 서비스 제공을
            위해 기본적으로 몇 가지 정보를 요청합니다.
            <ul className="list-disc">
              <li>필수: 닉네임, 아이디(이메일 주소), 비밀번호, 휴대폰 번호</li>
              <li>
                (카드 결제 시) 카드번호, 유효기간, 비밀번호 앞 2자리, 생년월일 또는 사업자등록번호
                <li className="list-inside list-[circle]">
                  단, 회사는 카드번호 뒤 4자리를 제외한 결제 정보를 보관하지 않습니다.
                </li>
              </li>
            </ul>
          </li>
          <li>IP 주소, 쿠키, 방문 기록, 서비스 이용 기록은 이용자가 서비스를 이용할 때 자동으로 수집됩니다.</li>
          <li>회사는 사이트를 통해 개인정보를 수집합니다.</li>
        </ol>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보의 수집 및 이용 목적</h3>
        <ol className="box-border list-decimal px-4">
          <li>
            수집한 개인정보는 서비스 제공에 관한 계약 이행및 이용 요금 정산, 회원 관리, 서비스 개선 및 마케팅, 광고에의
            활용을 위해 사용됩니다.
          </li>
          <li>
            회사는 수집한 개인정보를 서비스 제공에 관한 계약 이행, 이용자 관리, 서비스 개선 및 마케팅, 광고에의 활용을
            목적으로 사용하고 있습니다.
            <ul className="list-disc">
              <li>
                서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 이용 요금 정산: 서비스 및 콘텐츠 제공, 특정 맞춤
                서비스 제공, 서비스 구매 및 요금 결제(구독결제서비스 결제 포함), 증빙서류 발급, 요금추심, 환불 처리 등
              </li>
              <li>
                이용자 관리: 서비스 이용에 따른 본인 확인, 개인 식별, 부정 이용 방지, 회원 가입 및 서비스 이용 의사
                확인, 가입 횟수 제한, 분쟁 조정을 위한 기록 보존, 불만처리 등 민원처리, 고지사항 전달 등
              </li>
              <li>
                서비스 개선 및 마케팅, 광고에의 활용: 서비스 이용에 대한 통계 확인, 서비스의 유효성 확인, 이벤트 및
                광고성 정보 제공, 접속 빈도 파악 등
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보의 보유 및 이용기간</h3>
        <ol className="box-border list-decimal px-4">
          <li>
            개인정보는 원칙적으로 수집 및 이용 목적이 달성되면 파기하지만 경우에 따라 일정 기간 보관할 수 있습니다.
          </li>
          <li>회사가 수집한 개인정보는 원칙적으로 수집 및 이용 목적이 달성되면 지체없이 파기합니다.</li>
          <ol className="list-decimal">
            단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를
            부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다. 이용자에게 개인정보 보관기간에 대해
            회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는 아래와 같습니다.
            <li className="mt-4 list-inside">
              부정 가입 및 이용 방지
              <ul className="list-inside list-disc">
                <li>항목: 이메일 주소, 닉네임, 휴대폰 번호</li>
                <li>보존 기간: 탈퇴일로부터 1년</li>
              </ul>
            </li>
            <li className="mt-4 list-inside">
              분쟁 조정 및 이용자 문의 대응
              <ul className="list-inside list-disc">
                <li>항목: 이메일 주소, 닉네임, 휴대폰 번호</li>
                <li>보존 기간: 탈퇴일로부터 1년</li>
              </ul>
            </li>
          </ol>
          <li className="mt-4">
            회사는 아래와 같이 관계법령에서 정한 일정한 기간동안 개인정보를 보관합니다. 이 경우 회사는 보관하는 정보를
            그 보관의 목적으로만 이용합니다.
            <ol className="list-inside list-decimal">
              <li className="mt-4">
                계약 또는 청약철회 등에 관한 기록
                <ul className="list-inside list-disc">
                  <li>보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                  <li>보존 기간: 5년</li>
                </ul>
              </li>
              <li className="mt-4">
                대금결제 및 재화 등의 공급에 관한 기록
                <ul className="list-inside list-disc">
                  <li>보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                  <li>보존 기간: 5년</li>
                </ul>
              </li>
              <li className="mt-4">
                소비자의 불만 또는 분쟁처리에 관한 기록
                <ul className="list-inside list-disc">
                  <li>보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                  <li>보존 기간: 3년</li>
                </ul>
              </li>
              <li className="mt-4">
                표시/광고에 관한 기록
                <ul className="list-inside list-disc">
                  <li>보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                  <li>보존 기간: 6개월</li>
                </ul>
              </li>
              <li className="mt-4">
                본인확인에 관한 기록
                <ul className="list-inside list-disc">
                  <li>보존 이유: 정보통신망 이용촉진 및 정보보호 등에 관한 법률</li>
                  <li>보존 기간: 6개월</li>
                </ul>
              </li>
              <li className="mt-4">
                웹사이트 방문기록
                <ul className="list-inside list-disc">
                  <li>보존 이유: 통신비밀보호법</li>
                  <li>보존 기간: 3개월</li>
                </ul>
              </li>
              <li className="mt-4">
                전자금융 거래에 관한 기록
                <ul className="list-inside list-disc">
                  <li>보존 이유: 전자금융거래법</li>
                  <li>보존 기간: 5년</li>
                </ul>
              </li>
            </ol>
          </li>
        </ol>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보 수집 이용에 대한 동의를 거부할 권리</h3>
        <p>
          위의 개인정보 수집,이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 서비스 제공을 받을수
          없거나 제약이 있을수 있습니다.
        </p>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보 제공 및 취급위탁</h3>
        <p>
          개인정보는 원칙적으로 외부에 제공하지 않지만 경우에 따라 제공할 수 있습니다. 유료 서비스를 이용하는 경우 요금
          정산을 위해 정해진 수탁업체에게 정해진 범위 내에서 개인정보를 위탁 처리합니다.
        </p>
        <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>
        <p>다만, 아래의 경우는 예외로 합니다.</p>
        <ul className="box-border list-disc px-4">
          <li>이용자가 사전에 동의한 경우</li>
          <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
          <li>통계작성, 학술연구나 시장조사를 위해 특정 개인을 식별할 수 없는 형태로 가공해 제공하는 경우</li>
          <li>이용자가 사전에 동의한 경우</li>
        </ul>
        <ul className="box-border list-disc px-4">
          회사는 편리하고 더 나은 서비스를 제공하기 위해 정해진 범위 내에서 개인정보를 위탁해 처리합니다.
          <li>결제 처리: 나이스페이먼츠(주)</li>
          <li>서비스 제공을 위한 서버 운영: AWS(Amazon Web Services, Inc.)</li>
          <li>이용되는 개인정보 항목은 스티비 계정 이메일 주소, 서비스 이용 기록에 한함.</li>
        </ul>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보 파기절차 및 파기방법</h3>
        <p>개인정보의 수집 및 이용 목적이 달성 되면, 개인정보를 신속하고 안전한 방법으로 파기합니다.</p>
        <p>
          회사는 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 해당 정보를 지체 없이
          파기합니다.
        </p>
        <p>
          이용자가 제공한 정보는 수집 및 이용 목적이 달성된 후 별도의 데이터베이스로 옮겨져(종이의 경우 별도의 서류함)
          내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정기간 저장된 후 파기됩니다.
        </p>
        <p>
          별도 데이터베이스로 옮겨진 개인정보는 법률에 의한 경우가 아니면 보유되는 이외의 다른 목적으로 이용되지
          않습니다.
        </p>
        <p>
          전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 이용해 삭제하고, 종이에 출력된
          개인정보는 분쇄기로 분쇄하거나 소각해 파기됩니다.
        </p>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">만 14세 미만 아동에 관한 사항</h3>
        <p>회사는 만 14세 미만 아동의 회원 가입을 받지 않습니다.</p>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</h3>
        <p>
          적절하고 유용한 서비스를 제공하기 위해 쿠키를 사용합니다. 웹 브라우저 설정에서 쿠키 저장을 거부할 수 있습니다.
        </p>
        <p>
          회사는 이용자에게 보다 적절하고 유용한 서비스를 제공하기 위해 이용자의 정보를 수시로 저장하고 불러오는
          &apos;쿠키(cookie)&apos;를 사용합니다.
        </p>
        <p>
          쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터로 전송하는 아주 작은 텍스트 파일로서
          이용자의 기기에 저장됩니다. 이용자는 쿠키의 사용여부를 선택할 수 있습니다.
        </p>
        <p>
          쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나
          쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 단, 쿠키 설치를 거부하였을 경우
          로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.
        </p>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보보호를 위한 기술적, 관리적 대책</h3>
        <p>회사는 개인정보보호를 위해 최선의 최선의 기술적, 관리적 노력을 하고 있습니다.</p>
        <p>
          비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고
          있는 본인에 의해서만 가능합니다. 따라서 비밀번호가 다른 사람에게 알려지지 않도록 주의하시기 바랍니다.
        </p>
        <p>
          회사는 해킹이나 컴퓨터 바이러스에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 필요한
          보안조치를 이용하고 있으며, 더욱 향상된 보안조치를 확보할 수 있도록 가능한 모든 기술적 방법을 구비하기 위해
          노력하고 있습니다.
        </p>
        <p>
          회사는 개인정보를 취급하는 직원을 최소한으로 제한하고 있으며, 관련 직원들에 대한 교육을 수시로 실시해 본
          방침의 이행 및 준수 여부를 확인하고 있습니다.
        </p>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보에 관한 민원 서비스</h3>
        <p>
          회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위해 개인정보관리책임자를 두고 있습니다.
          개인정보와 관련한 문의사항이 있으시면 아래의 개인정보관리책임자에게 연락 주시기 바랍니다. 귀하의 문의 사항에
          신속하고 성실하게 답변해드리겠습니다.
        </p>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보관리책임자</h3>
        <address className="box-border px-4">
          <ul className="list-disc">
            <li>이름: 박혜정</li>
            <li>전화번호: 02-6338-1880</li>
            <li>이메일: help@moya.ai</li>
          </ul>
        </address>
        <ul className="box-border list-disc px-4">
          <p className="-mx-4">
            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
          </p>
          <li>개인정보 분쟁조정위원회 (kopico.go.kr)</li>
          <li>개인정보침해신고센터(privacy.kisa.or.kr)</li>
          <li>경찰청 사이버안전국(cyberbureau.police.go.kr)</li>
        </ul>
      </section>
      <section className="my-8">
        <h3 className="font-semibold">개인정보처리방침의 변경</h3>
        <p>법령 및 방침에 따른 추가, 삭제 및 정정 시 변경사항 시행 7일 전부터 공지사항을 통해 고지할 것입니다.</p>
        <p>이 개인정보 처리방침은 2023년 1월 1일부터 적용됩니다.</p>
        <p>개인정보 처리방침 버전번호: 1.0</p>
        <p>
          공고일자: <time>2023년 1월 1일</time>
        </p>
        <p>
          시행일자: <time>2023년 1월 1일</time>
        </p>
      </section>
    </TermModal>
  );
}

export default PrivacyTermModal;

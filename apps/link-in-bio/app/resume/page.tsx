import { ResumeDetail, ResumeHeading, ResumeItem } from '@/components/Resume'

export default function Page() {
  return (
    <>
      <p className="text-sm italic text-neutral-400">
        2023년 7월 8일 업데이트됨.
      </p>
      <h1>이력서</h1>
      <section>
        <ResumeHeading id="about" title="소개" />
        <div className="space-y-4">
          <p>
            2018년 4월 군 전역 후 바로 웹 개발의 세계에 빠져들었고, 지금까지 5년
            이상 개발을 해오면서 3년이 넘는 경력을 쌓았습니다.
          </p>
          <p>
            더 게으르게 개발하기 위해, 더 부지런히 공부하는 것을 항상 모토로
            삼고 있습니다. 더 빠르고, 더 완성도 있는 개발을 함으로써 여유 있는
            개발자의 삶을 살고 싶습니다.
          </p>
          <p>
            주로 Front-end 개발자로 일하는 것을 선호합니다. 다만 풀스택으로
            개발해본 적도 있기 때문에 어느 정도 소통 가능한 백엔드 지식은 있는
            편입니다.
          </p>
          <p>
            가장 최근에 SaaS를 혼자 창업했다가 정리하고, 일간 ProductHunt라는
            사이드 프로젝트 등을 개발 및 운영하고 블로그를 정리해나가며 구직을
            이어가고 있습니다.
          </p>
        </div>
      </section>

      <section>
        <ResumeHeading id="skills" title="기술" />
        <div className="grid xl:grid-cols-3">
          <div>
            <h3>Front-end</h3>
            <ul>
              <li>
                <b>Next.js</b>
              </li>
              <li>
                <b>TypeScript</b>
              </li>
              <li>
                <b>TailwindCSS</b>
              </li>
              <li>
                <b>Recoil</b>
              </li>
              <li>React.js</li>
              <li>Redux</li>
              <li>Vue.js</li>
            </ul>
          </div>
          <div>
            <h3>Back-end</h3>
            <ul>
              <li>
                <b>Node.js</b>
              </li>
              <li>
                <b>PostgreSQL</b>
              </li>
              <li>MySQL</li>
            </ul>
          </div>
          <div>
            <h3>Infrastructure</h3>
            <ul>
              <li>
                <b>Vercel</b>
              </li>
              <li>
                <b>Supabase</b>
              </li>
              <li>Firebase</li>
              <li>AWS</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <ResumeHeading id="experiences" title="경력" />
        <div className="space-y-8">
          <ResumeItem
            duration="2021.09 - 2022.08"
            image="fetching.jpg"
            title="페칭"
            tags={['nextjs', 'typescript', 'tailwindcss', 'recoil']}
            href="https://fetching.co.kr"
          >
            <p>
              온라인 명품 구매 플랫폼 페칭에서 프론트엔드 개발자로 일했습니다.
            </p>
            <p>
              카페24로 운영되던 기존 커머스 사이트를 Next.js기반으로 새롭게
              구축하였고, 어드민 사이트 개선 및 신규 어드민 이전, 파트너센터
              신규 구축을 담당했습니다.
            </p>
            <ResumeDetail>
              <li>
                Ant Design의 컴포넌트 설계 방식을 도입함으로써 프로젝트를
                설계하는 방식을 더 직관적이고 효율적으로 업그레이드했습니다.
              </li>
              <li>
                SCSS 대신 새로 공부했던 TailwindCSS를 회사 내 신규 런칭
                프로젝트에 도입 후 개발 속도를 이전 방식보다 더 빠르게 높힐 수
                있었습니다.
              </li>
              <li>
                TailwindCSS를 도입한 이후 UI 라이브러리 없이 직접 UI
                Component들을 만들기 시작하면서 UI에 대한 이해도가 한 층 더
                높아졌고, 직접 만든 컴포넌트들을 개인적으로 정리하는 프로젝트도
                만들면서 재사용성도 높이고 경력에 도움이 되는 포트폴리오도 만들
                게 되는 큰 실력 향상이 있었습니다.
              </li>
              <li>
                설계하는 데만 시간을 여러모로 잡아먹는 Redux를 과감히 버리고,
                새로 등장한 Recoil을 도입 후 상태 관리 구축에 들어가는 시간과
                코드량을 줄이면서도 전역 상태 관리 용도 그 자체로만 활용함으로써
                더욱 직관적으로 유지보수가 가능하도록 업그레이드했습니다.
              </li>
              <li>
                프론트 동료 개발자들과의 코드 리뷰를 주선하면서 4개
                프로젝트(커머스, 어드민, 파트너센터, 앱)의 코드 퀄리티를 동시에
                높혔고, Merge 시에 코드 충돌이 생기게 되자 Pull Request를 할 때
                템플릿을 만들고 꼭 해당 프로젝트의 모든 담당 개발자들의 확인을
                거친 후 Merge하도록 함으로써 협업 퀄리티 또한 높였습니다.
              </li>
              <li>
                카페24로 유지되던 메인 서비스를 Next.js로 옮기는 프로젝트를
                진행했는데, 거기서상품 리스트, 브랜드 리스트, 프로모션 리스트를
                주로 담당했습니다. 여기서 필터 기능을 만들기 위해 페칭 카테고리,
                가격, 정렬, 성별, 브랜드, 프로모션을 고려해야 했고,
                페이지네이션도 생각해야 했습니다. 좋은 사용자 경험을 위해 이
                필터값들을 쿼리스트링으로 관리할 수 있도록 하였습니다. 또한
                상품이 많고 객단가가 높은 점을 고려해 고객이 여러 상품을 둘러볼
                것이라 생각하였고, 상품 클릭 시 페이지 이동이 아닌 새 창을
                띄우는 방식을 택했습니다.
              </li>
              <li>
                네이버 쇼핑 검색을 통해 들어온 고객들이 최저가임을 알지 못해
                이탈하는 일이 빈번해지자, 네이버 검색 api를 활용하여 다른
                쇼핑몰의 같은 상품 목록을 가져와서 '우리의 이 상품이 다른
                쇼핑몰보다 이만큼 싸다'라는 것을 알리도록 하였고, 구매 전환율을
                높이는 데 기여를 하게 했습니다.
              </li>
              <li>
                어드민 주문 상세에서 발주, 주문, 반품, 교환, 환불, 결제, 배송,
                메모에 대한 정보를한 페이지에 전부 담아야 하는미션이 있었습니다.
                해당 정보들을 쿼리스트링을 통해 각각의 탭으로 분리하였고,
                그러함으로써 링크를 타고 들어올 때 원하는 탭으로 한 번에 갈 수
                있도록 하였습니다. 가장 중요했던 발주 정보의 경우 환율, 관부가세
                등의 세금, 프로모션, 자체 할인, 배송비 및 경유지 수수료, 페칭
                수수료, 쿠폰 및 적립금, 환율까지한 번에 다 계산이 된 채로주문
                금액이 나와야 하는데, 여기서 실시간으로 조정이 가능하고 모든
                가격이 영향을 받아야 했습니다. 또한 돈이 걸린 일이기 때문에
                절대로 제 실수로 오차가 생기면 안되는데, 배포 후 사고가 터지진
                않았습니다.
              </li>
              <li>
                어드민에서 발주 정보를 최신화하기 위한 노력이 필요했습니다. 해외
                명품 특성상 상품 가격 변동이 심하고, 한 주문에 실수로 발주를 두
                번넣게 되는 일이 일어나면 안됐으며, 원화나 유로, 달러에 따라
                가격도 달라질 수 있기 때문에 환율도 실시간으로 고려를 해야
                했습니다. 이 때 SWR을 도입하여 데이터의 최신화를 기대한 만큼
                이룰 수 있었습니다.
              </li>
              <li>
                파트너센터의 초기 버전 프론트를 전부 담당했습니다. 제일 중요한
                기능은 상품 등록이었는데, 이미지 업로드와 위지윅 에디터는
                기본이고 명품 브랜드와 페칭 카테고리에 상품을 매핑하는 로직,
                색상 및 사이즈 등의 옵션을 책정하고 옵션마다 금액 가감을 따로 할
                수 있는 로직, 한 상품에 배송 타입이 다 다를 수 있기 때문에 배송
                정보를 따로 적용하는 로직, 마지막으로 입력한 정보를 토대로 페칭
                상품 상세에 어떻게 뜰 것인지 미리보기를 만드는 작업까지 적용을
                했습니다. 그 다음으로 중요했던 기능은 입점 신청이었는데, 약관
                동의, 사업자 정보, 담당자 정보, 배송 정보, 마지막으로 서명까지
                한 번에 받아야 했기 때문에 관련 라이브러리까지도 사용해서
                구현해야 했습니다. 또한 입점 시에 기재해야 하는 정보가 많다보니
                임시저장이 필요했고, 로컬스토리지를 활용하여 저장 및 불러오기를
                할 수 있도록 하였습니다.
              </li>
            </ResumeDetail>
          </ResumeItem>
          <ResumeItem
            duration="2019.09 - 2020.10"
            image="linkplanner.png"
            title="링크플래너"
            tags={[
              'react',
              'nextjs',
              'typescript',
              'redux',
              'mobx',
              'storybook',
              'jest'
            ]}
          >
            <p>
              보험 가입 및 상담 서비스 플랫폼 인슈넷, 보험 설계사 플랫폼
              링크플래너의 유지보수 및 신기능 추가 및 어드민 사이트 개발까지
              전반적인 업무를 주로 맡았습니다.
            </p>
            <ResumeDetail>
              <li>
                보험 상품 및 설계사에 대한 검색 최적화(SEO)를 새로 적용하고,
                네이버와 구글 검색 시 메인 상위에 뜨도록 하였습니다.
              </li>
              <li>
                보험 가입을 온라인으로 간소화하기 위해 PDF에 서명(이미지)을
                삽입하는 기능을 개발, CS가 기존에 전화로 진행했던 일들을 줄일 수
                있게 되었습니다.
              </li>
              <li>
                19년 7월 Next.js 9 버전에서 새로 등장한 정적 페이지 생성 기능을
                도입, 기존에 페이지에 접근할 때마다 서버에 일일히 데이터를 보내
                조회했던 보험 상품, 보험 용어 등의 페이지들을 빌드 시에 한 번만
                요청하여 페이지를 만드는 것으로 변경하여 서버의 부담을 크게
                줄였습니다. 보험 용어 같은 페이지들은 데이터가 변경되는 일이
                드물었기 때문에 해당 방법이 효과가 있을 수 있었습니다.
              </li>
              <li>
                TypeScript를 직접 배워서 처음 도입함으로써 타입 불일치로 인한
                오류를 줄이고, 변수들과 함수에 타입을 명시함으로써 보다
                명시적으로 알아볼 수 있는 코드를 작성할 수 있게 되었고 코드
                퀄리티 상승 효과를 얻을 수 있게 되었습니다.
              </li>
              <li>
                회사에 디자이너가 없어서 직접 목업을 만드는 일들이 필요했는데,
                Storybook을 처음 도입하여 UI Design에 관한 소통의 부담을 한결
                줄였던 경험이 있습니다.
              </li>
              <li>
                Jest를 처음 도입하여 오류를 줄이기 위한 노력을 했습니다.
                당시에는 자세하게는 하지 않고 페이지 렌더링, 컴포넌트 렌더링,
                api 이상 체크 정도만 했습니다.
              </li>
              <li>
                초기에는 당시 쓰고 있던 Redux가 너무 설계가 복잡해서, 설계와
                유지보수가 상대적으로 쉬운 MobX로 노선을 변경했었습니다. 하지만
                Mobx가 쓰는 Decorator 문법에 이질감을 느끼게 되었고, Redux의
                설계를 더 쉽게 해주는 Redux-toolkit을 찾게 되면서 코드 퀄리티를
                한결 더 높일 수 있었습니다.
              </li>
            </ResumeDetail>
          </ResumeItem>
          <ResumeItem
            duration="2019.02 - 2019.06"
            image="mybiskit.png"
            title="마이비스킷"
            tags={['nuxtjs', 'mysql']}
          >
            <p>
              직장인 익명 커뮤니티 blind에서 신 사업으로 추진한 온라인 취미
              클래스 플랫폼 '마이비스킷'의 전반적인 프론트엔드 업무를
              맡았습니다. 당시 React인 줄 알고 갔으나 회사의 요청으로 급하게
              Nuxt.js를 배워서 만들었습니다.
            </p>
            <p>
              당시 저는 주로 JS, 즉 동적인 기능에 집중했고 퍼블리셔와 마케팅,
              기획 및 CS, 웹 디자인 등 많은 직종과 협업을 했습니다. 하나의
              팀으로 하나의 서비스를 만든 첫 프로젝트다 보니 다양한 직종 분들과
              협업하는 노하우를 많이 배웠습니다.
            </p>
            <ResumeDetail>
              <li>
                Vue와 Nuxt.js를 비록 급하게 배웠지만, React를 이미 알고 있던
                시점에서 Vue를 새로 배우고 도입하는 데 큰 어려움 없이 프로젝트를
                진행할 수 있었습니다. (오히려 Vue가 React보다 더 좋다고 생각을
                해서 이후에 Vue를 한동안 공부했었던 기억이 납니다.)
              </li>
              <li>
                어느정도 백엔드 지식도 공부했던 덕분에, 백엔드 개발자와 함께 SQL
                코드를 같이 짜보면서 서 프론트와 백 사이의 소통의 효율성을 한층
                더 높일 수 있었습니다.
              </li>
            </ResumeDetail>
          </ResumeItem>
          <ResumeItem
            duration="2019.01 - 2019.02"
            image="gangmom.png"
            title="강남엄마"
            tags={['nodejs', 'mysql']}
          >
            <p>
              전국 학원 검색 플랫폼 '강남엄마'에서 첫 개발 업무로 백엔드 보조
              알바를 하였습니다. 주로 SQL 작성을 맡았습니다.
            </p>
            <p>
              주된 작업은 SQL 작성으로, 기존에 있던 학원만을 모으는 기능에 더해
              선생님 기능을 추가하여, 학원에 속한 선생님들 리스트, 특정 선생님의
              이력 및 이력에 따른 학원 목록 가져오기 등등을 맡았습니다.
            </p>
            <ResumeDetail>
              <li>
                학원 강사 및 선생님 플랫폼으로도 활동 변경을 넓히는 방향으로
                프로젝트를 계획하였고, 선생님 테이블 추가, 학원 테이블에 선생님
                테이블 연결, 선생님 상세 조회 시 연관된 선생님 추가로 조회 등의
                기능을 개발했습니다.
              </li>
              <li>
                학원 상세 데이터 조회시 연관된 학원 조회 등의 기능을
                개발했습니다.
              </li>
            </ResumeDetail>
          </ResumeItem>
        </div>
      </section>

      <section>
        <ResumeHeading id="projects" title="프로젝트" />
        <div className="space-y-6">
          <ResumeItem
            duration="2023.02 - 진행 중"
            image="daily-producthunt.png"
            title="일간 ProductHunt"
            tags={['nextjs', 'tailwindcss', 'typescript', 'vercel', 'supabase']}
            href="https://daily-producthunt.kidow.me"
          >
            <p>
              글로벌 IT 메이커 플랫폼 ProductHunt에 올라오는 상위 제품들을
              평일마다 요약해서 소개하는 서비스입니다. Slack과 Discord,
              Telegram을 통해 콘텐츠를 전달하고 Notion을 통해 유저의
              데이터베이스에 내용을 저장합니다.
            </p>
            <p>
              IT 프로덕트와 창업에 관심이 많아서 매일 ProductHunt를 들여다
              보는게 발단이었고, 이 것을 쉽게 정리해서 아카이브에 저장하는
              것으로 시작했다가 이 것을 개발 기술을 이용해서 사람들에게도
              공유하면 더 동기 부여가 될 것 같아서 프로젝트를 시작했습니다. 6월
              기준 500개 넘는 프로덕트를 소개했고, 계속 진행 중입니다.
            </p>
          </ResumeItem>
          <ResumeItem
            duration="2023.03"
            image="embedgpt.png"
            title="EmbedGPT"
            tags={[
              'nextjs',
              'tailwindcss',
              'typescript',
              'vercel',
              'supabase',
              'chrome extension'
            ]}
            href="https://embedgpt.kidow.me"
          >
            <p>
              ChatGPT 내용을 다른 사람들과 공유하고, 커뮤니티 게시판에 쉽게
              임베딩할 수 있는 커뮤니티입니다.
            </p>
          </ResumeItem>
          <ResumeItem
            duration="2022.10"
            image="coddee.png"
            title="Coddee"
            tags={['nextjs', 'tailwindCSS', 'typescript', 'vercel', 'supabase']}
            href="https://coddee.dev"
          >
            <p>
              기존 채팅방 서비스와는 다르게 코드블록을 올릴 수 있습니다. 또한
              Github로만 로그인할 수 있습니다.
            </p>
          </ResumeItem>
        </div>
      </section>

      <section>
        <ResumeHeading id="education" title="학력" />
        <div className="space-y-6">
          <ResumeItem
            duration="2015"
            image="sejong-university.jpg"
            title="세종대학교"
            description="물리천문학과"
          >
            <p>
              2학년 1학기까지 다녔지만 전공과 지금 하는 일이 맞지 않고, 학업보다
              개발에 뜻을 두고자, 현재는 제적된 상태입니다.
            </p>
          </ResumeItem>
        </div>
      </section>
    </>
  )
}

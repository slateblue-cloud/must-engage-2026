import React, { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
} from "lucide-react";

// Components
import { Hero } from "../components/sections/Hero";
import { getLandingHero, getLandingDiagnosis, getLandingRenovation, getProjects, directus } from "../lib/directus";
import { HeroContent, ProjectItem } from "../types/landing";
import { DiagnosisSection } from "../components/sections/DiagnosisSection";
import { RenovationSection } from "../components/sections/RenovationSection";
import { ImcSection } from "../components/sections/ImcSection";
import { ResultsSection } from "../components/sections/ResultsSection";
import { ArrowNarrowRight, EditIcon } from "../components/ui/Icons";

// Assets
import insights01 from "../assets/sns_img/2.png";
import insights02 from "../assets/sns_img/1.png";
import insights03 from "../assets/sns_img/3.jpg";
import imgHero from "../assets/hero01.png";
import imgSection01 from "../assets/54e2d4b76998542d0da597f7bda04a72cbad0dc8.png";
import imgKnot3 from "../assets/2680822d0835c3f69e72c78587f9dd56dcc0393e.png";
import imgRoundTube from "../assets/5844140db5e4a7f98eff3af5978375a285be96b5.png";
import img01271 from "../assets/f5c0bcb78df559249d013f7bdfc12ca5567c8337.png";
import img00441 from "../assets/c4d16f4050279074afa83dd2ab9bd61c2e4d5184.png";
import section03Bg from "../assets/secion03bg.png";
import mustCompanySvg from "../assets/mustcompany.svg";
import mustCreativeSvg from "../assets/mustcreative.svg";
import mufinSvg from "../assets/mufin.svg";
import mustuSvg from "../assets/mustu.svg";
import moadSvg from "../assets/moad.svg";
import fortelierSvg from "../assets/fortelier.svg";
import emailIcon from "../assets/email-icon.svg";
import callIcon from "../assets/call-icon.svg";
import snsIcon1 from "../assets/sns-icon01.svg";
import snsIcon2 from "../assets/sns-icon02.svg";
import snsIcon3 from "../assets/sns-icon03.svg";
import snsIcon4 from "../assets/sns-icon04.svg";
import logoSvg from "../assets/logo.svg";

// Thumbnail Images
import tn2uc from "../assets/tn_img/2uc_tn.png";
import tnaiibox from "../assets/tn_img/aiibox_tn.png";
import tnbalmain from "../assets/tn_img/balmain_tn.png";
import tnbing from "../assets/tn_img/bing_tn.png";
import tnbrooklynworks from "../assets/tn_img/brooklynworks_tn.png";
import tnbrooksbrothers from "../assets/tn_img/brooksbrothers_tn.png";
import tnckd from "../assets/tn_img/ckd_tn.png";
import tndreamsjoseph from "../assets/tn_img/dreamsjoseph_tn.png";
import tnk2 from "../assets/tn_img/k2_tn.png";
import tnlegodt from "../assets/tn_img/legodt_tn.png";
import tnluxi from "../assets/tn_img/luxi_tn.png";
import tnmerbel from "../assets/tn_img/merbel_tn.png";
import tnnescafe from "../assets/tn_img/nescafe_tn.png";
import tnntok from "../assets/tn_img/ntok_tn.png";
import tnodense from "../assets/tn_img/odense_tn.png";
import tnpyrenex from "../assets/tn_img/pyrenex_tn.png";
import tnrockport from "../assets/tn_img/rockport_tn.png";
import tnshenb from "../assets/tn_img/shenb_tn.png";
import tnsonatural from "../assets/tn_img/sonatural_tn.png";

// Popup Images
import rp2uc from "../assets/rp_img/2uc_rp.png";
import rpaiibox from "../assets/rp_img/aiibox_rp.png";
import rpbalmain from "../assets/rp_img/balmain_rp.png";
import rpbing from "../assets/rp_img/bing_rp.png";
import rpbrooklynworks from "../assets/rp_img/brooklynworks_rp.png";
import rpbrooksbrothers from "../assets/rp_img/brooksbrothers_rp.png";
import rpckd from "../assets/rp_img/ckd_rp.png";
import rpdreamsjoseph from "../assets/rp_img/dreamsjoseph_rp.png";
import rpk2 from "../assets/rp_img/k2_rp.png";
import rplegodt from "../assets/rp_img/legodt_rp.png";
import rpluxi from "../assets/rp_img/luxi_rp.png";
import rpmerbel from "../assets/rp_img/merbel_rp.png";
import rpnescafe from "../assets/rp_img/nescafe_rp.png";
import rpntok from "../assets/rp_img/ntok_rp.png";
import rpodense from "../assets/rp_img/odense_rp.png";
import rppyrenex from "../assets/rp_img/pyrenex_rp.png";
import rprockport from "../assets/rp_img/rockport_rp.png";
import rpshenb from "../assets/rp_img/shenb_rp.png";
import rpsonatural from "../assets/rp_img/sonatural_rp.png";

const PROJECTS: ProjectItem[] = [
    { 
        id: 1, 
        title: "SONATURAL", 
        category: "SA , DA, SNS 전채널관리, 영상제작, VIRAL", 
        image: tnsonatural, 
        popupImage: rpsonatural, 
        ctr: "9.8%", roas: "290%", roi: "36%", cvr: "6.2%", 
        description: "전체 매출 증대 및 신규 고객 확보 (IMC 전략)",
        project_detail: "전체 매출 증대 및 신규 고객 확보",
        plan: "IMC 통합 마케팅 진행\n브랜딩과 매출 확보를 동시에 달성하기 위한 IMC 전략 실행\n- 메인 제품 1위 포지션 확보전력으로 핵심 제품의 브랜드 경쟁력 강화\n- 신제품 콘텐츠 확보를 통한 지속적인 채널 활성화와 신규 고객 타겟 유입",
        result: "쏘내추럴 전체 매출 증대 및 신규 고객 확보 성공\n- 주요 메인 제품의 카테고리 1위 위치 강화\n- 다양한 채널과 콘텐츠 운영으로 브랜드 인지도 및 재구매율 상승\n\nIMC 전략을 기반으로 브랜딩과 퍼포먼스를 동시에 강화하며 높은 광고 효율과 성과를 실현."
    },
    { 
        id: 2, 
        title: "발망헤어", 
        category: "SA , DA, LIVE COMMERCE", 
        image: tnbalmain, 
        popupImage: rpbalmain, 
        ctr: "6.8%", roas: "350%", roi: "40%", cvr: "2.5%", 
        description: "국내 인지도 확대 및 매출 상승",
        project_detail: "발망헤어 국내 인지도 / 매출 상승",
        plan: "SA, DA, LIVE COMMERCE, OPERATING PART 진행\n초반 저예산으로 브랜딩 – 매출 IMC 전략 운영\n- 검색광고 / 배너광고\n- 판매채널 확보 온라인 채널 운영관리\n- 라이브커머스",
        result: "목표 브랜딩 ROAS 달성, 매체 효율 증대"
    },
    { 
        id: 3, 
        title: "메르베이", 
        category: "SA , DA, 영상제작, VIRAL", 
        image: tnmerbel, 
        popupImage: rpmerbel, 
        ctr: "7.8%", roas: "205%", roi: "14%", cvr: "3.2%", 
        description: "브랜딩과 퍼포먼스를 통합한 매출 증대",
        project_detail: "전체 매출 증대 및 신규 고객 확보",
        plan: "- 온라인 채널 관리: 네이버&인스타그램 인플루언서 체험단, 네이버 광고, 메타 광고 진행\n- 광고 전략: 검색광고, META Ads, 네트워크 DA 광고\n- 브랜딩 및 퍼포먼스 통합(IMC) 전략 실행 : 주요 제품 중심의 1위 포지션 강화 광고 효율 극대화를 위한 매체별 최적화 신제품 콘텐츠 확보로 신규 고객 타겟 지속 유입",
        result: "- 신규 고객 확보 및 브랜드 인지도 상승\n- 전체 매출 증대와 재구매율 향상 달성\n- 주요 제품 카테고리 내 경쟁력 강화\n- 브랜딩과 퍼포먼스를 동시에 실현하며 광고 효율 극대화"
    },
    { 
        id: 4, 
        title: "NESCAFE", 
        category: "SA , DA, LIVE COMMERCE", 
        image: tnnescafe, 
        popupImage: rpnescafe, 
        ctr: "10.1%", roas: "295%", roi: "38%", cvr: "6.5%", 
        description: "스마트스토어 활성화 및 이탈 고객 재유입",
        project_detail: "네스카페 스마트스토어 활성화 및 매출 증대",
        plan: "- NAVER SA / GFA\n- LIVE COMMERCE\n- NAVER 쇼핑검색 광고 진행 및 최적화\n- NAVER GFA로 이탈 고객 재유입 확보 및 구매\n- 쇼핑 라이브를 통해 신제품 소개 및 고객과 소통",
        result: "- NAVER 검색광고 스마트스토어 ROAS 1400% 달성\n- 신제품 홍보와 브랜드 충성고객 확보\n- 키워드 발굴 및 제외키워드 관리를 통한 네이버 쇼핑검색 효율 개선"
    },
    { 
        id: 5, 
        title: "빙그레", 
        category: "SA , DA, LIVE COMMERCE", 
        image: tnbing, 
        popupImage: rpbing, 
        ctr: "9.1%", roas: "220%", roi: "25%", cvr: "5%", 
        description: "신규 스마트스토어 활성화 및 충성 고객 모집",
        project_detail: "빙그레 스마트스토어 활성화 및 매출 증대",
        plan: "SA, DA, LIVE COMMERCE 진행\n신규 오픈한 빙그레 네이버스토어의 온라인 판매 시작안내 및 충성고객 모집\n- 검색광고 진행, 최적화\n- 네이버 GFA로 이탈 고객 재유입 확보 및 구매\n- 쇼핑 라이브를 통해 신제품 소개 및 고객과 소통",
        result: "목표 ROAS 달성, 재구매 및 충성고객 확보"
    },
    { 
        id: 6, 
        title: "종근당", 
        category: "VIRAL, LIVE COMMERCE", 
        image: tnckd, 
        popupImage: rpckd, 
        ctr: "8.8%", roas: "240%", roi: "20%", cvr: "4.5%", 
        description: "제품 행사 안내 및 퍼포먼스 매출 증대",
        project_detail: "종근당 제품 행사 안내 및 퍼포먼스 매출 증대",
        plan: "핫딜 및 침투형 구매후기 바이럴 및 라이브 커머스 운영\n- 커뮤니티 핫딜 등록\n- 카페 핫딜 등록\n- 커뮤니티 및 카페 정보성 구매 후기 콘텐츠 확보\n- 라이브커머스",
        result: "재구매 및 충성고객 확보"
    },
    { 
        id: 7, 
        title: "올박스", 
        category: "SA , DA, VIRAL, LIVE COMMERCE", 
        image: tnaiibox, 
        popupImage: rpaiibox, 
        ctr: "7.5%", roas: "180%", roi: "15%", cvr: "4%", 
        description: "온라인 마케팅 전반 IMC 운영",
        project_detail: "온라인 마케팅 전반 IMC운영",
        plan: "SA,DA,VIRAL,LIVE COMMERCE 진행\n스마트스토어 광고 효율 증대 및 자사몰 구축/활성화\n- 검색광고 진행, 최적화\n- 네이버 GFA로 이탈 고객 재유입 확보 및 구매\n- 쇼핑 라이브를 통해 신제품 소개 및 고객과 소통",
        result: "재구매 및 충성고객 확보"
    },
    { 
        id: 8, 
        title: "BROOKSBROTHERS", 
        category: "DA", 
        image: tnbrooksbrothers, 
        popupImage: rpbrooksbrothers, 
        ctr: "5.5%", roas: "150%", roi: "10%", cvr: "2%", 
        description: "자사몰 및 무신사 스토어 활성화",
        project_detail: "자사몰 및 무신사 스토어의 활성화와 매출 증대",
        plan: "- META Ads (자사몰 중심)\n- 무신사 협력광고\n- A/B 테스트 기반의 광고 소재 최적화로 타겟 분석 및 개선\n- 무신사와의 협력광고를 통해 신규 고객 유입 및 브랜드 인지도 상승 유도",
        result: "- META 자사몰 운영 ROAS 2,000% 달성\n- 무신사 협력광고 ROAS 3,000% 달성\n\n소재 A/B 테스트와 매체 효율적 운영·관리를 통해 목표 ROAS를 성공적으로 달성, 자사몰 및 무신사 내 브랜드 매출 성장에 크게 기여."
    },
    { 
        id: 9, 
        title: "ROCKPORT", 
        category: "DA", 
        image: tnrockport, 
        popupImage: rprockport, 
        ctr: "7.1%", roas: "185%", roi: "11%", cvr: "3.3%", 
        description: "자사몰/무신사 매출 증대 및 타겟 최적화",
        project_detail: "자사몰 및 무신사 스토어의 활성화와 매출 증대",
        plan: "- META Ads (자사몰 중심)\n- 무신사 협력광고\n- A/B 테스트 기반의 광고 소재 최적화로 타겟 반응을 분석 및 개선\n- 성과 우수 소재를 중심으로 캠페인 운영 전략을 최적화하고 예산을 유연하게 배분하여 ROAS 개선",
        result: "- META 자사몰 운영 ROAS 1,300% 달성\n- 무신사 협력광고 ROAS 1,100% 달성\n\n주력 소재 집중 운영을 통해 주요 타겟 매출 확대, 효율적 캠페인별 효율 최적화와 예산 운영 전략으로 자사몰 및 무신사 내 브랜드 매출 성장에 크게 기여."
    },
    { 
        id: 10, 
        title: "BROOKLYNWORKS", 
        category: "DA , SA , LIVE COMMERCE", 
        image: tnbrooklynworks, 
        popupImage: rpbrooklynworks, 
        ctr: "10.4%", roas: "280%", roi: "35%", cvr: "6%", 
        description: "자사몰 중심 매출 증대 및 라이브 커머스 활용",
        project_detail: "자사몰 및 무신사 스토어의 활성화와 매출 증대",
        plan: "- META Ads (자사몰 중심)\n- 무신사 협력광고\n- SA / DA\n- LIVE COMMERCE\n- 스마트스토어 META 트래픽 캠페인과 협력광고 복합 운영으로 높은 ROAS 달성\n- 라이브 커머스를 활용하여 안정적인 매출 성과 달성 및 브랜드 인지도 제고",
        result: "- META 네이버스토어 평균 CTR 8.3%, CPC 100원\n- 무신사 협력광고 ROAS 3,000% 달성\n- NAVER 검색광고 ROAS 500%\n\n주력 소재 집중 운영을 통해 주요 타겟 매출 확대하고, 캠페인별 최적화와 예산 운영으로 ROAS 목표 달성 및 지속 성장에 기여."
    },
    { 
        id: 11, 
        title: "LEGODT", 
        category: "DA , SA , 영상제작", 
        image: tnlegodt, 
        popupImage: rplegodt, 
        ctr: "6.4%", roas: "170%", roi: "8%", cvr: "2.8%", 
        description: "스마트스토어/인스타그램 활성화 및 29CM 매출 증대",
        project_detail: "스마트스토어 및 인스타그램 활성화, 29CM 내 브랜드 매출 증대",
        plan: "- META Ads, 협력광고\n- GFA, 네이버 브랜드검색\n- 숏폼 영상 기획·제작\n- GFA 운영을 통한 리타겟팅으로 고객 재유입 및 전환 극대화\n- 초기에는 스마트스토어 META 트래픽 캠페인 중심으로 운영했으나, 협력광고 진행 시 높은 ROAS를 달성하며 매출 효율 강화",
        result: "- 스마트스토어 및 인스타그램 팔로워 유입 크게 증가\n- 29CM 내 브랜드 매출 성장과 함께 높은 ROAS 확보\n\n타겟팅 최적화와 다양한 채널 운영으로 클릭수, 클릭율 상승하였고, 스마트스토어 및 29CM 에서 효율적인 광고 운영으로 매출 성과를 이끌어냄."
    },
    { 
        id: 12, 
        title: "ODENSE", 
        category: "DA , SA , 영상제작, LIVE COMMERCE", 
        image: tnodense, 
        popupImage: rpodense, 
        ctr: "8.5%", roas: "230%", roi: "22%", cvr: "4.8%", 
        description: "자사몰 및 29CM 스토어 매출 증대 및 라이브 커머스 활용",
        project_detail: "자사몰 및 29CM 스토어의 활성화와 매출 증대",
        plan: "- META Ads, 협력광고\n- 크리테오(Criteo), GFA\n- 유튜브 광고\n- 라이브 방송\n- 숏폼 영상 기획·제작\n- 브랜드 행사 기간에 맞춰 GFA·크리테오·유튜브 광고 등 DA 광고를 운영, 고객 재유입 확보 및 구매 유도",
        result: "자사몰 및 29CM 내 브랜드 매출 지속 성장\n브랜드 노출과 구매 전환율 높은 효율 달성\n\n다양한 채널을 결합해 재구매 유도와 신규 고객 유입을 동시에 강화, 자사몰과 29CM 내 브랜드 매출 성장과 브랜드 인지도 확대를 성공적으로 이끌어냄."
    },
    { 
        id: 13, 
        title: "PYRENEX", 
        category: "DA , SA , OHH, VIRAL", 
        image: tnpyrenex, 
        popupImage: rppyrenex, 
        ctr: "9.2%", roas: "275%", roi: "30%", cvr: "5.5%", 
        description: "브랜드 이미지 강화 및 오프라인 신규 매장 홍보",
        project_detail: "자사 브랜드 이미지 강화 및 오프라인 신규 매장 홍보",
        plan: "- META Ads\n- 아파트 광고\n- 언론 송출\n- 네이버 브랜드 검색\n- 다양한 매체를 활용하여 다양한 접점에서 브랜드 노출 극대화 하고 온, 오프라인 통합 운영으로 인지도를 높이는 동시에 매장 방문을 유도하는 전략 실행",
        result: "- 캠페인 운영을 통해 클릭 수, 클릭율이 크게 상승하였고, 다양한 온,오프라인 마케팅 활동으로 브랜드 검색량이 유의미하게 증가\n- 신규 매장 홍보와 브랜드 인지도 확장에서 눈에 띄는 성과를 거둠."
    },
    { 
        id: 14, 
        title: "K2", 
        category: "PPL", 
        image: tnk2, 
        popupImage: rpk2, 
        ctr: "9.5%", roas: "310%", roi: "28%", cvr: "5.2%", 
        description: "시즌 신상 홍보 및 인지도 확대",
        project_detail: "K2 시즌 신상 홍보",
        plan: "TV 예능 프로그램 노출\n출연진 개인 인스타그램 홍보",
        result: "브랜딩 목표 KPI 달성"
    },
    { 
        id: 15, 
        title: "2UC", 
        category: "SA , DA", 
        image: tn2uc, 
        popupImage: rp2uc, 
        ctr: "8.2%", roas: "200%", roi: "00%", cvr: "3%", 
        description: "메타 광고 활성화 및 매출 증대",
        project_detail: "2UC만의 메타광고 활성화 및 매출 증대",
        plan: "SA,DA 진행\n2UC만의 감각적인 디자인을 광고에 녹여 DA광고 활성화\n- 2UC만의 디자인을 강조한 광고소재 제작\n- META광고 전략적 셋팅으로 광고 최적화\n- 검색광고 진행 , 최적화",
        result: "목표 ROAS 달성, 재구매 및 충성고객 확보\n2023 메타 탑티어 계정 선정"
    },
    { 
        id: 16, 
        title: "꿈꾸는요셉", 
        category: "SA , DA", 
        image: tndreamsjoseph, 
        popupImage: rpdreamsjoseph, 
        ctr: "7.2%", roas: "190%", roi: "12%", cvr: "3.5%", 
        description: "브랜드 이미지 강화 및 지역 타겟 매장 홍보",
        project_detail: "자사 브랜드 이미지 강화 및 오프라인 매장 홍보",
        plan: "- META Ads\n- NAVER SA / DA\n- 매장별 지역 타겟을 나누어 META 캠페인 운영, 매체 효율 극대화\n- 브랜드 노출 극대화하여 고객 참여도를 높이는 동시에 매장 방문을 유도하는 전략 실행",
        result: "- 캠페인 후 CPC, 클릭율이 크게 개선, 다양한 마케팅 활동으로 브랜드 검색량 지속적으로 증가\n- 신규 매장 홍보와 브랜드 매출 확장에서 크게 기여"
    },
    { 
        id: 17, 
        title: "SHENB", 
        category: "SA , VIRAL", 
        image: tnshenb, 
        popupImage: rpshenb, 
        ctr: "11.2%", roas: "320%", roi: "42%", cvr: "7.1%", 
        description: "체험단 및 검색 마케팅을 통한 의료기기 인지도 강화 및 브랜드 신뢰도 확보",
        project_detail: "피부과 시술 체험단을 통한 의료기기 제품 인지도 강화 및 실사용 후기 중심의 브랜드 신뢰도 확보",
        plan: "- 네이버 블로그 인플루언서 체험단\n- 인스타그램 릴스 체험단\n- 네이버 브랜드 검색\n- 무신사와의 협력광고를 통해 신규 고객 유입 및 브랜드 인지도 상승 유도\n- 대중교통 옥외광고 진행\n\n온·오프라인을 아우르는 체험 중심 마케팅으로 의료기기의 실질적 효과를 전달하고, 병원 내 활용 사례를 중심으로 브랜드 전문성을 강조",
        result: "- 체험단 콘텐츠를 통한 자연스러운 제품 노출로 SNS 도달률과 참여율이 상승, 실제 제품 문의 및 병원 시술 예약률 증가\n- 블로그 후기와 릴스 콘텐츠가 바이럴되며 브랜드 검색량 및 인스타그램 팔로워 수 유의미한 성장 신뢰 기반의 체험형 콘텐츠 마케팅을 통해 브랜드 전문성과 소비자 신뢰 모두 강화."
    },
    { 
        id: 18, 
        title: "LUXI", 
        category: "SA , DA, VIRAL, CONTENTS CHANNEL, APP", 
        image: tnluxi, 
        popupImage: rpluxi, 
        ctr: "8.9%", roas: "215%", roi: "18%", cvr: "4.1%", 
        description: "운전자/탑승자 타겟 모집 및 앱 다운로드 증대",
        project_detail: "자사몰 및 무신사 스토어의 활성화와 매출 증대\n경쟁사보다 우위 선점",
        plan: "SA, DA, SNS, VIRAL, CONTENTS CHANNEL, APP 진행\n- 콘텐츠 제작 및 배포\n- 앱 다운로드 및 프로모션 이벤트 진행\n- 온라인 채널 관리(블로그 / SNS)\n- 디자인 소재 관리",
        result: "목표 브랜딩 ROAS 달성, 매체 효율 증대"
    },
    { 
        id: 19, 
        title: "국립극장", 
        category: "DA, SNS 광고 진행", 
        image: tnntok, 
        popupImage: rpntok, 
        ctr: "5.9%", roas: "145%", roi: "5%", cvr: "2.1%", 
        description: "공연 홍보 및 예매 유도",
        project_detail: "공연 홍보",
        plan: "DA, SNS 광고 진행\n접근성이 용이한 지역 및 유저 타겟광고\n- 배너 광고 – 네이버 / 카카오모먼트\n- SNS 이벤트 및 피드 광고",
        result: ""
    }
];

// --- Common UI Components ---

type OptionType = string | { label: string; icon?: string; link?: string; disabled?: boolean };

function CustomSelect({ label, options, placeholder, zIndex = 20, isFooter = false, onSelect }: { label?: string, options: OptionType[], placeholder?: string, zIndex?: number, isFooter?: boolean, onSelect?: (value: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>(placeholder || (typeof options[0] === 'string' ? options[0] : options[0].label));
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (option: OptionType) => {
        if (typeof option === 'object') {
            if (option.disabled) return;
            if (option.link) {
                window.open(option.link, '_blank');
            }
            setSelected(option.label);
            onSelect?.(option.label);
        } else {
            setSelected(option);
            onSelect?.(option);
        }
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col gap-2 relative ${isOpen ? 'z-50' : ''}`} ref={containerRef} style={{ zIndex: isOpen ? 50 : zIndex }}>
            {label && <label className="font-['Pretendard',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">{label}</label>}
            <div className={`relative ${isFooter ? 'w-full md:w-[280px]' : 'w-full'}`}>
                <div
                    className={`w-full h-[44px] rounded-[8px] bg-white border border-transparent px-4 flex items-center justify-between cursor-pointer focus:outline-none transition-colors ${isFooter ? 'focus:border-[#1b1c1f]/20' : 'focus:ring-2 focus:ring-[#1b1c1f]/20'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        {isFooter && <img src={mustCompanySvg} alt="icon" className="w-[18px] h-[18px]" />}
                        <span className={`font-['Pretendard',sans-serif] text-[16px] text-[#1b1c1f] ${isFooter ? 'font-normal leading-[130%]' : ''}`}>{isFooter ? "FAMILY SITE" : selected}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#1b1c1f] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                    <div className={`absolute left-0 w-full bg-white rounded-[8px] border border-[#e2e5ee] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] overflow-hidden py-0 z-50 ${isFooter ? 'bottom-[50px]' : 'top-[50px]'}`}>
                        <div className="max-h-[240px] overflow-y-auto">
                            {options.map((option, idx) => {
                                const isString = typeof option === 'string';
                                const label = isString ? option : option.label;
                                const isDisabled = !isString && option.disabled;

                                return (
                                    <div
                                        key={idx}
                                        className={`h-[44px] flex items-center px-[12px] transition-colors ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#f2f5fc]'} ${selected === label ? 'text-[#4970e7]' : 'text-[#1b1c1f]'
                                            }`}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {!isString && option.icon && <img src={option.icon} alt="" className="w-[18px] h-[18px] mr-2" />}
                                        <span className="font-['Pretendard',sans-serif] text-[14px] leading-[1.5]">{label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// --- Sections ---

function Header({ isDark, isScrolled, onContactClick, navItems, onLogoClick }: { isDark: boolean; isScrolled: boolean; onContactClick: () => void; navItems: Array<{ label: string; onClick: () => void }>; onLogoClick: () => void }) {
    return (
        <div className={`w-full flex justify-center fixed top-0 z-50 transition-colors duration-300 ${!isScrolled ? 'bg-transparent' : (isDark ? 'bg-black/10 backdrop-blur-md' : 'bg-[#f2f5fc]/80 backdrop-blur-md')}`}>
            <div className="flex gap-[16px] items-center px-4 md:px-[40px] py-[12px] md:py-[16px] relative shrink-0 w-full max-w-[1440px]">
                <div className="flex-grow md:flex-grow-0 flex items-center cursor-pointer group/logo" onClick={onLogoClick}>
                    <img src={logoSvg} alt="Must Engage" className={`h-[28px] w-auto transition-all duration-300 cursor-pointer ${isDark ? 'brightness-0 invert' : ''}`} />
                </div>
                <div className={`hidden md:flex basis-0 content-stretch font-['Pretendard',sans-serif] font-semibold gap-[48px] grow items-center justify-center leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-nowrap transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#1b1c1f]'}`}>
                    {navItems.map(item => (
                        <p key={item.label} onClick={item.onClick} className="relative shrink-0 cursor-pointer">{item.label}</p>
                    ))}
                </div>
                <div className="flex-grow md:flex-grow-0 flex justify-end items-center">
                    <div onClick={onContactClick} className={`hidden md:flex items-center justify-between pl-[24px] pr-[8px] py-[8px] relative rounded-full shrink-0 cursor-pointer transition-all duration-300 group border shadow-sm min-w-[170px] ${isDark ? 'bg-white/10 border-white/20 hover:bg-[#365EFF]' : 'bg-[rgba(255,255,255,0.3)] border-[rgba(255,255,255,0.12)] hover:bg-[#365EFF]'}`}>
                        <p className={`font-['Pretendard',sans-serif] font-semibold text-[16px] transition-colors duration-300 ${isDark ? 'text-white group-hover:text-white' : 'text-[#365EFF] group-hover:text-white'}`}>Contact Us</p>
                        <div className={`flex items-center justify-center p-[4px] rounded-full size-[32px] group-hover:scale-110 transition-transform duration-300 ${isDark ? 'bg-white text-[#1B1C1F] group-hover:bg-[#365EFF] group-hover:text-white' : 'bg-[#365EFF] text-white'}`}>
                            <ArrowNarrowRight color="currentColor" />
                        </div>
                    </div>
                    <div onClick={onContactClick} className="block md:hidden bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0 cursor-pointer">
                        <div className="absolute border border-solid border-white/12 inset-0 pointer-events-none rounded-[999px] shadow-[4px_4px_16px_0px_rgba(0,0,0,0.04)]" />
                        <div className="bg-[#365EFF] flex items-center justify-center p-[4px] rounded-[999px] size-[32px]"><EditIcon /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const ContactSection = React.forwardRef<HTMLDivElement>((_, ref) => {
    const options = {
        industry: [
            "뷰티 & 코스메틱",
            "패션 & 잡화",
            { label: "식품 & F&B", disabled: true },
            "라이프스타일 & 리빙",
            "IT & 플랫폼",
            "교육 & 육아",
            "병원 & 전문직"
        ],
        cat: [
            "리브랜딩 (Rebranding)",
            "IMC 캠페인 기획",
            { label: "검색광고 (SA)", disabled: true },
            "배너광고 (DA)",
            "SNS 운영",
            "바이럴 마케팅",
            "옥외광고",
            "유튜브 PPL"
        ]
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        industry: (options.industry[0] as any).label || options.industry[0] as string,
        category: (options.cat[0] as any).label || options.cat[0] as string,
        message: "",
        privacyAgreed: false
    });

    const isFormValid = formData.name.trim() !== "" && 
                       formData.email.trim() !== "" && 
                       formData.phone.trim() !== "" && 
                       formData.message.trim() !== "" && 
                       formData.privacyAgreed;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as any;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name.toLowerCase()]: value }));
        }
    };

    const handleSelect = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name.toLowerCase()]: value }));
    };

    return (
        <div ref={ref} className="w-full bg-[#f2f5fc] pt-0 pb-20 md:pb-32 px-4 flex justify-center">
            <div className="max-w-[1440px] w-full flex flex-col lg:flex-row gap-12 lg:gap-48 items-start justify-between">
                <div className="flex flex-col gap-[16px] md:gap-8 lg:sticky lg:top-32 self-start shrink-0 text-left">
                    <div className="flex flex-col gap-2">
                        <span className="text-[20px] md:text-[40px] text-[#1b1c1f]">Share Your Challange</span>
                        <div className="font-extrabold text-[28px] md:text-[64px] leading-[1.2] text-[#1b1c1f]"><p className="mb-0">정확한 진단에서</p><p>답이 시작됩니다.</p></div>
                    </div>
                    <p className="text-[18px] md:text-[20px] text-[#303235] whitespace-pre-line">{"견적이 아닌, 진단을 내드립니다.\n브랜드 전환, Must-Engage가 가장 빠른 해답입니다."}</p>
                </div>
                <div className="w-full max-w-[758px] flex flex-col gap-6">
                    {/* Row 1 */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">Name</label>
                        <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="브랜드명을 입력해주세요." className="w-full h-[48px] rounded-[8px] bg-white border border-[#E2E5EE] px-4 focus:outline-none focus:ring-2 focus:ring-[#1b1c1f]/20" />
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">E-mail</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="이메일을 입력해주세요." className="w-full h-[48px] rounded-[8px] bg-white border border-[#E2E5EE] px-4 focus:outline-none focus:ring-2 focus:ring-[#1b1c1f]/20" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">Phone</label>
                            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="연락처를 입력해주세요." className="w-full h-[48px] rounded-[8px] bg-white border border-[#E2E5EE] px-4 focus:outline-none focus:ring-2 focus:ring-[#1b1c1f]/20" />
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2 relative z-30">
                            <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">Industry</label>
                            <CustomSelect options={options.industry as any} onSelect={(val) => handleSelect("industry", val)} />
                        </div>
                        <div className="flex-1 flex flex-col gap-2 relative z-20">
                            <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">Category</label>
                            <CustomSelect options={options.cat as any} onSelect={(val) => handleSelect("category", val)} />
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="간단한 사업 소개와 목표 성과를 간략히 입력해주세요." className="w-full min-h-[140px] rounded-[8px] bg-white border border-[#E2E5EE] p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#1b1c1f]/20" />
                    </div>

                    {/* Privacy Agreement */}
                    <div className="flex flex-col gap-3">
                        <details className="group/details">
                            <summary className="list-none cursor-pointer outline-none list-none [&::-webkit-details-marker]:hidden">
                                <div className="flex items-center justify-between w-full cursor-pointer">
                                    <label className="flex items-center gap-2 cursor-pointer group !cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                        <input 
                                            type="checkbox" 
                                            name="privacyAgreed" 
                                            checked={formData.privacyAgreed} 
                                            onChange={handleChange}
                                            className="size-5 border border-[#E2E5EE] text-[#365EFF] focus:ring-0 focus:ring-offset-0 !cursor-pointer appearance-none checked:bg-[#365EFF] checked:border-transparent transition-all relative flex items-center justify-center after:content-[''] after:absolute after:hidden checked:after:block after:w-[5px] after:h-[9px] after:border-white after:border-b-2 after:border-r-2 after:rotate-45 after:translate-y-[-1px]" 
                                            style={{ borderRadius: '4px', backgroundColor: formData.privacyAgreed ? '#365EFF' : 'white', cursor: 'pointer' }}
                                        />
                                        <span className="text-[16px] text-[#1b1c1f] font-medium group-hover:text-[#365EFF] transition-colors !cursor-pointer">
                                            개인정보 수집 및 이용에 동의합니다. (선택)
                                        </span>
                                    </label>
                                    
                                    <div className="flex items-center gap-1 text-[16px] text-[#8b909b] hover:text-[#1b1c1f] transition-colors font-medium !cursor-pointer">
                                        <span className="!cursor-pointer hidden md:inline">내용보기</span>
                                        <ChevronDown className="w-[18px] h-[18px] transition-transform duration-200 group-open/details:rotate-180 !cursor-pointer" />
                                    </div>
                                </div>
                            </summary>
                            
                            <div className="bg-white/50 border border-[#E2E5EE] rounded-[8px] p-4 mt-3 max-h-[160px] overflow-y-auto">
                                <div className="text-[14px] text-[#555] leading-[1.6] space-y-4 font-['Pretendard',sans-serif]">
                                    <div>
                                        <p className="font-bold mb-1 text-[#1b1c1f]">개인정보 수집 및 이용에 대한 동의</p>
                                        <p>1. 수집 목적: 신규 마케팅 서비스 홍보, 뉴스레터 발송</p>
                                        <p>2. 수집 항목: 성함, 이메일, 연락처</p>
                                        <p>3. 보유 및 이용 기간: 보유기간 2년, 마케팅 동의 철회 시까지</p>
                                        <p>4. 서비스 제공을 위한 위탁: 회사는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
                                        <p>5. 수탁자: (주)머스트인게이지 / 위탁업무 : 신규 마케팅 서비스 홍보</p>
                                    </div>
                                    <p>“귀하는 위와 같은 개인정보 수집 및 이용에 거부할 권리가 있습니다. 본 동의는 선택 사항이며, 거부 시에도 서비스 이용은 가능하나 뉴스레터 및 이벤트 혜택 안내 등 일부 서비스 제공이 제한될 수 있습니다.”</p>
                                </div>
                            </div>
                        </details>
                    </div>

                    {/* Button */}
                    <button 
                        disabled={!isFormValid}
                        className={`w-full flex justify-between items-center pl-6 pr-2 py-3 rounded-full transition-all mt-4 group border ${
                            isFormValid 
                            ? "bg-[#3155F6] border-transparent hover:bg-[#1b1c1f] shadow-lg cursor-pointer" 
                            : "bg-[rgba(255,255,255,0.3)] border-[rgba(255,255,255,0.12)] shadow-sm cursor-not-allowed"
                        }`}
                    >
                        <span className={`font-bold text-[18px] transition-colors ${isFormValid ? "text-white" : "text-[#B4B9C5]"}`}>브랜드 진단 요청하기</span>
                        <div className={`rounded-full p-1 size-[36px] flex items-center justify-center transition-all duration-300 ${
                            isFormValid 
                            ? "bg-white text-[#3155F6] group-hover:text-[#1b1c1f] group-hover:scale-110" 
                            : "bg-[#B4B9C5] text-white"
                        }`}>
                            <ArrowNarrowRight color="currentColor" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
});

// --- Main Pages ---

export default function LandingPage() {
    const [isDarkHeader, setIsDarkHeader] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [heroData, setHeroData] = useState<HeroContent | undefined>();
    const [diagnosisData, setDiagnosisData] = useState<any | undefined>();
    const [renovationData, setRenovationData] = useState<any | undefined>();
    const [projectsData, setProjectsData] = useState<ProjectItem[]>([]);
    const darkSectionRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const diagnosisRef = useRef<HTMLDivElement>(null);
    const renovationRef = useRef<HTMLDivElement>(null);
    const imcRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const insightsRef = useRef<HTMLDivElement>(null);

    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToContact = () => scrollTo(contactRef);

    const navItems = [
        { label: "The Problem", onClick: () => scrollTo(diagnosisRef) },
        { label: "Transformation", onClick: () => scrollTo(renovationRef) },
        { label: "IMC", onClick: () => scrollTo(imcRef) },
        { label: "portfolio", onClick: () => scrollTo(resultsRef) },
        { label: "Insights", onClick: () => scrollTo(insightsRef) },
    ];

    useEffect(() => {
        const unsubscribes: (() => void)[] = [];

        const setupAllSubscriptions = async () => {
            try {
                // 1. Hero
                const hData = await getLandingHero();
                if (hData) setHeroData(hData as unknown as HeroContent);
                const subHero = await directus.subscribe('landing_hero', { query: { fields: ['*'] } });
                unsubscribes.push(subHero.unsubscribe);
                (async () => {
                    for await (const update of subHero.subscription) {
                        if (update.event === 'update') {
                            const updated = await getLandingHero();
                            setHeroData(updated as unknown as HeroContent);
                        }
                    }
                })();

                // 2. Diagnosis
                const dData = await getLandingDiagnosis();
                if (dData) setDiagnosisData(dData);
                const subDiag = await directus.subscribe('landing_diagnosis', { query: { fields: ['*'] } });
                unsubscribes.push(subDiag.unsubscribe);
                (async () => {
                    for await (const update of subDiag.subscription) {
                        if (update.event === 'update') {
                            const updated = await getLandingDiagnosis();
                            setDiagnosisData(updated);
                        }
                    }
                })();

                // 3. Renovation
                const rData = await getLandingRenovation();
                if (rData) setRenovationData(rData);
                const subReno = await directus.subscribe('landing_renovation', { query: { fields: ['*'] } });
                unsubscribes.push(subReno.unsubscribe);
                (async () => {
                    for await (const update of subReno.subscription) {
                        if (update.event === 'update') {
                            const updated = await getLandingRenovation();
                            setRenovationData(updated);
                        }
                    }
                })();

                // 4. Projects
                const pData = await getProjects();
                if (pData) setProjectsData(pData as unknown as ProjectItem[]);
                const subProj = await directus.subscribe('projects', { query: { fields: ['*'] } });
                unsubscribes.push(subProj.unsubscribe);
                (async () => {
                    for await (const update of subProj.subscription) {
                        if (update.event === 'update' || update.event === 'create' || update.event === 'delete') {
                            const updated = await getProjects();
                            setProjectsData(updated as unknown as ProjectItem[]);
                        }
                    }
                })();

            } catch (error) {
                console.error("Subscription setup failed:", error);
            }
        };

        setupAllSubscriptions();

        return () => {
            unsubscribes.forEach(unsub => unsub());
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);

            if (darkSectionRef.current) {
                const rect = darkSectionRef.current.getBoundingClientRect();
                const headerHeight = 80;
                const isOverDarkSection = rect.top <= headerHeight && rect.bottom >= headerHeight;
                setIsDarkHeader(isOverDarkSection);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full bg-[#f2f5fc] min-h-screen font-['Pretendard',sans-serif] relative">
            <Header isDark={isDarkHeader} isScrolled={isScrolled} onContactClick={scrollToContact} navItems={navItems} onLogoClick={scrollToTop} />
            <Hero data={heroData} />
            <div ref={diagnosisRef}><DiagnosisSection data={diagnosisData} /></div>
            <div ref={darkSectionRef} className="w-full relative md:bg-fixed" style={{ backgroundImage: `url(${section03Bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div ref={renovationRef}><RenovationSection data={renovationData} /></div>
                <div ref={imcRef}><ImcSection /></div>
                <div ref={resultsRef}><ResultsSection projects={projectsData.length > 0 ? projectsData : PROJECTS} onContactClick={scrollToContact} /></div>
            </div>

            {/* Insights */}
            <div ref={insightsRef} className="w-full bg-[#f2f5fc] pt-[120px] pb-[240px] px-4 flex flex-col items-center gap-16">
                <div className="text-center flex flex-col gap-4">
                    <h2 className="font-['Pretendard',sans-serif] font-extrabold text-[28px] md:text-[64px] text-[#1b1c1f] uppercase leading-[1.3] md:leading-[1.2]"><p className="mb-0">READ THE MARKET,</p><p>LEAD THE BRAND</p></h2>
                    <p className="font-['Pretendard',sans-serif] text-[18px] md:text-[20px] text-[#303235] font-normal leading-[1.5]">브랜드 리노베이션, 메시지 아키텍처, IMC 전략 등<br />Must-Engage만의 관점과 연구를 공유합니다.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-16 md:gap-4 w-full max-w-[1440px]">
                    {[
                        {
                            id: "01",
                            title: "올리브영은 왜 '망곰이'를 매장에 풀었을까?",
                            description: "최근 리테일은 단순 판매를 넘어 고객이 머물러야 할 이유를 제안하는 '체험의 장'으로 진화하고 있습니다.",
                            image: insights01,
                            link: "https://www.instagram.com/p/DUSgGQEEo7m/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                        },
                        {
                            id: "02",
                            title: "촌스럽다고요? 지금이 제일 힙한데요!",
                            description: "최근 SNS에서는 2016년 감성의 필터나 회상 장면 등 과거의 이미지가 다시 활발하게 활용되고 있어요.",
                            image: insights02,
                            link: "https://www.instagram.com/p/DUAaqy9kiKV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                        },
                        {
                            id: "03",
                            title: "비행기 10시간, 누구 옆에 앉으실래요?",
                            description: "최근 SNS 피드에서 \"장시간 비행, 누구 옆자리에 앉을 것인가\"를 묻는 질문 보신 적 있나요?",
                            image: insights03,
                            link: "https://www.instagram.com/p/DUFrZnIkoZb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                        }
                    ].map(item => (
                        <div key={item.id} className="flex-1 flex flex-col gap-4">
                            <span className="font-['Pretendard',sans-serif] font-extrabold text-[40px] text-[#d0d4e0] leading-[1]">{item.id}</span>
                            <div className="flex flex-col gap-2">
                                <h4 className="font-['Pretendard',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#1b1c1f] leading-[1.5]">{item.title}</h4>
                                <p className="font-['Pretendard',sans-serif] font-normal text-[16px] text-[#303235] leading-[1.5]">{item.description}</p>
                            </div>
                            <div 
                                className="relative aspect-[400/500] rounded-[24px] overflow-hidden group cursor-pointer"
                                onClick={() => item.link !== "#" && window.open(item.link, '_blank')}
                            >
                                <img src={item.image} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#1B1C1F]/0 to-[#1B1C1F]" />
                                <div className="absolute inset-x-0 bottom-8 flex justify-center">
                                    <div className="bg-white/10 backdrop-blur pl-5 pr-2 py-2 rounded-full flex items-center gap-8 hover:bg-[#365EFF] hover:border-transparent transition-all text-white hover:text-white border border-[rgba(255,255,255,0.12)] shadow-sm group/btn">
                                        <span className="font-semibold">자세히보기</span>
                                        <div className="bg-white rounded-full p-1 size-8 text-[#1B1C1F] group-hover/btn:text-white group-hover/btn:bg-[#365EFF] transition-colors flex items-center justify-center"><ArrowNarrowRight color="currentColor" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ContactSection ref={contactRef} />

            {/* Footer */}
            <div className="w-full bg-[#e2e5ee] py-16 px-4 flex justify-center">
                <div className="max-w-[1440px] w-full flex flex-col md:flex-row gap-8 lg:gap-20 justify-between text-[#8b909b]">
                    <div className="flex flex-col gap-6 shrink-0">
                        <img src={mustCreativeSvg} alt="Must Creative" className="h-[24px] w-auto object-contain place-self-start" />
                        <div className="flex flex-col font-['Pretendard',sans-serif] text-[16px] font-normal text-[#8b909b] leading-[1.5]">
                            <p>주)머스트인게이지</p>
                            <p>대표자: 차주헌</p>
                            <p>사업자등록번호: 000-00-00000</p>
                            <p>서울특별시 강남구 논현동 28-2</p>
                                <p>© 2025 Must-Engage.</p>
                                <p>All rights reserved.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="font-['Pretendard',sans-serif] font-semibold text-[24px] text-[#1b1c1f] leading-[1.5]">Our Services</h4>
                        <div className="flex gap-8 lg:gap-16 text-[15px]">
                            <div className="flex flex-col gap-2"> {["Rebranding", "IMC Campaign", "검색광고 (SA)", "배너광고(DA)", "SNS 운영"].map(t => <p key={t}>{t}</p>)} </div>
                            <div className="flex flex-col gap-2"> {["바이럴 마케팅", "옥외광고", "Youtube PPL"].map(t => <p key={t}>{t}</p>)} </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="font-['Pretendard',sans-serif] font-semibold text-[24px] text-[#1b1c1f] leading-[1.5]">Contact Us</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-[15px]">
                                <img src={emailIcon} alt="Email" className="w-5 h-5" />
                                <span>ingo@domain.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-[15px]">
                                <img src={callIcon} alt="Phone" className="w-5 h-5" />
                                <span>+82-13-1234</span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-auto">
                            <img src={snsIcon4} alt="Instagram" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={snsIcon3} alt="Threads" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={snsIcon1} alt="Blog" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={snsIcon2} alt="Kakao" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="font-['Pretendard',sans-serif] font-semibold text-[24px] text-[#1b1c1f] leading-[1.5]">Must Company</h4>
                        <CustomSelect
                            options={[
                                { label: "머스트컴퍼니", icon: mustCompanySvg, link: "https://must.company/#main-page" },
                                { label: "머스트핀테크", icon: mufinSvg, link: "https://mufin.co.kr/" },
                                { label: "머스트크리에이티브", icon: mustCreativeSvg, disabled: true },
                                { label: "머스트U", icon: mustuSvg, link: "https://www.mustu.asia/" },
                                { label: "모드", icon: moadSvg, link: "https://moad.live/" },
                                { label: "포틀리에", icon: fortelierSvg, link: "https://www.fortelier.co.kr/" }
                            ]}
                            placeholder="FAMILY SITE"
                            isFooter={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
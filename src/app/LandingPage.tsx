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
import imgHero from "../assets/5ec6b520f685d64fd53f5860c08046c6e133b073.png";
import imgSection01 from "../assets/54e2d4b76998542d0da597f7bda04a72cbad0dc8.png";
import imgKnot3 from "../assets/2680822d0835c3f69e72c78587f9dd56dcc0393e.png";
import imgRoundTube from "../assets/5844140db5e4a7f98eff3af5978375a285be96b5.png";
import img01271 from "../assets/f5c0bcb78df559249d013f7bdfc12ca5567c8337.png";
import img00441 from "../assets/c4d16f4050279074afa83dd2ab9bd61c2e4d5184.png";
import imgGroup611 from "../assets/148785fed14711aa7266811c96469ce4bea328e0.png";
import blackBg from "../assets/black-bg.png";
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

const PROJECTS = [
    {
        id: 1,
        title: "LUXI x kakao mobility",
        category: "Mobility Service",
        image: "https://picsum.photos/seed/luxi/600/800",
        ctr: "8.2%",
        roas: "200%",
        roi: "00%",
        cvr: "3%",
        description: "이곳은 주요 성과의 요약본을 써야 합니다. 웬만하면, 진단, 리노베이션, 솔루션의 내용이 포함될수록 좋습니다."
    },
    {
        id: 2,
        title: "ISAAC TOAST",
        category: "Food & Beverage",
        image: "https://picsum.photos/seed/isaac/600/800",
        ctr: "7.5%",
        roas: "180%",
        roi: "15%",
        cvr: "4%",
        description: "브랜드 아이덴티티 강화를 통한 온라인 매출 증대 전략을 수립하였습니다."
    },
    {
        id: 3,
        title: "KFC Korea",
        category: "Global Brand",
        image: "https://picsum.photos/seed/kfc/600/800",
        ctr: "9.1%",
        roas: "220%",
        roi: "25%",
        cvr: "5%",
        description: "디지털 트랜스포메이션을 통한 고객 경험 혁신 프로젝트입니다."
    },
    {
        id: 4,
        title: "BALMAIN PARIS",
        category: "Luxury Fashion",
        image: "https://picsum.photos/seed/balmain/600/800",
        ctr: "6.8%",
        roas: "350%",
        roi: "40%",
        cvr: "2.5%",
        description: "하이엔드 타겟을 위한 프리미엄 디지털 캠페인 성과 요약입니다."
    },
    {
        id: 5,
        title: "SO' NATURAL",
        category: "Cosmetics",
        image: "https://picsum.photos/seed/sonatural/600/800",
        ctr: "10.4%",
        roas: "280%",
        roi: "35%",
        cvr: "6%",
        description: "MZ 세대를 겨냥한 트렌디한 마케팅 솔루션 및 브랜딩 전략."
    },
    {
        id: 6,
        title: "BRANDWORKS KOREA",
        category: "Corporate Branding",
        image: "https://picsum.photos/seed/bwk/600/800",
        ctr: "5.5%",
        roas: "150%",
        roi: "10%",
        cvr: "2%",
        description: "기업 브랜드 가치 제고를 위한 통합 디자인 리노베이션 결과."
    },
    {
        id: 7,
        title: "PYRENEX",
        category: "Fashion Archive",
        image: "https://picsum.photos/seed/pyrenex/600/800",
        ctr: "8.8%",
        roas: "240%",
        roi: "20%",
        cvr: "4.5%",
        description: "글로벌 아카이브를 활용한 로컬라이징 마케팅 성공 사례."
    }
];

// --- Common UI Components ---

type OptionType = string | { label: string; icon?: string; link?: string; disabled?: boolean };

function CustomSelect({ label, options, placeholder, zIndex = 20, isFooter = false }: { label?: string, options: OptionType[], placeholder?: string, zIndex?: number, isFooter?: boolean }) {
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
        } else {
            setSelected(option);
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

function Header({ isDark, isScrolled }: { isDark: boolean; isScrolled: boolean }) {
    return (
        <div className={`w-full flex justify-center fixed top-0 z-50 transition-colors duration-300 ${!isScrolled ? 'bg-transparent' : (isDark ? 'bg-black/10 backdrop-blur-md' : 'bg-[#f2f5fc]/80 backdrop-blur-md')}`}>
            <div className="flex gap-[16px] items-center px-4 md:px-[40px] py-[12px] md:py-[16px] relative shrink-0 w-full max-w-[1440px]">
                <div className="flex-grow md:flex-grow-0 flex items-center">
                    <img src={logoSvg} alt="Must Engage" className={`h-[28px] w-auto transition-all duration-300 ${isDark ? 'brightness-0 invert' : ''}`} />
                </div>
                <div className={`hidden md:flex basis-0 content-stretch font-['Pretendard',sans-serif] font-semibold gap-[48px] grow items-center justify-center leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-nowrap transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#1b1c1f]'}`}>
                    {["About US", "The Problem", "Transformation", "IMC", "portfolio", "Insights"].map(text => (
                        <p key={text} className="relative shrink-0 cursor-pointer">{text}</p>
                    ))}
                </div>
                <div className="flex-grow md:flex-grow-0 flex justify-end items-center">
                    <div className={`hidden md:flex items-center justify-between pl-[24px] pr-[8px] py-[8px] relative rounded-full shrink-0 cursor-pointer transition-all duration-300 group border shadow-sm min-w-[170px] ${isDark ? 'bg-white/10 border-white/20 hover:bg-white' : 'bg-[rgba(255,255,255,0.3)] border-[rgba(255,255,255,0.12)] hover:bg-[#1b1c1f]'}`}>
                        <p className={`font-['Pretendard',sans-serif] font-semibold text-[16px] transition-colors duration-300 ${isDark ? 'text-white group-hover:text-black' : 'text-[#1b1c1f] group-hover:text-white'}`}>Contact Us</p>
                        <div className={`flex items-center justify-center p-[4px] rounded-full size-[32px] group-hover:scale-110 transition-transform duration-300 ${isDark ? 'bg-white text-black' : 'bg-[#1b1c1f]'}`}>
                            <ArrowNarrowRight color={isDark ? "black" : "white"} />
                        </div>
                    </div>
                    <div className="block md:hidden bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0 cursor-pointer">
                        <div className="absolute border border-solid border-white/12 inset-0 pointer-events-none rounded-[999px] shadow-[4px_4px_16px_0px_rgba(0,0,0,0.04)]" />
                        <div className="bg-[#1b1c1f] flex items-center justify-center p-[4px] rounded-[999px] size-[32px]"><EditIcon /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function ContactSection() {
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
    return (
        <div className="w-full bg-[#f2f5fc] py-20 md:py-32 px-4 flex justify-center">
            <div className="max-w-[1440px] w-full flex flex-col lg:flex-row gap-12 lg:gap-48 items-start justify-between">
                <div className="flex flex-col gap-8 lg:sticky lg:top-32 self-start shrink-0">
                    <div className="flex flex-col gap-2">
                        <span className="text-[20px] md:text-[40px] text-[#1b1c1f]">Share Your Challange</span>
                        <div className="font-extrabold text-[28px] md:text-[64px] leading-[1.2] text-[#1b1c1f]"><p className="mb-0">정확한 진단에서</p><p>답이 시작됩니다.</p></div>
                    </div>
                    <p className="text-[18px] md:text-[20px] text-[#303235]">견적이 아닌, 진단을 내드립니다.<br />브랜드 전환, Must-Engage가 가장 빠른 해답입니다.</p>
                </div>
                <div className="w-full max-w-[758px] flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-6">
                        {[{ l: "Name", t: "text" }, { l: "E-mail", t: "email" }, { l: "Phone", t: "tel" }].map(f => (
                            <div key={f.l} className="flex flex-col gap-2">
                                <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">{f.l}</label>
                                <input type={f.t} className="w-full h-[44px] rounded-[8px] bg-white border border-transparent px-4 focus:outline-none focus:ring-2 focus:ring-[#1b1c1f]/20" />
                            </div>
                        ))}
                        <CustomSelect label="Industry" options={options.industry as any} placeholder="뷰티 & 코스메틱" zIndex={30} />
                        <CustomSelect label="Category" options={options.cat as any} placeholder="리브랜딩 (Rebranding)" zIndex={20} />
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2 grow h-full">
                            <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">Message</label>
                            <textarea className="w-full h-full min-h-[124px] rounded-[8px] bg-white border border-transparent p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#1b1c1f]/20" />
                        </div>
                        <button className="w-full bg-[rgba(255,255,255,0.3)] flex justify-between items-center pl-6 pr-2 py-2 rounded-full border border-[rgba(255,255,255,0.12)] shadow-sm hover:bg-[#1b1c1f] group mt-auto transition-all">
                            <span className="font-semibold text-[16px] text-[#1b1c1f] group-hover:text-white">브랜드 진단 요청하기</span>
                            <div className="bg-[#1b1c1f] rounded-full p-1 size-[32px] flex items-center justify-center text-white group-hover:scale-110"><ArrowNarrowRight /></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main Pages ---

export default function LandingPage() {
    const [isDarkHeader, setIsDarkHeader] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [heroData, setHeroData] = useState<HeroContent | undefined>();
    const [diagnosisData, setDiagnosisData] = useState<any | undefined>();
    const [renovationData, setRenovationData] = useState<any | undefined>();
    const [projectsData, setProjectsData] = useState<ProjectItem[]>([]);
    const darkSectionRef = useRef<HTMLDivElement>(null);

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
            <Header isDark={isDarkHeader} isScrolled={isScrolled} />
            <Hero data={heroData} />
            <DiagnosisSection data={diagnosisData} />
            <div ref={darkSectionRef} className="w-full relative" style={{ backgroundImage: `url(${blackBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <RenovationSection data={renovationData} />
                <ImcSection />
                <ResultsSection projects={projectsData.length > 0 ? projectsData : PROJECTS} />
            </div>

            {/* Insights */}
            <div className="w-full bg-[#f2f5fc] pt-[120px] pb-20 px-4 flex flex-col items-center gap-16">
                <div className="text-center flex flex-col gap-4">
                    <h2 className="font-['Pretendard',sans-serif] font-extrabold text-[28px] md:text-[64px] text-[#1b1c1f] uppercase leading-[1.3] md:leading-[1.2]"><p className="mb-0">READ THE MARKET,</p><p>LEAD THE BRAND</p></h2>
                    <p className="font-['Pretendard',sans-serif] text-[18px] md:text-[20px] text-[#303235] font-normal leading-[1.5]">브랜드 리노베이션, 메시지 아키텍처, IMC 전략 등<br />Must-Engage만의 관점과 연구를 공유합니다.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-16 md:gap-4 w-full max-w-[1440px]">
                    {["01", "02", "03"].map(id => (
                        <div key={id} className="flex-1 flex flex-col gap-4">
                            <span className="font-['Pretendard',sans-serif] font-extrabold text-[40px] text-[#d0d4e0] leading-[1]">{id}</span>
                            <div className="flex flex-col gap-2">
                                <h4 className="font-['Pretendard',sans-serif] font-semibold text-[24px] text-[#1b1c1f] leading-[1.5]">여기는 제목을 입력하는 칸입니다.</h4>
                                <p className="font-['Pretendard',sans-serif] font-normal text-[16px] text-[#303235] leading-[1.5]">여기는 설명 문구가 들어가는 자리입니다.</p>
                            </div>
                            <div className="relative aspect-[400/500] rounded-[24px] overflow-hidden group cursor-pointer">
                                <img src={`https://images.unsplash.com/photo-${id === "01" ? "1613759612065-d5971d32ca49" : id === "02" ? "1742440710226-450e3b85c100" : "1542744173-05336fcc7ad4"}?fit=crop&w=800`} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#1B1C1F]/0 to-[#1B1C1F]" />
                                <div className="absolute inset-x-0 bottom-8 flex justify-center">
                                    <div className="bg-white/10 backdrop-blur pl-5 pr-2 py-2 rounded-full flex items-center gap-8 hover:bg-white group transition-all text-white hover:text-black border border-[rgba(255,255,255,0.12)] shadow-sm">
                                        <span className="font-semibold">자세히보기</span>
                                        <div className="bg-white rounded-full p-1 size-8 text-black group-hover:bg-white transition-colors flex items-center justify-center"><ArrowNarrowRight color="#1B1C1F" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ContactSection />

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
                            <div className="flex flex-col gap-2"> {["Rebranding", "IMC Campaign", "검색광고 (SA)", "배너광고(DA)", "SNS 운영"].map(t => <p key={t} className="hover:text-[#1b1c1f] cursor-pointer transition-colors">{t}</p>)} </div>
                            <div className="flex flex-col gap-2"> {["바이럴 마케팅", "옥외광고", "Youtube PPL"].map(t => <p key={t} className="hover:text-[#1b1c1f] cursor-pointer transition-colors">{t}</p>)} </div>
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
                            <img src={snsIcon1} alt="SNS" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={snsIcon2} alt="SNS" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={snsIcon3} alt="SNS" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={snsIcon4} alt="SNS" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
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

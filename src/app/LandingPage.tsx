import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "motion/react";
import {
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { svgPaths } from "./utils/svgPaths";

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

const SPRING_CONFIG = {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
};

// --- Sub-components (Icon components) ---

function ArrowNarrowRight({ color = "white" }: { color?: string }) {
    return (
        <div className="relative shrink-0 size-[20px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d={svgPaths.p31c5f200} fill={color} />
            </svg>
        </div>
    );
}

function EditIcon() {
    return (
        <div className="relative shrink-0 size-[20px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d={svgPaths.pf8b7600} fill="white" />
            </svg>
        </div>
    );
}

function SliderCard({ item, index, activeIndex, totalItems }: { item: any; index: number; activeIndex: number; totalItems: number }) {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    /**
     * 정밀한 여백 및 레이어링 계산
     */
    const getTransformValues = (off: number) => {
        const cardWidth = 280;
        const halfWidth = cardWidth / 2;
        const centerScale = 0.95;
        const sideGap = 16; // 측면 카드들 사이의 고정 여백
        const centerOverlap = -24; // 중앙 카드와 인접 카드 사이의 중첩값 (음수면 겹침)

        const direction = Math.sign(off);
        let x = 0;

        if (off !== 0) {
            // 1. 중앙 카드와의 첫 번째 거리 (중앙이 인접 카드를 살짝 덮도록 설정)
            const firstStep = (halfWidth * centerScale) + halfWidth + centerOverlap;

            // 2. 이후 카드들은 16px 여백을 유지하며 배치
            const additionalSteps = (Math.abs(off) - 1) * (cardWidth + sideGap);

            x = direction * (firstStep + additionalSteps);
        }

        // 3. 3D 곡률 및 회전
        const radian = (off * 20 * Math.PI) / 180;
        const z = isCenter ? 150 : -400 + (1 - Math.cos(radian)) * 500;
        const rotateY = -off * 18;

        // 4. 시각 속성 (측면 카드 어둡게 처리)
        const scale = isCenter ? centerScale : 1.0;
        const brightness = isCenter ? 1.0 : Math.max(0.55, 0.75 - (absOffset - 1) * 0.1);
        const opacity = absOffset > 4.5 ? 0 : 1;

        return { x, z, rotateY, scale, opacity, brightness };
    };

    const { x, z, rotateY, scale, opacity, brightness } = getTransformValues(offset);

    // 레이어링: 중앙 카드가 가장 앞으로 오고, 멀어질수록 뒤로 가게 설정
    const zIndex = 1000 - Math.floor(absOffset * 100);

    return (
        <motion.div
            className="absolute w-[280px] h-[380px]"
            initial={false}
            animate={{
                x: x,
                z: z,
                rotateY: rotateY,
                scale: scale,
                opacity: opacity,
            }}
            transition={SPRING_CONFIG}
            style={{
                zIndex: zIndex,
                transformStyle: "preserve-3d",
                perspective: "1000px", // preserving perspective here as well or parent? Demo has preserve-3d on parent
                // backfaceVisibility: "hidden", // Demo has this
                pointerEvents: isCenter ? 'auto' : 'none',
            }}
        >
            <motion.div
                className={`w-full h-full relative rounded-[16px] overflow-hidden bg-[#121212] border border-white/10 ${isCenter
                        ? 'ring-[2px] ring-white/40 shadow-[0_0_100px_rgba(255,255,255,0.15)]'
                        : 'shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
                    }`}
                animate={{
                    filter: `brightness(${brightness})`,
                    borderColor: isCenter ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.05)'
                }}
                transition={SPRING_CONFIG}
            >
                {/* 이미지 섹션 */}
                <div className="absolute inset-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                    />
                </div>


                {/* 측면 카드 암부 오버레이 (0.05 -> 0.2로 강화하여 대비 증대) */}
                {!isCenter && (
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                )}
            </motion.div>
        </motion.div>
    );
}

function ThreeDSlider({ items, activeIndex }: { items: any[]; activeIndex: number }) {
    const totalOriginal = items.length;
    const visibleRange = React.useMemo(() => {
        return Array.from({ length: 11 }, (_, i) => activeIndex - 5 + i);
    }, [activeIndex]);

    return (
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {visibleRange.map((i) => {
                const projectIndex = ((i % totalOriginal) + totalOriginal) % totalOriginal;
                const project = items[projectIndex];
                return <SliderCard key={`${project.id}-${i}`} item={project} index={i} activeIndex={activeIndex} totalItems={totalOriginal} />;
            })}
        </div>
    );
}

// --- Diagnosis Graphics ---

function Group12() {
    return (
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            {[0, 12, 24, 36].map(y => <div key={y} className="[grid-area:1_/_1] bg-black size-[12px]" style={{ marginTop: `${y}px` }} />)}
            <div className="[grid-area:1_/_1] bg-black ml-[36px] mt-[36px] size-[12px]" />
            <div className="[grid-area:1_/_1] bg-black ml-[24px] mt-[24px] size-[12px]" />
            <div className="[grid-area:1_/_1] bg-black ml-[12px] mt-0 size-[12px]" />
            {[24, 36].map(x => <div key={x} className="[grid-area:1_/_1] bg-black mt-0 size-[12px]" style={{ marginLeft: `${x}px` }} />)}
        </div>
    );
}

function Group11() {
    return (
        <div className="relative shrink-0 size-[48px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.0001 48.0001">
                <rect fill="black" height="12" width="12" x="0" y="24" />
                <rect fill="black" height="12" width="12" y="12" />
                <rect fill="black" height="12" width="12" x="12" y="0" />
                <rect fill="black" height="12" width="12" x="24" y="36" />
                <rect fill="black" height="12" width="12" x="36" y="24" />
                <rect fill="black" height="12" width="12" x="36" y="12" />
                <path d={svgPaths.p17deb400} fill="black" />
                <path d={svgPaths.p3b62fd80} fill="black" />
                <path d={svgPaths.p34d9c200} fill="black" />
                <path d={svgPaths.p2f415100} fill="black" />
            </svg>
        </div>
    );
}

function Group2() {
    const positions = ["ml-[15.87px] mt-0", "ml-0 mt-[15.95px]", "ml-[31.89px] mt-[15.95px]", "ml-[15.87px] mt-[31.89px]"];
    return (
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            {positions.map((pos, i) => (
                <div key={i} className={`[grid-area:1_/_1] flex items-center justify-center relative size-[16.108px] ${pos}`}>
                    <div className="flex-none rotate-[315deg] size-[11.39px]">
                        <div className="bg-black size-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function Group1() {
    return (
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] bg-[#1b1c1f] h-[12px] ml-0 mt-[12px] w-[12.001px]" />
            <div className="[grid-area:1_/_1] bg-[#1b1c1f] h-[12px] ml-[12px] mt-[24px] w-[12.001px]" />
            <div className="[grid-area:1_/_1] bg-[#1b1c1f] h-[12px] ml-[12px] mt-0 w-[12.001px]" />
            <div className="[grid-area:1_/_1] bg-[#1b1c1f] h-[12px] ml-[11.99px] mt-[36px] w-[12.001px]" />
            <div className="[grid-area:1_/_1] flex h-[12px] items-center justify-center ml-[12px] mt-[12px] relative w-[36.002px]">
                <div className="flex-none rotate-[90deg]">
                    <div className="bg-[#1b1c1f] h-[36.002px] w-[12px]" />
                </div>
            </div>
        </div>
    );
}

// --- Card Components ---

function Card({ num, title, subtitle, graphic }: { num: string, title: string, subtitle: string, graphic: React.ReactNode }) {
    return (
        <div className="bg-[rgba(255,255,255,0.6)] content-stretch flex flex-col gap-[88px] items-center px-[16px] py-[24px] relative rounded-[16px] w-[292px] backdrop-blur-sm">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.6)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[12px_12px_40px_0px_rgba(0,0,0,0.04)]" />
            <p className="font-['Pretendard',sans-serif] font-extrabold leading-[1.5] not-italic relative shrink-0 text-[#d0d4df] text-[32px] text-center text-nowrap">{num}</p>
            {graphic}
            <div className="content-stretch flex flex-col items-center leading-[1.5] not-italic relative shrink-0 text-nowrap">
                <p className="font-['Pretendard',sans-serif] font-semibold relative shrink-0 text-[#1b1c1f] text-[32px] text-center">{title}</p>
                <p className="font-['Pretendard',sans-serif] font-normal relative shrink-0 text-[#b4b9c5] text-[16px] uppercase">{subtitle}</p>
            </div>
        </div>
    );
}

// --- Common UI Components ---

type OptionType = string | { label: string; icon: string; link?: string; disabled?: boolean };

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

function Hero() {
    return (
        <div className="flex flex-col items-center relative w-full h-screen min-h-[600px]">
            <img alt="Hero Background" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgHero} />
            <div className="basis-0 grow w-full max-w-[1440px] flex flex-col px-4 md:px-[40px] relative shrink-0 z-10 pointer-events-none">
                <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 w-full pointer-events-auto">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[#1b1c1f] w-full">
                        <p className="font-['Pretendard',sans-serif] leading-[1.3] text-[24px] md:text-[40px]">Beyond Solutions, We Transform Brands</p>
                        <div className="font-['Pretendard',sans-serif] font-extrabold leading-[1.2] text-[32px] md:text-[64px] text-nowrap">
                            <p className="mb-0">광고를 넘어,</p>
                            <p>브랜드를 설계합니다</p>
                        </div>
                    </div>
                    <div className="font-['Pretendard',sans-serif] leading-[1.5] text-[#303235] text-[16px] md:text-[20px] text-nowrap">
                        <p className="mb-0">브랜드의 현재를 정확히 정의하는 것이 시작입니다.</p>
                        <p>정확한 진단으로 전략과 성과를 빈틈없이 설계합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DiagnosisSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Apply useSpring for smoother, more organic movement
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 30,
        mass: 1
    });

    const targetLeft = isMobile ? "50%" : "10%";
    const targetLeft3 = isMobile ? "50%" : "12%";

    // Significantly slower and more rhythmic transitions
    const x1 = useTransform(smoothProgress, [0, 0.4, 0.9], ["150%", targetLeft, targetLeft]);
    const y1 = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.9], ["0%", "-30%", "0%", "20%", "0%"]);
    const r1 = useTransform(smoothProgress, [0, 0.3, 0.6, 0.9], [0, 360, 340, 350]);
    const opacity1 = useTransform(smoothProgress, [0, 0.1], [0, 1]);

    const x2 = useTransform(smoothProgress, [0.15, 0.55, 0.9], ["150%", targetLeft, targetLeft]);
    const y2 = useTransform(smoothProgress, [0.15, 0.35, 0.55, 0.75, 0.9], ["0%", "30%", "0%", "-20%", "0%"]);
    const r2 = useTransform(smoothProgress, [0.15, 0.4, 0.7, 0.9], [0, 10, 35, 25]);
    const opacity2 = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);

    const x3 = useTransform(smoothProgress, [0.35, 0.75, 0.9], ["150%", targetLeft3, targetLeft3]);
    const y3 = useTransform(smoothProgress, [0.35, 0.55, 0.75, 0.85, 0.9], ["0%", "-25%", "5%", "-10%", "5%"]);
    const r3 = useTransform(smoothProgress, [0.35, 0.6, 0.8, 0.9], [0, -10, 15, 5]);
    const opacity3 = useTransform(smoothProgress, [0.35, 0.45], [0, 1]);

    const x4 = useTransform(smoothProgress, [0.55, 0.9, 0.98], ["150%", targetLeft, targetLeft]);
    const y4 = useTransform(smoothProgress, [0.55, 0.75, 0.9, 0.95, 0.98], ["0%", "20%", "2%", "10%", "2%"]);
    const r4 = useTransform(smoothProgress, [0.55, 0.8, 0.95, 0.98], [0, 25, 10, 15]);
    const opacity4 = useTransform(smoothProgress, [0.55, 0.65], [0, 1]);

    const textOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
    const textY = useTransform(smoothProgress, [0.85, 0.95], [50, 0]);
    const textX = useTransform(smoothProgress, [0.85, 0.95], [50, 0]);

    return (
        <div ref={sectionRef} className="relative w-full h-[300vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                <img alt="Bg" className="absolute inset-0 object-cover size-full z-0" src={imgSection01} />
                <div className="absolute top-[10%] z-10 flex flex-col items-center text-center gap-4 w-full px-4">
                    <h2 className="font-['Pretendard',sans-serif] font-extrabold text-[28px] md:text-[88px] text-[#1B1C1F] uppercase leading-[1.3] md:leading-[1.1] text-center">No Diagnosis,<br />No Growth</h2>
                    <p className="font-['Pretendard',sans-serif] text-[18px] md:text-[20px] font-normal text-[#303235] leading-[1.5] text-center">성과가 나오지 않는 이유는 ‘광고효율’이 아닌<br />흔들리는 브랜드의 방향성 때문입니다.</p>
                </div>
                <div className="relative w-full max-w-[1440px] h-[600px] mt-48">
                    {[
                        { x: x1, y: y1, r: r1, o: opacity1, z: 10, g: <Group12 />, n: "01", t: "모호한 메시지", s: "Ambiguous Message" },
                        { x: x2, y: y2, r: r2, o: opacity2, z: 20, g: <Group11 />, n: "02", t: "불분명한 고객", s: "Undefined target audience" },
                        { x: x3, y: y3, r: r3, o: opacity3, z: 30, g: <Group2 />, n: "03", t: "약한 시장 포지션", s: "Weak market positioning" },
                        { x: x4, y: y4, r: r4, o: opacity4, z: 40, g: <Group1 />, n: "04", t: "비일관적 가치전달", s: "Inconsistent value messaging" }
                    ].map((c, i) => (
                        <motion.div
                            key={i}
                            style={{
                                left: c.x,
                                top: c.y,
                                rotate: c.r,
                                opacity: c.o,
                                zIndex: c.z,
                                x: isMobile ? "-50%" : "0%"
                            }}
                            className="absolute top-[35%] md:top-[15%] origin-center"
                        >
                            <Card num={c.n} title={c.t} subtitle={c.s} graphic={c.g} />
                        </motion.div>
                    ))}
                    <motion.div
                        style={{
                            opacity: textOpacity,
                            y: isMobile ? textY : 0,
                            x: isMobile ? 0 : textX
                        }}
                        className="absolute inset-x-0 bottom-[10%] text-center md:inset-auto md:right-[10%] md:bottom-[15%] md:text-left z-50 px-4 md:px-0"
                    >
                        <p className="font-['Pretendard',sans-serif] text-[18px] md:text-[20px] font-normal text-[#151515] leading-[1.5]">이 모든 것들이 성장의 한계를 만듭니다.<br />Must-Engage는 브랜드 문제 먼저 정의합니다.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function ImcSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const items = [
        { title: "Mass Media", content: ["TVC", "Radio", "신문잡지", "극장 광고"] },
        { title: "OOH", content: ["빌보드", "지하철 버스", "디지털 사이니지", "랜드마크 옥외광고"] },
        { title: "Own IP", content: ["Youtube 전문 제작팀", "PPL"] },
        { title: "Digital & Viral Contents", content: ["카페, 커뮤니티 바이럴", "SA / DA 운영", "데이터 기반 매체 최적화", "ROAS 극대화", "전환 중심의 퍼포먼스 마케팅"] },
        { title: "Viral & performance", content: ["카페, 커뮤니티 바이럴", "SA / DA 운영", "데이터 기반 매체 최적화", "ROAS 극대화", "전환 중심의 퍼포먼스 마케팅"] }
    ];

    return (
        <div className="w-full py-20 md:py-24 px-4 flex flex-col items-center min-h-[800px] relative">
            <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[380px] h-[416px] pointer-events-none opacity-20"><img src={imgGroup611} alt="" className="size-full object-cover" /></div>
            <div className="text-center max-w-[1440px] w-full z-10 mb-10 flex flex-col gap-4">
                <h2 className="font-extrabold text-[28px] md:text-[64px] text-white uppercase leading-[1.3] md:leading-[1.2] text-center">Integrated Marketing<br />In Motion</h2>
                <p className="text-[18px] md:text-[20px] text-[#b4b9c5]">매스미디어, 자체 IP와 라이브커머스까지.<br />매출로 직결되는 IMC 전략을 완성합니다.</p>
            </div>
            <div className="md:hidden w-full flex flex-col gap-4 z-10">
                <div className="text-center font-extrabold text-[24px] text-white mb-4">Total IMC Solution</div>
                {items.map((item, i) => (
                    <div key={i} className="bg-[rgba(255,255,255,0.08)] rounded-[16px] w-full overflow-hidden border border-[rgba(255,255,255,0.12)]">
                        <div className="flex items-center justify-between p-[20px] cursor-pointer" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                            <span className="font-semibold text-[18px] text-white">{item.title}</span>
                            {openIdx === i ? <ChevronUp className="text-white opacity-30" /> : <ChevronDown className="text-white opacity-30" />}
                        </div>
                        <AnimatePresence>
                            {openIdx === i && (
                                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-[20px] pb-[20px]">
                                    {item.content?.map((text, j) => <div key={j} className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /><p className="font-['Pretendard'] text-[16px] font-normal leading-[150%] text-white">{text}</p></div>)}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
            <div className="hidden md:flex justify-center items-center w-full mb-14">
                <div className="relative w-[1200px] h-[800px] scale-[0.6] lg:scale-[0.8] xl:scale-100 origin-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src={imgGroup611} alt="IMC" className="w-[1000px] h-full object-contain" />
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col justify-center items-center gap-[8px]" style={{ width: "169.778px", height: "154.667px" }}>
                        <div className="font-extrabold text-[44px] text-white text-center leading-[1.1]">Total<br />IMC<br />Solution</div>
                    </div>
                    {[
                        { l: '120px', t: '110px', text: "Mass Media", align: "right", dot: "right" },
                        { l: '20px', t: '310px', text: "OOH", align: "right", dot: "right" },
                        { l: '110px', t: '610px', text: "Own IP", align: "right", dot: "right" },
                        { l: '890px', t: '170px', text: "Digital &\nViral Contents", align: "left", dot: "left" },
                        { l: '890px', t: '510px', text: "Viral &\nperformance", align: "left", dot: "left" }
                    ].map((p, i) => (
                        <div key={i} className="absolute flex gap-[12px] items-center" style={{ left: p.l, top: p.t }}>
                            {p.dot === "right" && <div className={`w-[230px] text-${p.align} font-semibold text-[24px] text-white`}>{p.text}</div>}
                            <div className="size-[40px] flex items-center justify-center relative">
                                <div className="size-[20px] bg-[#3155F6] rounded-full shadow-[0_0_20px_rgba(49,85,246,0.8)]" />
                                <div className="absolute inset-0 bg-[#3155F6] rounded-full opacity-20 animate-ping" />
                            </div>
                            {p.dot === "left" && <div className={`w-[230px] text-${p.align} font-semibold text-[24px] text-white whitespace-pre-line`}>{p.text}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ResultsAccordion({ project }: { project: any }) {
    const [openItem, setOpenItem] = useState<string | null>("CTR");

    const items = [
        { label: "CTR", value: project.ctr },
        { label: "ROAS", value: project.roas },
        { label: "ROI", value: project.roi },
        { label: "CVR", value: project.cvr },
    ];

    return (
        <div className="w-full flex flex-col border-t border-white/20 mt-4 md:mt-0">
            {items.map((item) => (
                <div key={item.label} className="border-b border-white/20">
                    <button
                        onClick={() => setOpenItem(openItem === item.label ? null : item.label)}
                        className="w-full flex justify-between items-center py-4 focus:outline-none"
                    >
                        <div className="flex items-baseline gap-2">
                            <span className="text-[18px] font-normal text-white">{item.label}</span>
                            <span className="text-[18px] font-extrabold text-white">{item.value}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-[#b4b9c5] transition-transform duration-300 ${openItem === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {openItem === item.label && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="pb-4 text-[14px] text-[#b4b9c5] leading-[1.5] font-normal">
                                    이 성과를 낼 수 있었던 전략 및 방법을 써주세요. Text Text Text Text Text Text Text Text
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

function ResultsSection() {
    const [linearIndex, setLinearIndex] = useState(PROJECTS.length * 100);
    const nextProject = useCallback(() => setLinearIndex(prev => prev + 1), []);
    const prevProject = useCallback(() => setLinearIndex(prev => prev - 1), []);
    const currentProjectIndex = ((linearIndex % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    const currentProject = PROJECTS[currentProjectIndex];

    return (
        <div className="w-full pt-0 pb-[240px] flex flex-col items-center gap-8 md:gap-16 overflow-hidden text-white">
            <div className="text-center px-4 flex flex-col gap-4">
                <h2 className="font-extrabold text-[28px] md:text-[64px] text-white uppercase leading-[1.3] md:leading-[1.2] text-center"><p className="mb-0">Changes MADE,</p><p>Results PROVEN</p></h2>
                <div className="flex flex-col gap-1 text-[#b4b9c5] text-[18px] md:text-[20px] font-normal">
                    <span>정확한 방향 설정은 성공을 만듭니다.</span>
                    <span>이 프로젝트들이 가장 명확한 증거입니다.</span>
                </div>
            </div>

            <div className="relative w-full max-w-[1440px] h-[400px] md:h-[480px] mt-4 md:mt-0 flex items-center justify-center perspective-[1000px] z-20">
                <ThreeDSlider items={PROJECTS} activeIndex={linearIndex} />
                <div className="absolute inset-x-4 md:inset-x-10 top-1/2 -translate-y-1/2 flex justify-between z-[200] pointer-events-none">
                    <button onClick={prevProject} className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-white hover:text-black transition-all shadow-2xl"><ChevronLeft className="size-5" /></button>
                    <button onClick={nextProject} className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-white hover:text-black transition-all shadow-2xl"><ChevronRight className="size-5" /></button>
                </div>
            </div>

            <div className="w-full max-w-[1080px] px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6 md:mt-12">
                <div className="lg:col-span-4 space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-[18px] md:text-[32px] font-extrabold text-[#FFF] leading-[1.5]">성과요약</h3>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.p key={currentProject.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[#B4B9C5] text-[16px] leading-[1.5] font-normal">{currentProject.description}</motion.p>
                    </AnimatePresence>
                </div>
                <div className="lg:col-span-8">
                    {/* Desktop View */}
                    <div className="hidden md:grid grid-cols-2 gap-x-16 gap-y-10">
                        <MetricItem label="CTR" value={currentProject.ctr} />
                        <MetricItem label="ROAS" value={currentProject.roas} />
                        <MetricItem label="ROI" value={currentProject.roi} />
                        <MetricItem label="CVR" value={currentProject.cvr} />
                    </div>
                    {/* Mobile View */}
                    <div className="md:hidden">
                        <ResultsAccordion project={currentProject} />
                    </div>
                </div>
            </div>

            <button className="bg-white/5 flex gap-[32px] items-center pl-5 pr-2 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black group transition-all">
                <span className="font-semibold">성과 만들러가기</span>
                <div className="bg-white rounded-full p-1 size-8 text-black group-hover:bg-white transition-colors flex items-center justify-center"><ArrowNarrowRight color="#1B1C1F" /></div>
            </button>
        </div>
    );
}

const MetricItem = ({ label, value }: { label: string, value: string }) => (
    <div className="space-y-3 hidden md:block">
        <div className="flex items-baseline gap-4">
            <span className="text-[32px] font-normal text-[#FFF] leading-[1.5]">{label}</span>
            <AnimatePresence mode="wait">
                <motion.span key={value} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-[32px] font-extrabold text-[#FFF] leading-[1.5]">{value}</motion.span>
            </AnimatePresence>
        </div>
        <p className="text-[16px] text-[#B4B9C5] font-normal leading-[1.5]">이 성과를 낼 수 있었던 전략 및 방법을 써주세요.<br />Text Text Text Text Text Text Text Text</p>
    </div>
);

function ContactSection() {
    const options = { industry: ["뷰티 & 코스메틱", "패션 & 잡화", "식품 & F&B", "라이프스타일 & 리빙", "IT & 플랫폼", "교육 & 육아", "병원 & 전문직"], cat: ["마케팅", "브랜딩", "컨설팅"] };
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
                        <CustomSelect label="Industry" options={options.industry} placeholder="뷰티 & 코스메틱" zIndex={30} />
                        <CustomSelect label="Category" options={options.cat} placeholder="마케팅" zIndex={20} />
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2 grow h-full">
                            <label className="font-semibold text-[16px] md:text-[18px] text-[#1b1c1f]">Message</label>
                            <textarea className="w-full h-full min-h-[124px] rounded-[8px] bg-white border border-transparent p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#1b1c1f]/20" />
                        </div>
                        <button className="w-full bg-[rgba(255,255,255,0.3)] flex justify-between items-center pl-6 pr-2 py-2 rounded-full border border-[rgba(255,255,255,0.9)] shadow-sm hover:bg-[#1b1c1f] group mt-auto transition-all">
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
    const darkSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);

            if (darkSectionRef.current) {
                const rect = darkSectionRef.current.getBoundingClientRect();
                // 헤더 높이(약 80px)를 고려하여 섹션이 헤더 영역에 들어왔는지 확인
                const headerHeight = 80;
                // 섹션의 상단이 헤더 아래에 있고, 섹션의 하단이 헤더 위로 지나가지 않았을 때
                const isOverDarkSection = rect.top <= headerHeight && rect.bottom >= headerHeight;
                setIsDarkHeader(isOverDarkSection);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // 초기 로드 시 체크
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full bg-[#f2f5fc] min-h-screen font-['Pretendard',sans-serif]">
            <Header isDark={isDarkHeader} isScrolled={isScrolled} />
            <Hero />
            <DiagnosisSection />
            {/* Combined Background for Sections 3-5 */}
            <div ref={darkSectionRef} className="w-full relative" style={{ backgroundImage: `url(${blackBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    {/* Renovation Section */}
    <div className="w-full pt-[120px] pb-20 px-4 flex flex-col items-center gap-16 overflow-hidden">
        <div className="text-center max-w-[1440px] w-full items-center flex flex-col gap-4">
            <h2 className="font-extrabold text-[28px] md:text-[64px] text-white uppercase leading-[1.3] md:leading-[1.2] text-center"><p className="mb-0">Right Diagnosis,</p><p>REAL GROWTH</p></h2>
            <p className="text-[18px] md:text-[20px] text-[#b4b9c5]">트랜스포메이션 전략 기반의 통합 마케팅 실행으로<br />브랜드 가치를 성과로 증명합니다.</p>
        </div>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full max-w-[1440px]">
                        {[{ t: "Brand Diagnosis", d: "현재 브랜드 인식, 고객 지각, 메시지 구조를 분석해 문제의 ‘근본 원인’을 찾습니다.", i: imgKnot3, s: "md:pt-32" },
                        { t: <>Renovation&<br />Repositioning</>, d: "브랜드의 방향성과 가치를 재정의하고 새로운 포지션을 설계합니다.", i: imgRoundTube },
                        { t: "IMC Strategy Design", d: "브랜드 메시지를 중심으로 크리에이티브·퍼포먼스·바이럴을 통합한 IMC 전략을 디자인합니다.", i: img01271, r: "rotate-[345deg]", s: "md:pt-32" },
                        { t: <>Creative &<br />Performance</>, d: "전략과 메시지를 기반으로 한 콘텐츠 제작과 지속 가능한 퍼포먼스로 성장을 완성합니다.", i: img00441 }
                        ].map((c, i) => (
                            <div key={i} className={c.s}>
                                <div className="bg-[rgba(255,255,255,0.08)] relative rounded-[24px] w-full md:w-[328px] h-[320px] md:h-[500px] overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-[rgba(255,255,255,0.12)]">
                                    <div className="absolute inset-0 border border-[rgba(255,255,255,0.12)] rounded-[24px] pointer-events-none group-hover:border-[rgba(255,255,255,0.3)] transition-colors duration-300" />
                                    <div className="flex flex-col items-end p-[24px] md:p-[32px] h-full justify-between">
                                        <div className="flex flex-col gap-[16px] items-start w-full text-white">
                                            <div className="font-['Pretendard',sans-serif] font-semibold text-[32px] leading-[1.3] text-white min-h-[64px] md:min-h-[84px]">{c.t}</div>
                                            <p className="font-['Pretendard',sans-serif] font-normal text-[18px] leading-[1.5] text-white">{c.d}</p>
                                        </div>
                                        <div className="size-[80px] md:size-[124px] relative transition-transform duration-500 group-hover:scale-110"><img alt="" className={`size-full object-contain opacity-90 ${c.r}`} src={c.i} /></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ImcSection />

                {/* Results Section */}
                <ResultsSection />
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

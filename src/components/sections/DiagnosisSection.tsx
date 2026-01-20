import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import imgSection01 from "../../assets/54e2d4b76998542d0da597f7bda04a72cbad0dc8.png";
import { svgPaths } from "../../app/utils/svgPaths";

// --- Sub-graphics for Diagnosis ---
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

interface DiagnosisSectionProps {
    data?: {
        titleLine1: string;
        titleLine2: string;
        descriptionLine1: string;
        descriptionLine2: string;
        cards: Array<{ num: string, title: string, subtitle: string }>;
        bottomTextLine1: string;
        bottomTextLine2: string;
    }
}

export function DiagnosisSection({ data }: DiagnosisSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 30,
        mass: 1
    });

    const targetLeft = isMobile ? "50%" : "10%";
    const targetLeft3 = isMobile ? "50%" : "12%";

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

    const content = data || {
        titleLine1: "No Diagnosis,",
        titleLine2: "No Growth",
        descriptionLine1: "성과가 나오지 않는 이유는 ‘광고효율’이 아닌",
        descriptionLine2: "흔들리는 브랜드의 방향성 때문입니다.",
        cards: [
            { num: "01", title: "모호한 메시지", subtitle: "Ambiguous Message" },
            { num: "02", title: "불분명한 고객", subtitle: "Undefined target audience" },
            { num: "03", title: "약한 시장 포지션", subtitle: "Weak market positioning" },
            { num: "04", title: "비일관적 가치전달", subtitle: "Inconsistent value messaging" }
        ],
        bottomTextLine1: "이 모든 것들이 성장의 한계를 만듭니다.",
        bottomTextLine2: "Must-Engage는 브랜드 문제 먼저 정의합니다."
    };

    const graphics = [<Group12 />, <Group11 />, <Group2 />, <Group1 />];

    return (
        <div ref={sectionRef} className="relative w-full h-[300vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                <img alt="Bg" className="absolute inset-0 object-cover size-full z-0" src={imgSection01} />
                <div className="absolute top-[10%] z-10 flex flex-col items-center text-center gap-4 w-full px-4">
                    <h2 className="font-['Pretendard',sans-serif] font-extrabold text-[28px] md:text-[88px] text-[#1B1C1F] uppercase leading-[1.3] md:leading-[1.1] text-center">{content.titleLine1}<br />{content.titleLine2}</h2>
                    <p className="font-['Pretendard',sans-serif] text-[18px] md:text-[20px] font-normal text-[#303235] leading-[1.5] text-center">{content.descriptionLine1}<br />{content.descriptionLine2}</p>
                </div>
                <div className="relative w-full max-w-[1440px] h-[600px] mt-48">
                    {content.cards.map((c, i) => {
                        const motionProps = [
                            { x: x1, y: y1, r: r1, o: opacity1, z: 10 },
                            { x: x2, y: y2, r: r2, o: opacity2, z: 20 },
                            { x: x3, y: y3, r: r3, o: opacity3, z: 30 },
                            { x: x4, y: y4, r: r4, o: opacity4, z: 40 }
                        ][i];
                        return (
                            <motion.div
                                key={i}
                                style={{
                                    left: motionProps.x,
                                    top: motionProps.y,
                                    rotate: motionProps.r,
                                    opacity: motionProps.o,
                                    zIndex: motionProps.z,
                                    x: isMobile ? "-50%" : "0%"
                                }}
                                className="absolute top-[35%] md:top-[15%] origin-center"
                            >
                                <Card num={c.num} title={c.title} subtitle={c.subtitle} graphic={graphics[i]} />
                            </motion.div>
                        );
                    })}
                    <motion.div
                        style={{
                            opacity: textOpacity,
                            y: isMobile ? textY : 0,
                            x: isMobile ? 0 : textX
                        }}
                        className="absolute inset-x-0 bottom-[10%] text-center md:inset-auto md:right-[10%] md:bottom-[15%] md:text-left z-50 px-4 md:px-0"
                    >
                        <p className="font-['Pretendard',sans-serif] text-[18px] md:text-[20px] font-normal text-[#151515] leading-[1.5]">{content.bottomTextLine1}<br />{content.bottomTextLine2}</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

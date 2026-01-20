import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import imgGroup611 from "../../assets/148785fed14711aa7266811c96469ce4bea328e0.png";

interface ImcItem {
    title: string;
    content: string[];
}

interface ImcSectionProps {
    data?: {
        titleLine1: string;
        titleLine2: string;
        descriptionLine1: string;
        descriptionLine2: string;
        items: ImcItem[];
    }
}

export function ImcSection({ data }: ImcSectionProps) {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    
    const content = data || {
        titleLine1: "Integrated Marketing",
        titleLine2: "In Motion",
        descriptionLine1: "매스미디어, 자체 IP와 라이브커머스까지.",
        descriptionLine2: "매출로 직결되는 IMC 전략을 완성합니다.",
        items: [
            { title: "Mass Media", content: ["TVC", "Radio", "신문잡지", "극장 광고"] },
            { title: "OOH", content: ["빌보드", "지하철 버스", "디지털 사이니지", "랜드마크 옥외광고"] },
            { title: "Own IP", content: ["Youtube 전문 제작팀", "PPL"] },
            { title: "Digital & Viral Contents", content: ["카페, 커뮤니티 바이럴", "SA / DA 운영", "데이터 기반 매체 최적화", "ROAS 극대화", "전환 중심의 퍼포먼스 마케팅"] },
            { title: "Viral & performance", content: ["카페, 커뮤니티 바이럴", "SA / DA 운영", "데이터 기반 매체 최적화", "ROAS 극대화", "전환 중심의 퍼포먼스 마케팅"] }
        ]
    };

    return (
        <div className="w-full py-20 md:py-24 px-4 flex flex-col items-center min-h-[800px] relative">
            <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[380px] h-[416px] pointer-events-none opacity-20">
                <img src={imgGroup611} alt="" className="size-full object-cover" />
            </div>
            <div className="text-center max-w-[1440px] w-full z-10 mb-10 flex flex-col gap-4">
                <h2 className="font-extrabold text-[28px] md:text-[64px] text-white uppercase leading-[1.3] md:leading-[1.2] text-center">
                    {content.titleLine1}<br />{content.titleLine2}
                </h2>
                <p className="text-[18px] md:text-[20px] text-[#b4b9c5]">
                    {content.descriptionLine1}<br />{content.descriptionLine2}
                </p>
            </div>
            
            {/* Mobile View */}
            <div className="md:hidden w-full flex flex-col gap-4 z-10">
                <div className="text-center font-extrabold text-[24px] text-white mb-4">Total IMC Solution</div>
                {content.items.map((item, i) => (
                    <div key={i} className="bg-[rgba(255,255,255,0.08)] rounded-[16px] w-full overflow-hidden border border-[rgba(255,255,255,0.12)]">
                        <div className="flex items-center justify-between p-[20px] cursor-pointer" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                            <span className="font-semibold text-[18px] text-white">{item.title}</span>
                            {openIdx === i ? <ChevronUp className="text-white opacity-30" /> : <ChevronDown className="text-white opacity-30" />}
                        </div>
                        <AnimatePresence>
                            {openIdx === i && (
                                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-[20px] pb-[20px]">
                                    {item.content?.map((text, j) => (
                                        <div key={j} className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                            <p className="font-['Pretendard'] text-[16px] font-normal leading-[150%] text-white">{text}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex justify-center items-center w-full mb-14">
                <div className="relative w-[1200px] h-[800px] scale-[0.6] lg:scale-[0.8] xl:scale-100 origin-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src={imgGroup611} alt="IMC" className="w-[1000px] h-full object-contain" />
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col justify-center items-center gap-[8px]" style={{ width: "169.778px", height: "154.667px" }}>
                        <div className="font-extrabold text-[44px] text-white text-center leading-[1.1]">Total<br />IMC<br />Solution</div>
                    </div>
                    {[
                        { l: '120px', t: '110px', text: content.items[0]?.title, align: "right", dot: "right" },
                        { l: '20px', t: '310px', text: content.items[1]?.title, align: "right", dot: "right" },
                        { l: '110px', t: '610px', text: content.items[2]?.title, align: "right", dot: "right" },
                        { l: '890px', t: '170px', text: content.items[3]?.title.replace("& ", "&\n"), align: "left", dot: "left" },
                        { l: '890px', t: '510px', text: content.items[4]?.title.replace("& ", "&\n"), align: "left", dot: "left" }
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

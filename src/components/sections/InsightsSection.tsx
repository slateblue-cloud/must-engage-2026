import React from "react";
import { ArrowNarrowRight } from "../ui/Icons";

interface InsightItem {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface InsightsSectionProps {
    data?: InsightItem[];
}

export function InsightsSection({ data }: InsightsSectionProps) {
    const defaultData: InsightItem[] = [
        { id: "01", title: "여기는 제목을 입력하는 칸입니다.", description: "여기는 설명 문구가 들어가는 자리입니다.", image: "https://images.unsplash.com/photo-1613759612065-d5971d32ca49?fit=crop&w=800" },
        { id: "02", title: "여기는 제목을 입력하는 칸입니다.", description: "여기는 설명 문구가 들어가는 자리입니다.", image: "https://images.unsplash.com/photo-1742440710226-450e3b85c100?fit=crop&w=800" },
        { id: "03", title: "여기는 제목을 입력하는 칸입니다.", description: "여기는 설명 문구가 들어가는 자리입니다.", image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?fit=crop&w=800" }
    ];

    const items = data && data.length > 0 ? data : defaultData;

    return (
        <div className="w-full bg-[#f2f5fc] pt-[120px] pb-20 px-4 flex flex-col items-center gap-16">
            <div className="text-center flex flex-col gap-4">
                <h2 className="font-['Pretendard',sans-serif] font-extrabold text-[28px] md:text-[64px] text-[#1b1c1f] uppercase leading-[1.3] md:leading-[1.2]">
                    <p className="mb-0">READ THE MARKET,</p>
                    <p>LEAD THE BRAND</p>
                </h2>
                <p className="font-['Pretendard',sans-serif] text-[18px] md:text-[20px] text-[#303235] font-normal leading-[1.5]">
                    브랜드 리노베이션, 메시지 아키텍처, IMC 전략 등<br />Must-Engage만의 관점과 연구를 공유합니다.
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-16 md:gap-4 w-full max-w-[1440px]">
                {items.map((item, index) => (
                    <div key={item.id || index} className="flex-1 flex flex-col gap-4">
                        <span className="font-['Pretendard',sans-serif] font-extrabold text-[40px] text-[#d0d4e0] leading-[1]">
                            {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="flex flex-col gap-2">
                            <h4 className="font-['Pretendard',sans-serif] font-semibold text-[24px] text-[#1b1c1f] leading-[1.5]">
                                {item.title}
                            </h4>
                            <p className="font-['Pretendard',sans-serif] font-normal text-[16px] text-[#303235] leading-[1.5]">
                                {item.description}
                            </p>
                        </div>
                        <div className="relative aspect-[400/500] rounded-[24px] overflow-hidden group cursor-pointer">
                            <img src={item.image} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#1B1C1F]/0 to-[#1B1C1F]" />
                            <div className="absolute inset-x-0 bottom-8 flex justify-center">
                                <div className="bg-white/10 backdrop-blur pl-5 pr-2 py-2 rounded-full flex items-center gap-8 hover:bg-white group transition-all text-white hover:text-black border border-[rgba(255,255,255,0.12)] shadow-sm">
                                    <span className="font-semibold">자세히보기</span>
                                    <div className="bg-white rounded-full p-1 size-8 text-black group-hover:bg-white transition-colors flex items-center justify-center">
                                        <ArrowNarrowRight color="#1B1C1F" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

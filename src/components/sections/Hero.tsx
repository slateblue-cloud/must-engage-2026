import React from "react";
import imgHero from "../../assets/hero01.png";

interface HeroProps {
    data?: {
        subTitle: string;
        titleLine1: string;
        titleLine2: string;
        descriptionLine1: string;
        descriptionLine2: string;
    };
}

export function Hero({ data }: HeroProps) {
    const content = data || {
        subTitle: "Beyond Solutions, We Transform Brands",
        titleLine1: "광고를 넘어,",
        titleLine2: "브랜드를 설계합니다",
        descriptionLine1: "브랜드의 현재를 정확히 정의하는 것이 시작입니다.",
        descriptionLine2: "정확한 진단으로 전략과 성과를 빈틈없이 설계합니다.",
    };

    return (
        <div className="flex flex-col items-center relative w-full h-screen min-h-[600px]">
            <img alt="Hero Background" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgHero} />
            <div className="basis-0 grow w-full max-w-[1440px] flex flex-col px-4 md:px-[40px] relative shrink-0 z-10 pointer-events-none">
                <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 w-full pointer-events-auto">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[#1b1c1f] w-full">
                        <p className="font-['Pretendard',sans-serif] leading-[1.3] text-[24px] md:text-[40px]">{content.subTitle}</p>
                        <div className="font-['Pretendard',sans-serif] font-extrabold leading-[1.1] text-[32px] md:text-[88px] text-nowrap">
                            <p className="mb-0">{content.titleLine1}</p>
                            <p>{content.titleLine2}</p>
                        </div>
                    </div>
                    <div className="font-['Pretendard',sans-serif] leading-[1.5] text-[#303235] text-[16px] md:text-[20px] text-nowrap">
                        <p className="mb-0">{content.descriptionLine1}</p>
                        <p>{content.descriptionLine2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

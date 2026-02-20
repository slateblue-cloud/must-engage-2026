import React from "react";
import imgKnot3 from "../../assets/2680822d0835c3f69e72c78587f9dd56dcc0393e.png";
import imgRoundTube from "../../assets/5844140db5e4a7f98eff3af5978375a285be96b5.png";
import img01271 from "../../assets/f5c0bcb78df559249d013f7bdfc12ca5567c8337.png";
import img00441 from "../../assets/c4d16f4050279074afa83dd2ab9bd61c2e4d5184.png";

// <br /> 태그 문자열을 실제 리액트 요소로 변환하는 함수
const formatTitle = (title: string) => {
    if (!title) return "";
    return title.split("<br />").map((text, i, arr) => (
        <React.Fragment key={i}>
            {text}
            {i < arr.length - 1 && <br />}
        </React.Fragment>
    ));
};

interface RenovationCardData {
    title: React.ReactNode;
    description: string;
    image: string;
    rotate?: string;
    spacing?: string;
}

interface RenovationSectionProps {
    data?: any; // Directus raw data or formatted data
}

export function RenovationSection({ data }: RenovationSectionProps) {
    // Directus 데이터 구조를 기존 컴포넌트 구조로 매핑
    const formattedCards = data ? [
        { title: formatTitle(data.card1_title), description: data.card1_description, image: imgKnot3, spacing: "md:pt-32" },
        { title: formatTitle(data.card2_title), description: data.card2_description, image: imgRoundTube },
        { title: formatTitle(data.card3_title), description: data.card3_description, image: img01271, rotate: "rotate-[345deg]", spacing: "md:pt-32" },
        { title: formatTitle(data.card4_title), description: data.card4_description, image: img00441 }
    ] : null;

    const content = {
        titleLine1: data?.titleLine1 || "Right Diagnosis,",
        titleLine2: data?.titleLine2 || "REAL GROWTH",
        description: data?.description || "트랜스포메이션 전략 기반의 통합 마케팅 실행으로 브랜드 가치를 성과로 증명합니다.",
        cards: formattedCards || [
            { title: "Brand Diagnosis", description: "현재 브랜드 인식, 고객 지각, 메시지 구조를 분석해 문제의 ‘근본 원인’을 찾습니다.", image: imgKnot3, spacing: "md:pt-32" },
            { title: <>Renovation&<br />Repositioning</>, description: "브랜드의 방향성과 가치를 재정의하고 새로운 포지션을 설계합니다.", image: imgRoundTube },
            { title: "IMC Strategy Design", description: "브랜드 메시지를 중심으로 크리에이티브·퍼포먼스·바이럴을 통합한 IMC 전략을 디자인합니다.", image: img01271, rotate: "rotate-[345deg]", spacing: "md:pt-32" },
            { title: <>Creative &<br />Performance</>, description: "전략과 메시지를 기반으로 한 콘텐츠 제작과 지속 가능한 퍼포먼스로 성장을 완성합니다.", image: img00441 }
        ]
    };

    return (
        <div className="w-full pt-[120px] md:pt-[240px] pb-0 px-4 flex flex-col items-center gap-16 overflow-hidden">
            <div className="text-center max-w-[1440px] w-full items-center flex flex-col gap-4">
                <h2 className="font-extrabold text-[28px] md:text-[64px] text-white uppercase leading-[1.3] md:leading-[1.2] text-center">
                    <p className="mb-0">{content.titleLine1}</p>
                    <p>{content.titleLine2}</p>
                </h2>
                <p className="text-[18px] md:text-[20px] text-[#b4b9c5]">{content.description}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full max-w-[1440px]">
                {content.cards.map((c, i) => (
                    <div key={i} className={c.spacing}>
                        <div className="bg-[rgba(255,255,255,0.08)] relative rounded-[24px] w-full md:w-[328px] h-auto md:h-[500px] overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-[rgba(255,255,255,0.12)]">
                            <div className="absolute inset-0 border border-[rgba(255,255,255,0.12)] rounded-[24px] pointer-events-none group-hover:border-[rgba(255,255,255,0.3)] transition-colors duration-300" />
                            <div className="flex flex-col items-end p-[24px] md:p-[32px] h-full justify-between">
                                <div className="flex flex-col gap-4 items-start w-full text-white">
                                    <div className="font-['Pretendard',sans-serif] font-semibold text-[24px] md:text-[32px] leading-[1.3] text-white md:min-h-[84px]">{c.title}</div>
                                    <p className="font-['Pretendard',sans-serif] font-normal text-[16px] md:text-[18px] leading-[1.5] text-white">{c.description}</p>
                                </div>
                                <div className="size-[80px] md:size-[124px] relative transition-transform duration-500 group-hover:scale-110">
                                    <img alt="" className={`size-full object-contain opacity-90 ${c.rotate || ""}`} src={c.image} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React, { useRef } from "react";
import glassBlocks from "figma:asset/ed98c9a64222070222ee1ca41114f3a83b355912.png";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface ImcItem {
  id: number;
  title: string;
  content: string[];
}

const IMC_DATA: ImcItem[] = [
  {
    id: 0,
    title: "Mass Media",
    content: ["TVC", "Radio", "신문잡지", "극장 광고"],
  },
  {
    id: 1,
    title: "OOH",
    content: ["빌보드", "지하철 버스", "디지털 사이니지", "랜드마크 옥외광고"],
  },
  {
    id: 2,
    title: "Own IP",
    content: ["자체 IP 콘텐츠 기획", "Youtube 전문 제작팀", "PPL"],
  },
  {
    id: 3,
    title: "Digital & Viral Contents",
    content: ["유튜브 SNS 캠패인", "인플루언서 마케팅", "바이럴 영상 기획 및 배포"],
  },
  {
    id: 4,
    title: "Viral & performance",
    content: ["카페, 커뮤니티 바이럴", "SA/DA 운영", "데이터 기반 매체 최적화", "ROAS 극대화", "전환 중심의 퍼포먼스 마케팅"],
  },
];

export function ImcSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Use spring for smooth animation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-[#1b1c1f]">
      {/* Sticky Full-screen Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center overflow-hidden py-16 md:py-20">
        
        {/* Fixed Header Content (Center Aligned) */}
        <div className="relative z-30 flex flex-col items-center text-center px-6">
          <h2 className="font-['Pretendard',sans-serif] font-extrabold text-[28px] md:text-[64px] text-white uppercase leading-[1.1] tracking-tight">
            Integrated Marketing<br />In Motion
          </h2>
          <p className="font-['Pretendard',sans-serif] text-[14px] md:text-[18px] text-[#b4b9c5] mt-4 mb-10 max-w-[800px]">
            매스미디어, 자체 IP와 라이브커머스까지. 매출로 직결되는 IMC 전략을 완성합니다.
          </p>
          
          <h3 className="font-['Pretendard',sans-serif] font-bold text-[24px] md:text-[40px] lg:text-[48px] text-white/90">
            Total IMC Solution
          </h3>
        </div>

        {/* Main Interaction Area: Image Left / Text Right */}
        <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-between mt-[-20px] relative">
          
          {/* Left Side: Visual Asset (Resized for balanced impact) */}
          <div className="relative w-full md:w-1/2 flex justify-start items-center h-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-[-10%] md:left-[-15%] w-[100%] md:w-[120%] aspect-square flex items-center justify-center pointer-events-none"
            >
              <ImageWithFallback 
                src={glassBlocks} 
                alt="3D Glass Blocks" 
                className="w-full h-full object-contain mix-blend-screen opacity-90 scale-90 md:scale-100" 
              />
            </motion.div>
          </div>

          {/* Right Side: Vertical Scrolling List */}
          <div className="relative w-full md:w-1/2 h-full flex items-center z-10 px-6 md:pr-20 lg:pr-40">
            <div className="relative w-full h-[450px] flex flex-col justify-center">
              {IMC_DATA.map((item, index) => {
                const step = 1 / IMC_DATA.length;
                const mid = (index + 0.5) * step;
                
                // Visibility Logic
                const opacity = useTransform(
                  smoothProgress,
                  [mid - step, mid - step * 0.4, mid, mid + step * 0.4, mid + step],
                  [0, 0.1, 1, 0.1, 0]
                );

                const color = useTransform(
                  smoothProgress,
                  [mid - step * 0.4, mid, mid + step * 0.4],
                  ["#8c8d91", "#4c6ef5", "#8c8d91"]
                );

                const translateY = useTransform(
                  smoothProgress,
                  [mid - step, mid, mid + step],
                  [200, 0, -200]
                );

                const scale = useTransform(
                  smoothProgress,
                  [mid - step * 0.4, mid, mid + step * 0.4],
                  [0.92, 1.05, 0.92]
                );

                return (
                  <motion.div
                    key={item.id}
                    style={{ 
                      opacity, 
                      y: translateY, 
                      scale,
                      pointerEvents: "none"
                    }}
                    className="absolute w-full flex flex-col gap-6"
                  >
                    <motion.h4 
                      style={{ color }}
                      className="font-['Pretendard',sans-serif] font-extrabold text-[32px] md:text-[52px] leading-tight"
                    >
                      {item.title}
                    </motion.h4>
                    
                    <ul className="flex flex-col gap-4">
                      {item.content.map((bullet, bIdx) => (
                        <li key={bIdx} className="font-['Pretendard',sans-serif] text-[18px] md:text-[24px] text-white/90 flex items-start gap-3 leading-relaxed">
                          <span className="opacity-40 mt-2.5 text-[14px] shrink-0">•</span>
                          <span className="break-keep">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

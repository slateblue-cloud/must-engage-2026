import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import sec03Img2 from "../../assets/sec03_img_2.png";

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

  return (
    <div ref={containerRef} className="relative w-full h-auto md:h-[300vh] pt-[120px] md:pt-[240px] pb-[120px]">
      {/* Sticky Full-screen Container (Desktop Only) */}
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex flex-col items-center md:overflow-hidden py-16 md:py-20">
        
        {/* Fixed Header Content (Center Aligned) */}
        <div className="relative z-30 flex flex-col items-center text-center px-6">
          <h2 className="font-['Pretendard',sans-serif] font-extrabold text-[28px] md:text-[64px] text-white uppercase leading-[1.1] tracking-tight">
            Integrated Marketing<br />In Motion
          </h2>
          <p className="font-['Pretendard',sans-serif] text-[18px] md:text-[20px] text-[#b4b9c5] mt-4 mb-10 max-w-[800px]">
            매스미디어, 자체 IP와 라이브커머스까지. 매출로 직결되는 IMC 전략을 완성합니다.
          </p>
        </div>

        {/* Main Interaction Area */}
        <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-between mt-[-20px] relative">
          
          {/* Desktop: Left Side Image */}
          <div className="hidden md:flex relative w-1/2 h-full justify-start items-center overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-[-20%] w-[120%] aspect-square flex items-center justify-center pointer-events-none"
            >
              <motion.img 
                src={sec03Img2} 
                alt="IMC Visual" 
                className="w-full h-full object-contain opacity-90 scale-[0.88]" 
                animate={{
                  y: [0, -30, 0]
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="relative w-full md:w-1/2 h-full flex flex-col justify-start md:justify-center z-10 px-6 md:pr-20 lg:pr-40 overflow-y-auto md:overflow-visible pt-10 md:pt-0">
            <h3 className="font-['Pretendard',sans-serif] font-semibold text-[24px] md:text-[40px] text-white/90 mb-8 md:mb-0 text-center md:text-left">
              Total IMC Solution
            </h3>
            
            {/* Desktop: Animated List */}
            <div className="hidden md:flex relative w-full h-[380px] flex-col justify-center mt-[-20px]">
              {IMC_DATA.map((item, index) => {
                const step = 1 / IMC_DATA.length;
                const mid = (index + 0.5) * step;
                
                const opacity = useTransform(
                  scrollYProgress,
                  [mid - step * 0.6, mid - step * 0.2, mid + step * 0.2, mid + step * 0.6],
                  [0, 1, 1, 0]
                );

                const translateY = useTransform(
                  scrollYProgress,
                  [mid - step * 0.6, mid - step * 0.2, mid + step * 0.2, mid + step * 0.6],
                  [80, 0, 0, -80]
                );

                return (
                  <motion.div
                    key={item.id}
                    style={{ opacity, y: translateY }}
                    className="absolute w-full flex flex-col gap-6 pointer-events-none"
                  >
                    <h4 className="font-['Pretendard',sans-serif] font-semibold text-[32px] md:text-[40px] text-[#4c6ef5] leading-tight">
                      {item.title}
                    </h4>
                    <ul className="flex flex-col gap-4">
                      {item.content.map((bullet, bIdx) => (
                        <li key={bIdx} className="font-['Pretendard',sans-serif] font-normal text-[18px] md:text-[20px] text-white/90 flex items-start gap-3 leading-[1.4]">
                          <span className="opacity-40 mt-2.5 text-[14px] shrink-0">•</span>
                          <span className="break-keep">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile: Standard Scrolling List & Bottom Image */}
            <div className="flex md:hidden flex-col gap-[64px] pb-10 items-center text-center">
              {IMC_DATA.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 items-center">
                  <h4 className="font-['Pretendard',sans-serif] font-semibold text-[24px] text-[#4c6ef5] leading-tight text-center">
                    {item.title}
                  </h4>
                  <ul className="flex flex-col gap-2 items-center">
                    {item.content.map((bullet, bIdx) => (
                      <li key={bIdx} className="font-['Pretendard',sans-serif] font-normal text-[16px] text-white/90 flex flex-col items-center gap-1 leading-[1.4] text-center">
                        <span className="break-keep">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Mobile Image at Bottom */}
              <motion.div 
                className="w-[300px] aspect-square mt-0"
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src={sec03Img2} 
                  alt="IMC Visual" 
                  className="w-full h-full object-contain opacity-100" 
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
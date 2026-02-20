import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ArrowNarrowRight } from "../ui/Icons";
import { ProjectItem } from "../../types/landing";
import { getAssetsUrl } from "../../lib/directus";

const SPRING_CONFIG = {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
};

function SliderCard({ item, index, activeIndex, onClick }: { item: ProjectItem; index: number; activeIndex: number; onClick: () => void }) {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    const getTransformValues = (off: number) => {
        const cardWidth = 280;
        const halfWidth = cardWidth / 2;
        const centerScale = 0.95;
        const sideGap = 16;
        const centerOverlap = -24;

        const direction = Math.sign(off);
        let x = 0;

        if (off !== 0) {
            const firstStep = (halfWidth * centerScale) + halfWidth + centerOverlap;
            const additionalSteps = (Math.abs(off) - 1) * (cardWidth + sideGap);
            x = direction * (firstStep + additionalSteps);
        }

        const radian = (off * 20 * Math.PI) / 180;
        const z = isCenter ? 150 : -400 + (1 - Math.cos(radian)) * 500;
        const rotateY = -off * 18;

        const scale = isCenter ? centerScale : 1.0;
        const brightness = isCenter ? 1.0 : Math.max(0.55, 0.75 - (absOffset - 1) * 0.1);
        const opacity = absOffset > 4.5 ? 0 : 1;

        return { x, z, rotateY, scale, opacity, brightness };
    };

    const { x, z, rotateY, scale, opacity, brightness } = getTransformValues(offset);
    const zIndex = 1000 - Math.floor(absOffset * 100);

    return (
        <motion.div
            className="absolute w-[280px] h-[380px] cursor-pointer"
            onClick={onClick}
            initial={false}
            animate={{ x, z, rotateY, scale, opacity }}
            transition={SPRING_CONFIG}
            style={{
                zIndex: zIndex,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                pointerEvents: isCenter ? 'auto' : 'none',
            }}
        >
            <motion.div
                className={`w-full h-full relative rounded-[16px] overflow-hidden bg-[#121212] ${isCenter
                    ? 'shadow-[0_0_120px_rgba(255,255,255,0.12)]'
                    : 'shadow-[0_20px_80px_rgba(0,0,0,0.6)]'
                    }`}
                animate={{
                    filter: `brightness(${brightness})`
                }}
                transition={SPRING_CONFIG}
            >
                <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover select-none pointer-events-none" 
                        style={{ 
                            imageRendering: "auto",
                            WebkitPrintColorAdjust: "exact",
                            transform: "translateZ(0)",
                            willChange: "transform"
                        }} 
                    />
                </div>
                {!isCenter && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
            </motion.div>
        </motion.div>
    );
}

function ThreeDSlider({ items, activeIndex, onCardClick }: { items: ProjectItem[]; activeIndex: number; onCardClick: (index: number) => void }) {
    const totalOriginal = items.length;
    const visibleRange = React.useMemo(() => {
        return Array.from({ length: 11 }, (_, i) => activeIndex - 5 + i);
    }, [activeIndex]);

    return (
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {visibleRange.map((i) => {
                const projectIndex = ((i % totalOriginal) + totalOriginal) % totalOriginal;
                const project = items[projectIndex];
                return <SliderCard key={`${project.id}-${i}`} item={project} index={i} activeIndex={activeIndex} onClick={() => onCardClick(i)} />;
            })}
        </div>
    );
}

function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
    // Prevent background scrolling when modal is open
    React.useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    const renderContent = (text?: string) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('-')) {
                return (
                    <div key={i} className="flex gap-2 items-start mt-1">
                        <span className="shrink-0 text-white/40">•</span>
                        <span className="break-keep">{trimmedLine.substring(1).trim()}</span>
                    </div>
                );
            }
            return <p key={i} className="mt-1 break-keep">{trimmedLine}</p>;
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-xl px-4 py-8"
            onClick={onClose}
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-[#0a0a0a] w-full max-w-[1080px] h-full max-h-[780px] rounded-[24px] border border-white/10 overflow-hidden shadow-2xl flex flex-col gap-10 p-8 md:p-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header: Title and Close button on same row */}
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-[32px] md:text-[40px] font-extrabold text-white leading-tight">
                        {project.title}
                    </h2>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                        <X className="size-8" />
                    </button>
                </div>

                {/* Modal Body: Left Text, Right Image. Aligned at top. */}
                <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-10 overflow-hidden">
                    <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
                        <div className="grid grid-cols-1 gap-8">
                            <div>
                                <h4 className="text-[16px] text-white/40 uppercase tracking-widest font-bold mb-1">대행영역</h4>
                                <p className="text-[16px] text-white leading-relaxed">{project.category}</p>
                            </div>
                            <div>
                                <h4 className="text-[16px] text-white/40 uppercase tracking-widest font-bold mb-1">성과요약</h4>
                                <p className="text-[16px] text-white leading-relaxed">{project.description}</p>
                            </div>
                            <div>
                                <h4 className="text-[16px] text-white/40 uppercase tracking-widest font-bold mb-1">PROJECT</h4>
                                <div className="text-[16px] text-white/80 leading-relaxed">
                                    {renderContent(project.project_detail || "자사몰 및 무신사 스토어의 활성화와 매출 증대")}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[16px] text-white/40 uppercase tracking-widest font-bold mb-1">PLAN</h4>
                                <div className="text-[16px] text-white/80 leading-relaxed">
                                    {renderContent(project.plan || "META Ads (자사몰 중심)\n무신사 협력광고\nA/B 테스트 기반의 광고 소재 최적화로 타겟 분석 및 개선")}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[16px] text-white/40 uppercase tracking-widest font-bold mb-1">RESULT</h4>
                                <div className="text-[16px] text-white/80 leading-relaxed">
                                    {renderContent(project.result || "META 자사몰 운영 ROAS 2,000% 달성, 무신사 협력광고 ROAS 3,000% 달성")}
                                </div>
                            </div>
                        </div>
                        
                        {/* Mobile Image (Inside Scroll Area) */}
                        <div className="block md:hidden w-full mt-4">
                            <img 
                                src={project.popupImage || project.image} 
                                alt={project.title} 
                                className="w-full h-auto rounded-[12px] object-contain"
                                style={{ imageRendering: "auto" }}
                            />
                        </div>
                    </div>

                    {/* Desktop Image (Fixed on Right) */}
                    <div className="hidden md:block flex-1 bg-black/20">
                        <div className="w-full h-full rounded-[16px] overflow-hidden bg-white/5">
                            <img 
                                src={project.popupImage || project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover" 
                                style={{ imageRendering: "auto" }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const SimplifiedInfoItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col items-center gap-1">
        <h3 className="text-[20px] font-extrabold text-[#FFF] leading-[1.5]">{label}</h3>
        <AnimatePresence mode="wait">
            <motion.p 
                key={value} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="text-[16px] md:text-[18px] text-[#B4B9C5] font-normal leading-[1.5] text-center"
            >
                {value}
            </motion.p>
        </AnimatePresence>
    </div>
);

interface ResultsSectionProps {
    projects: ProjectItem[];
    onContactClick?: () => void;
}

export function ResultsSection({ projects, onContactClick }: ResultsSectionProps) {
    const [linearIndex, setLinearIndex] = useState(projects.length * 100);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nextProject = useCallback(() => setLinearIndex(prev => prev + 1), []);
    const prevProject = useCallback(() => setLinearIndex(prev => prev - 1), []);
    const currentProjectIndex = ((linearIndex % projects.length) + projects.length) % projects.length;
    const currentProject = projects[currentProjectIndex];

    const handleCardClick = (index: number) => {
        setLinearIndex(index);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full pt-[120px] pb-[120px] flex flex-col items-center gap-8 md:gap-16 overflow-hidden text-white relative">
            <AnimatePresence>
                {isModalOpen && <ProjectModal project={currentProject} onClose={() => setIsModalOpen(null as any)} />}
            </AnimatePresence>

            {/* Navigation Buttons Layered High */}
            <div className={`flex justify-between z-[1100] pointer-events-none transition-all duration-300 ${
                isModalOpen 
                ? "fixed inset-x-4 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:w-[1144px]" 
                : "absolute inset-x-4 md:left-1/2 md:-translate-x-1/2 top-[490px] md:top-[610px] md:w-[380px]"
            }`}>
                <button onClick={prevProject} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-[#365EFF] hover:border-transparent hover:text-white transition-all shadow-2xl cursor-pointer"><ChevronLeft className="size-6 md:size-8" /></button>
                <button onClick={nextProject} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-[#365EFF] hover:border-transparent hover:text-white transition-all shadow-2xl cursor-pointer"><ChevronRight className="size-6 md:size-8" /></button>
            </div>

            <div className="text-center px-4 flex flex-col gap-4">
                <h2 className="font-extrabold text-[28px] md:text-[64px] text-white uppercase leading-[1.3] md:leading-[1.2] text-center">
                    <p className="mb-0">Changes MADE,</p>
                    <p>Results PROVEN</p>
                </h2>
                <div className="flex flex-col gap-1 text-[#b4b9c5] text-[18px] md:text-[20px] font-normal">
                    <span>정확한 방향 설정은 성공을 만듭니다.</span>
                    <span>이 프로젝트들이 가장 명확한 증거입니다.</span>
                </div>
            </div>

            <div className="relative w-full max-w-[1440px] h-[430px] mt-2 flex items-center justify-center perspective-[1000px] z-20">
                <ThreeDSlider items={projects} activeIndex={linearIndex} onCardClick={handleCardClick} />
            </div>

            {/* Focused Project Title & Category */}
            <div className="flex flex-col items-center text-center mt-0 md:mt-[-44px] h-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentProject.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <h3 className="text-[20px] font-semibold text-white leading-[1.1]">
                            {currentProject.title}
                        </h3>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="w-full max-w-[800px] px-4 flex flex-row justify-center items-start gap-4 md:gap-12 mt-2">
                <div className="flex-1 flex justify-center">
                    <SimplifiedInfoItem label="대행영역" value={currentProject.category} />
                </div>
                <div className="flex-1 md:flex-[1.5] flex justify-center">
                    <SimplifiedInfoItem label="성과요약" value={currentProject.description} />
                </div>
            </div>

            <button onClick={onContactClick} className="bg-white/5 flex gap-[32px] items-center pl-5 pr-2 py-2 rounded-full border border-white/10 hover:bg-[#365EFF] hover:border-transparent hover:text-white group transition-all cursor-pointer">
                <span className="font-semibold">성과 만들러가기</span>
                <div className="bg-white rounded-full p-1 size-8 text-[#1B1C1F] group-hover:bg-[#365EFF] group-hover:text-white transition-colors flex items-center justify-center">
                    <ArrowNarrowRight color="currentColor" />
                </div>
            </button>
        </div>
    );
}

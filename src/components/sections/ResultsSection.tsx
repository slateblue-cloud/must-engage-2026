import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowNarrowRight } from "../ui/Icons";
import { ProjectItem } from "../../types/landing";
import { getAssetsUrl } from "../../lib/directus";

const SPRING_CONFIG = {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
};

function SliderCard({ item, index, activeIndex }: { item: ProjectItem; index: number; activeIndex: number }) {
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
            className="absolute w-[280px] h-[380px]"
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
                <div className="absolute inset-0">
                    <img src={getAssetsUrl(item.image)} alt={item.title} className="w-full h-full object-cover select-none pointer-events-none" />
                </div>
                {!isCenter && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
            </motion.div>
        </motion.div>
    );
}

function ThreeDSlider({ items, activeIndex }: { items: ProjectItem[]; activeIndex: number }) {
    const totalOriginal = items.length;
    const visibleRange = React.useMemo(() => {
        return Array.from({ length: 11 }, (_, i) => activeIndex - 5 + i);
    }, [activeIndex]);

    return (
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {visibleRange.map((i) => {
                const projectIndex = ((i % totalOriginal) + totalOriginal) % totalOriginal;
                const project = items[projectIndex];
                return <SliderCard key={`${project.id}-${i}`} item={project} index={i} activeIndex={activeIndex} />;
            })}
        </div>
    );
}

function ResultsAccordion({ project }: { project: ProjectItem }) {
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
                    <button onClick={() => setOpenItem(openItem === item.label ? null : item.label)} className="w-full flex justify-between items-center py-4 focus:outline-none">
                        <div className="flex items-baseline gap-2">
                            <span className="text-[18px] font-normal text-white">{item.label}</span>
                            <span className="text-[18px] font-extrabold text-white">{item.value}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-[#b4b9c5] transition-transform duration-300 ${openItem === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {openItem === item.label && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <p className="pb-4 text-[14px] text-[#b4b9c5] leading-[1.5] font-normal">
                                    이 성과를 낼 수 있었던 전략 및 방법을 써주세요.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
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
        <p className="text-[16px] text-[#B4B9C5] font-normal leading-[1.5]">이 성과를 낼 수 있었던 전략 및 방법을 써주세요.</p>
    </div>
);

interface ResultsSectionProps {
    projects: ProjectItem[];
}

export function ResultsSection({ projects }: ResultsSectionProps) {
    const [linearIndex, setLinearIndex] = useState(projects.length * 100);
    const nextProject = useCallback(() => setLinearIndex(prev => prev + 1), []);
    const prevProject = useCallback(() => setLinearIndex(prev => prev - 1), []);
    const currentProjectIndex = ((linearIndex % projects.length) + projects.length) % projects.length;
    const currentProject = projects[currentProjectIndex];

    return (
        <div className="w-full pt-0 pb-[240px] flex flex-col items-center gap-8 md:gap-16 overflow-hidden text-white">
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

            <div className="relative w-full max-w-[1440px] h-[400px] md:h-[480px] mt-4 md:mt-0 flex items-center justify-center perspective-[1000px] z-20">
                <ThreeDSlider items={projects} activeIndex={linearIndex} />
                <div className="absolute inset-x-4 md:inset-x-10 top-1/2 -translate-y-1/2 flex justify-between z-[200] pointer-events-none">
                    <button onClick={prevProject} className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-white hover:text-black transition-all shadow-2xl"><ChevronLeft className="size-5" /></button>
                    <button onClick={nextProject} className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-white hover:text-black transition-all shadow-2xl"><ChevronRight className="size-5" /></button>
                </div>
            </div>

            {/* Focused Project Title & Category */}
            <div className="flex flex-col items-center text-center mt-4 md:mt-8 h-[80px] md:h-[100px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentProject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <h3 className="text-[24px] md:text-[48px] font-extrabold text-white leading-[1.2]">
                            {currentProject.title}
                        </h3>
                        <span className="text-[16px] md:text-[20px] font-medium text-[#B4B9C5] mt-1 md:mt-2">
                            {currentProject.category}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="w-full max-w-[1080px] px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6 md:mt-12">
                <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-[18px] md:text-[32px] font-extrabold text-[#FFF] leading-[1.5]">성과요약</h3>
                    <AnimatePresence mode="wait">
                        <motion.p key={currentProject.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[#B4B9C5] text-[16px] leading-[1.5] font-normal">{currentProject.description}</motion.p>
                    </AnimatePresence>
                </div>
                <div className="lg:col-span-8">
                    <div className="hidden md:grid grid-cols-2 gap-x-16 gap-y-10">
                        <MetricItem label="CTR" value={currentProject.ctr} />
                        <MetricItem label="ROAS" value={currentProject.roas} />
                        <MetricItem label="ROI" value={currentProject.roi} />
                        <MetricItem label="CVR" value={currentProject.cvr} />
                    </div>
                    <div className="md:hidden">
                        <ResultsAccordion project={currentProject} />
                    </div>
                </div>
            </div>

            <button className="bg-white/5 flex gap-[32px] items-center pl-5 pr-2 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black group transition-all">
                <span className="font-semibold">성과 만들러가기</span>
                <div className="bg-white rounded-full p-1 size-8 text-black group-hover:bg-white transition-colors flex items-center justify-center">
                    <ArrowNarrowRight color="#1B1C1F" />
                </div>
            </button>
        </div>
    );
}

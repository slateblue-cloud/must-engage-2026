import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import mustCompanySvg from "../../assets/mustcompany.svg";
import mustCreativeSvg from "../../assets/mustcreative.svg";
import mufinSvg from "../../assets/mufin.svg";
import mustuSvg from "../../assets/mustu.svg";
import moadSvg from "../../assets/moad.svg";
import fortelierSvg from "../../assets/fortelier.svg";
import emailIcon from "../../assets/email-icon.svg";
import callIcon from "../../assets/call-icon.svg";
import snsIcon1 from "../../assets/sns-icon01.svg";
import snsIcon2 from "../../assets/sns-icon02.svg";
import snsIcon3 from "../../assets/sns-icon03.svg";
import snsIcon4 from "../../assets/sns-icon04.svg";

type OptionType = string | { label: string; icon?: string; link?: string; disabled?: boolean };

function CustomSelect({ options, placeholder, isFooter = false }: { options: OptionType[], placeholder?: string, isFooter?: boolean }) {
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
        <div className={`flex flex-col gap-2 relative ${isOpen ? 'z-50' : ''}`} ref={containerRef}>
            <div className={`relative ${isFooter ? 'w-full md:w-[280px]' : 'w-full'}`}>
                <div
                    className="w-full h-[44px] rounded-[8px] bg-white border border-transparent px-4 flex items-center justify-between cursor-pointer focus:outline-none transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        {isFooter && <img src={mustCompanySvg} alt="icon" className="w-[18px] h-[18px]" />}
                        <span className="font-['Pretendard',sans-serif] text-[16px] text-[#1b1c1f]">{isFooter ? "FAMILY SITE" : selected}</span>
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

interface FooterProps {
    data?: any;
}

export function Footer({ data }: FooterProps) {
    const content = data || {
        company: "주)머스트인게이지",
        representative: "차주헌",
        business_number: "000-00-00000",
        address: "서울특별시 강남구 논현동 28-2",
        email: "ingo@domain.com",
        phone: "+82-13-1234",
        copyright: "© 2025 Must-Engage. All rights reserved."
    };

    return (
        <div className="w-full bg-[#e2e5ee] py-16 px-4 flex justify-center">
            <div className="max-w-[1440px] w-full flex flex-col md:flex-row gap-8 lg:gap-20 justify-between text-[#8b909b]">
                <div className="flex flex-col gap-6 shrink-0">
                    <img src={mustCreativeSvg} alt="Must Creative" className="h-[24px] w-auto object-contain place-self-start" />
                    <div className="flex flex-col font-['Pretendard',sans-serif] text-[16px] font-normal text-[#8b909b] leading-[1.5]">
                        <p>{content.company}</p>
                        <p>대표자: {content.representative}</p>
                        <p>사업자등록번호: {content.business_number}</p>
                        <p>{content.address}</p>
                        <p className="mt-4">{content.copyright}</p>
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
                            <span>{content.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[15px]">
                            <img src={callIcon} alt="Phone" className="w-5 h-5" />
                            <span>{content.phone}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-auto">
                        {[snsIcon1, snsIcon2, snsIcon3, snsIcon4].map((icon, i) => (
                            <img key={i} src={icon} alt="SNS" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                        ))}
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
    );
}

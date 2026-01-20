import React from "react";
import { svgPaths } from "../../app/utils/svgPaths";

export function ArrowNarrowRight({ color = "white" }: { color?: string }) {
    return (
        <div className="relative shrink-0 size-[20px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d={svgPaths.p31c5f200} fill={color} />
            </svg>
        </div>
    );
}

export function EditIcon() {
    return (
        <div className="relative shrink-0 size-[20px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d={svgPaths.pf8b7600} fill="white" />
            </svg>
        </div>
    );
}

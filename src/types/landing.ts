export interface ProjectItem {
    id: number | string;
    title: string;
    category: string;
    image: string;
    popupImage?: string;
    ctr: string;
    roas: string;
    roi: string;
    cvr: string;
    description: string;
    project_detail?: string;
    plan?: string;
    result?: string;
}

export interface HeroContent {
    subTitle: string;
    titleLine1: string;
    titleLine2: string;
    descriptionLine1: string;
    descriptionLine2: string;
}

export interface DiagnosisCardData {
    num: string;
    title: string;
    subtitle: string;
}

export interface ImcItem {
    title: string;
    content: string[];
}

export interface RenovationCardData {
    title: string | React.ReactNode;
    description: string;
    image: string;
    rotate?: string;
    spacing?: string;
}

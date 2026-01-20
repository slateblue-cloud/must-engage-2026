import { createDirectus, rest, readItems, readItem, realtime } from '@directus/sdk';

/**
 * Directus 클라이언트 설정
 * URL과 Static Token은 환경 변수에서 관리하는 것이 권장됩니다.
 * Vite 환경에서는 import.meta.env를 사용합니다.
 */
const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus(DIRECTUS_URL)
    .with(rest())
    .with(realtime());

/**
 * Directus 이미지 ID를 URL로 변환
 */
export function getAssetsUrl(id: string) {
    if (!id) return '';
    return `${DIRECTUS_URL}/assets/${id}`;
}

/**
 * 전역 텍스트나 섹션 데이터를 가져오는 유틸리티 함수들
 */
export async function getLandingHero() {
    return await directus.request(readItem('landing_hero', 1));
}

export async function getLandingDiagnosis() {
    return await directus.request(readItem('landing_diagnosis', 1));
}

export async function getLandingRenovation() {
    return await directus.request(readItem('landing_renovation', 1));
}

export async function getProjects() {
    return await directus.request(readItems('projects', {
        sort: ['sort'],
    }));
}

export async function getDiagnosisCards() {
    return await directus.request(readItems('diagnosis_cards', {
        sort: ['sort'],
    }));
}

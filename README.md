# Must Engage 2026

머스트 인게이지(Must Engage) 2026 프로젝트는 최신 웹 기술과 Headless CMS를 결합하여 역동적이고 실시간으로 업데이트되는 사용자 경험을 제공하는 랜딩페이지 서비스입니다.

## 🏗 아키텍처

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Headless CMS**: Directus (on Docker/GKE)
- **Database**: SQLite3 (Local/Staging)
- **Deployment**: Google Cloud Platform (GCP) Kubernetes Engine (GKE)

## 🚀 로컬 개발 가이드

### 1. 프론트엔드 설정

```bash
# 의존성 설치
npm install

# .env 파일 생성 및 설정 (루트 디렉토리)
# VITE_DIRECTUS_URL=http://localhost:8055

# 개발 서버 실행
npm run dev
```

### 2. Directus (CMS) 설정 (Docker)

Directus는 데이터를 보존하기 위해 로컬 볼륨 마운트가 필요합니다.

```bash
# 1. 빌드 (directus 폴더 내 Dockerfile 사용)
docker build -t custom-directus -f directus/dockerfile directus/

# 2. 실행 (데이터베이스 및 업로드 폴더 마운트 필수)
docker run -d --name directus-final \
  -p 8055:8055 \
  -v $(pwd)/directus/database:/directus/database \
  -v $(pwd)/directus/uploads:/directus/uploads \
  -e KEY="must-engage-key" \
  -e SECRET="must-engage-secret" \
  -e DB_CLIENT="sqlite3" \
  -e DB_FILENAME="/directus/database/data.db" \
  -e ADMIN_EMAIL="admin@example.com" \
  -e ADMIN_PASSWORD="password" \
  -e CORS_ENABLED="true" \
  -e CORS_ORIGIN="true" \
  -e WEBSOCKETS_ENABLED="true" \
  custom-directus
```

## ☁️ GCP GKE 프로덕션 배포 가이드

### 1. Directus 이미지 빌드 및 푸시

GCP 프로젝트 ID를 `[PROJECT_ID]` 자리에 입력하세요.

```bash
# 이미지 빌드
docker build -t gcr.io/[PROJECT_ID]/directus:latest -f directus/dockerfile directus/

# GCR에 이미지 푸시
docker push gcr.io/[PROJECT_ID]/directus:latest
```

### 2. Kubernetes 리소스 적용

```bash
# Deployment 및 Service 배포
kubectl apply -f directus/deployment.yaml
kubectl apply -f directus/service.yaml
```

### 3. 프론트엔드 환경 변수 업데이트 (중요)

배포된 `directus-service`의 외부 IP를 확인한 후, 프론트엔드의 Directus 접속 주소를 수정해야 합니다.

1. GCP 콘솔 혹은 `kubectl get service directus-service` 명령으로 **EXTERNAL-IP**를 확인합니다.
2. 프로토콜을 포함한 주소(예: `http://34.xxx.xxx.xxx:8055`)를 `.env` 파일의 `VITE_DIRECTUS_URL`에 반영합니다.
3. 프론트엔드를 다시 빌드하여 배포합니다.

## 📝 주요 기능

- **실시간 데이터 연동**: Directus의 WebSocket 기능을 활용하여 CMS에서 데이터 수정 시 새로고침 없이 즉시 반영됩니다.
- **컴포넌트 기반 구조**: 각 섹션(Hero, Diagnosis, Renovation, Results)이 독립된 컴포넌트로 분리되어 유지보수가 용이합니다.
- **3D 슬라이더**: 포트폴리오 섹션에서 역동적인 3D 카드 슬라이더 인터랙션을 제공합니다.

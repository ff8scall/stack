import { PricingData } from "@/lib/calculator";
import { MessageSquare, Zap, Mic, Image, Layout, Box, Database, Search, Workflow, Cpu, Code, Globe, Shield, Activity, BarChart } from 'lucide-react';

export interface Brick {
  id: string;
  name: string;
  category: "Language" | "Vision" | "Voice" | "Builder" | "Infra";
  pricing: PricingData;
  dxScore: number;
  killerFeature: string;
  lastUpdated: string;
  url: string;
  color: string;
  iconName: string;
  logoSlug?: string;
  baseUsage?: number; // 가중치 (기본값 1, 인프라 등은 0.001 등)
}

export const bricks: Brick[] = [
  // 1. Language & Brain
  {
    id: "openai-gpt41",
    name: "GPT-4.1",
    category: "Language",
    pricing: { type: "token", inputPrice: 2.0, outputPrice: 8.0, freeQuota: 0 },
    dxScore: 4.8,
    killerFeature: "캐싱 효율 75% 개선 및 완벽한 구조화 출력",
    lastUpdated: "2026-04-22",
    url: "https://openai.com",
    color: "#74aa9c",
    iconName: "MessageSquare"
  },
  {
    id: "anthropic-claude46",
    name: "Claude 4.6",
    category: "Language",
    pricing: { type: "token", inputPrice: 3.0, outputPrice: 15.0, freeQuota: 0 },
    dxScore: 4.9,
    killerFeature: "TTL 제어 가능 캐싱과 압도적 코딩 추론",
    lastUpdated: "2026-04-22",
    url: "https://anthropic.com",
    color: "#d97757",
    iconName: "Cpu",
    logoSlug: "anthropic"
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3.2",
    category: "Language",
    pricing: { type: "token", inputPrice: 0.28, outputPrice: 0.42, freeQuota: 0 },
    dxScore: 4.1,
    killerFeature: "글로벌 가격 파괴 및 OpenAI API 완벽 호환",
    lastUpdated: "2026-04-22",
    url: "https://deepseek.com",
    color: "#60a5fa",
    iconName: "Zap"
  },
  {
    id: "groq-llama33",
    name: "Groq LPU",
    category: "Language",
    pricing: { type: "token", inputPrice: 0.59, outputPrice: 0.79, freeQuota: 0 },
    dxScore: 4.5,
    killerFeature: "300+ TPS의 초저지연 실시간 인퍼런스",
    lastUpdated: "2026-04-22",
    url: "https://groq.com",
    color: "#f55036",
    iconName: "Zap"
  },
  {
    id: "gemini-3-pro",
    name: "Gemini 3 Pro",
    category: "Language",
    pricing: { type: "token", inputPrice: 2, outputPrice: 12, freeQuota: 1500000 },
    dxScore: 4.2,
    killerFeature: "방대한 무료 티어와 구글 생태계 통합",
    lastUpdated: "2026-04-20",
    url: "https://aistudio.google.com",
    color: "#4285f4",
    iconName: "Zap",
    logoSlug: "googlegemini"
  },

  // 2. Vision & UI
  {
    id: "fal-ai",
    name: "fal.ai",
    category: "Vision",
    pricing: { type: "request", unitPrice: 0.04, freeQuota: 0 },
    dxScore: 4.7,
    killerFeature: "밀리초 단위의 실시간 이미지 생성 API",
    lastUpdated: "2026-04-22",
    url: "https://fal.ai",
    color: "#000000",
    iconName: "Image"
  },
  {
    id: "replicate",
    name: "Replicate",
    category: "Vision",
    pricing: { type: "request", unitPrice: 0.01, freeQuota: 0 },
    dxScore: 4.6,
    killerFeature: "방대한 오픈소스 모델의 서버리스 GPU 배포",
    lastUpdated: "2026-04-22",
    url: "https://replicate.com",
    color: "#ffffff",
    iconName: "Box",
    logoSlug: "replicate"
  },
  {
    id: "runway-gen4",
    name: "Runway Gen-4",
    category: "Vision",
    pricing: { type: "subscription", monthlyPrice: 28, freeQuota: 0 },
    dxScore: 4.8,
    killerFeature: "엔터프라이즈급 영상 품질과 정밀 모션 제어",
    lastUpdated: "2026-04-22",
    url: "https://runwayml.com",
    color: "#ffffff",
    iconName: "Image"
  },
  {
    id: "leonardo-ai",
    name: "Leonardo.ai",
    category: "Vision",
    pricing: { type: "subscription", monthlyPrice: 9, freeQuota: 0 },
    dxScore: 4.4,
    killerFeature: "팀 단위 커스텀 AI 모델 훈련 및 스타일 참조",
    lastUpdated: "2026-04-22",
    url: "https://leonardo.ai",
    color: "#ffffff",
    iconName: "Layout"
  },

  // 3. Voice & Audio
  {
    id: "cartesia-sonic",
    name: "Cartesia",
    category: "Voice",
    pricing: { type: "subscription", monthlyPrice: 4, freeQuota: 0 },
    dxScore: 4.9,
    killerFeature: "90ms의 초저지연 TTFA와 인간적 감정 표현",
    lastUpdated: "2026-04-22",
    url: "https://cartesia.ai",
    color: "#ffffff",
    iconName: "Mic"
  },
  {
    id: "deepgram-nova",
    name: "Deepgram",
    category: "Voice",
    pricing: { type: "request", unitPrice: 0.0092, freeQuota: 0 },
    dxScore: 4.7,
    killerFeature: "종량제 기반의 고성능 실시간 오디오 파이프라인",
    lastUpdated: "2026-04-22",
    url: "https://deepgram.com",
    color: "#13ef95",
    iconName: "Activity",
    logoSlug: "deepgram"
  },
  {
    id: "elevenlabs-v3",
    name: "ElevenLabs",
    category: "Voice",
    pricing: { type: "request", unitPrice: 0.0001, freeQuota: 10000 },
    dxScore: 4.8,
    killerFeature: "70개국 이상의 다국어 음성 합성 독보적 1위",
    lastUpdated: "2026-04-22",
    url: "https://elevenlabs.io",
    color: "#2563eb",
    iconName: "Mic",
    logoSlug: "elevenlabs"
  },
  {
    id: "hume-evi",
    name: "Hume AI",
    category: "Voice",
    pricing: { type: "subscription", monthlyPrice: 70, freeQuota: 0 },
    dxScore: 4.5,
    killerFeature: "사용자의 감정에 동조하는 공감형 음성 인터페이스",
    lastUpdated: "2026-04-22",
    url: "https://hume.ai",
    color: "#ffffff",
    iconName: "Mic"
  },

  // 4. Builder & Frameworks
  {
    id: "pydantic-ai",
    name: "PydanticAI",
    category: "Builder",
    pricing: { type: "free", freeQuota: 0 },
    dxScore: 5.0,
    killerFeature: "타입 안정성 기반의 완벽한 구조화 에이전트 구축",
    lastUpdated: "2026-04-22",
    url: "https://pydantic.ai",
    color: "#e92063",
    iconName: "Code",
    logoSlug: "pydantic"
  },
  {
    id: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    category: "Builder",
    pricing: { type: "subscription", monthlyPrice: 5, freeQuota: 0 },
    dxScore: 5.0,
    killerFeature: "Next.js 최적화 및 Generative UI 통합 지원",
    lastUpdated: "2026-04-22",
    url: "https://sdk.vercel.ai",
    color: "#ffffff",
    iconName: "Workflow",
    logoSlug: "vercel"
  },
  {
    id: "langgraph-cloud",
    name: "LangGraph",
    category: "Builder",
    pricing: { type: "request", unitPrice: 0.001, freeQuota: 0 },
    dxScore: 4.6,
    killerFeature: "상태 머신 기반의 명시적 워크플로우 제어",
    lastUpdated: "2026-04-22",
    url: "https://langchain.com",
    color: "#ffffff",
    iconName: "Workflow"
  },
  {
    id: "composio",
    name: "Composio",
    category: "Builder",
    pricing: { type: "subscription", monthlyPrice: 29, freeQuota: 0 },
    dxScore: 4.5,
    killerFeature: "200개 이상의 SaaS 도구 연동 및 인증 자동화",
    lastUpdated: "2026-04-22",
    url: "https://composio.dev",
    color: "#ffffff",
    iconName: "Box"
  },

  // 5. Infra & Observability
  {
    id: "pinecone-serverless",
    name: "Pinecone",
    category: "Infra",
    pricing: { type: "infra", unitPrice: 4.5, unitName: "1M Write", freeQuota: 0 },
    dxScore: 4.7,
    killerFeature: "완전 관리형 서버리스 벡터 DB의 업계 표준",
    lastUpdated: "2026-04-22",
    url: "https://pinecone.io",
    color: "#ffffff",
    iconName: "Database",
    baseUsage: 1 // 유저당 1 WRU 가정
  },
  {
    id: "upstash-vector",
    name: "Upstash Vector",
    category: "Infra",
    pricing: { type: "request", unitPrice: 0.000004, freeQuota: 10000 },
    dxScore: 4.9,
    killerFeature: "진정한 요청당 과금 방식의 엣지 최적화 DB",
    lastUpdated: "2026-04-22",
    url: "https://upstash.com",
    color: "#3ecf8e",
    iconName: "Zap",
    logoSlug: "upstash",
    baseUsage: 10
  },
  {
    id: "helicone",
    name: "Helicone",
    category: "Infra",
    pricing: { type: "subscription", monthlyPrice: 79, freeQuota: 10000 },
    dxScore: 4.8,
    killerFeature: "스마트 캐싱을 통한 비용 절감 및 관측성 확보",
    lastUpdated: "2026-04-22",
    url: "https://helicone.ai",
    color: "#ffffff",
    iconName: "BarChart"
  },
  {
    id: "braintrust",
    name: "Braintrust",
    category: "Infra",
    pricing: { type: "subscription", monthlyPrice: 249, freeQuota: 0 },
    dxScore: 4.4,
    killerFeature: "AI 품질 평가 및 회귀 테스트 자동화 플랫폼",
    lastUpdated: "2026-04-22",
    url: "https://braintrustdata.com",
    color: "#ffffff",
    iconName: "Shield"
  },
  {
    id: "supabase-db",
    name: "Supabase",
    category: "Infra",
    pricing: { type: "infra", unitPrice: 0.125, unitName: "GB", freeQuota: 0.5 },
    dxScore: 4.7,
    killerFeature: "PostgreSQL 기반의 가장 완성도 높은 BaaS",
    lastUpdated: "2026-04-22",
    url: "https://supabase.com",
    color: "#3ecf8e",
    iconName: "Database",
    logoSlug: "supabase",
    baseUsage: 0.01
  }
];

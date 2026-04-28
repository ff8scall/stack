import { PricingData } from "@/lib/calculator";
const LAST_UPDATED = "2026-04-26";
import { MessageSquare, Zap, Mic, Image, Layout, Box, Database, Search, Workflow, Cpu, Code, Globe, Shield, Activity, BarChart } from 'lucide-react';

export interface PerformanceData {
  intelligence: number; // 지능 (논리, 추론)
  speed: number;        // 속도 (TPS, 지연시간)
  accuracy: number;     // 정확도 (신뢰성)
  benchmarkScore: number; // 공인 벤치마크 점수 (0-100 표준화)
  benchmarkName: string;  // 벤치마크 명칭 (MMLU, HumanEval 등)
  contextWindow: number;  // 컨텍스트 윈도우 (단위: k tokens, N/A는 0)
  maxOutput: number;     // 최대 출력 (단위: k tokens, N/A는 0)
}

export interface Brick {
  id: string;
  name: string;
  category: "Language" | "Vision" | "Voice" | "Builder" | "Infra";
  pricing: PricingData;
  dxScore: number;
  performance: PerformanceData;
  killerFeature: string;
  lastUpdated: string;
  url: string;
  color: string;
  iconName: string;
  logoSlug?: string;
  baseUsage?: number;
  regions: string[]; // 지원 리전 (예: ["US", "EU", "Global"])
}

export const bricks: Brick[] = [
  // 1. Language & Brain
  {
    id: "openai-gpt41",
    name: "GPT-4.1",
    category: "Language",
    pricing: { type: "token", inputPrice: 2, outputPrice: 8, freeQuota: 0 },
    dxScore: 4.8,
    performance: { intelligence: 98, speed: 65, accuracy: 96, benchmarkScore: 92.4, benchmarkName: "MMLU-Pro", contextWindow: 128, maxOutput: 4 },
    killerFeature: "캐싱 효율 75% 개선 및 완벽한 구조화 출력",
    lastUpdated: LAST_UPDATED,
    url: "https://openai.com",
    color: "#74aa9c",
    iconName: "MessageSquare",
    regions: ["US", "EU", "Asia"]
  },
  {
    id: "anthropic-claude46",
    name: "Claude 4.6",
    category: "Language",
    pricing: { type: "token", inputPrice: 3.0, outputPrice: 15.0, freeQuota: 0 },
    dxScore: 4.9,
    performance: { intelligence: 97, speed: 70, accuracy: 98, benchmarkScore: 91.8, benchmarkName: "HumanEval", contextWindow: 200, maxOutput: 8 },
    killerFeature: "TTL 제어 가능 캐싱과 압도적 코딩 추론",
    lastUpdated: LAST_UPDATED,
    url: "https://anthropic.com",
    color: "#d97757",
    iconName: "Cpu",
    logoSlug: "anthropic",
    regions: ["US", "EU"]
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3.2",
    category: "Language",
    pricing: { type: "token", inputPrice: 0.28, outputPrice: 0.42, freeQuota: 0 },
    dxScore: 4.1,
    performance: { intelligence: 92, speed: 75, accuracy: 88, benchmarkScore: 88.5, benchmarkName: "MMLU", contextWindow: 128, maxOutput: 4 },
    killerFeature: "글로벌 가격 파괴 및 OpenAI API 완벽 호환",
    lastUpdated: LAST_UPDATED,
    url: "https://deepseek.com",
    color: "#60a5fa",
    iconName: "Zap",
    regions: ["China", "Global"]
  },
  {
    id: "groq-llama33",
    name: "Groq LPU",
    category: "Language",
    pricing: { type: "token", inputPrice: 0.59, outputPrice: 0.79, freeQuota: 0 },
    dxScore: 4.5,
    performance: { intelligence: 88, speed: 100, accuracy: 85, benchmarkScore: 84.2, benchmarkName: "LMSYS Arena", contextWindow: 128, maxOutput: 8 },
    killerFeature: "300+ TPS의 초저지연 실시간 인퍼런스",
    lastUpdated: LAST_UPDATED,
    url: "https://groq.com",
    color: "#f55036",
    iconName: "Zap",
    regions: ["US"]
  },
  {
    id: "gemini-3-pro",
    name: "Gemini 3 Pro",
    category: "Language",
    pricing: { type: "token", inputPrice: 2, outputPrice: 12, freeQuota: 1500000 },
    dxScore: 4.2,
    performance: { intelligence: 94, speed: 80, accuracy: 92, benchmarkScore: 90.1, benchmarkName: "MMLU-Pro", contextWindow: 2000, maxOutput: 8 },
    killerFeature: "방대한 무료 티어와 구글 생태계 통합",
    lastUpdated: "2026-04-28",
    url: "https://aistudio.google.com",
    color: "#4285f4",
    iconName: "Zap",
    logoSlug: "googlegemini",
    regions: ["Global"]
  },

  // 2. Vision & UI
  {
    id: "fal-ai",
    name: "fal.ai",
    category: "Vision",
    pricing: { type: "request", unitPrice: 0.04, freeQuota: 0 },
    dxScore: 4.7,
    performance: { intelligence: 85, speed: 98, accuracy: 90, benchmarkScore: 95.0, benchmarkName: "Inference Latency", contextWindow: 0, maxOutput: 0 },
    killerFeature: "밀리초 단위의 실시간 이미지 생성 API",
    lastUpdated: LAST_UPDATED,
    url: "https://fal.ai",
    color: "#000000",
    iconName: "Image",
    regions: ["Global"]
  },
  {
    id: "replicate",
    name: "Replicate",
    category: "Vision",
    pricing: { type: "request", unitPrice: 0.01, freeQuota: 0 },
    dxScore: 4.6,
    performance: { intelligence: 80, speed: 85, accuracy: 85, benchmarkScore: 82.5, benchmarkName: "Model Diversity", contextWindow: 0, maxOutput: 0 },
    killerFeature: "방대한 오픈소스 모델의 서버리스 GPU 배포",
    lastUpdated: LAST_UPDATED,
    url: "https://replicate.com",
    color: "#ffffff",
    iconName: "Box",
    logoSlug: "replicate",
    regions: ["US", "Global"]
  },
  {
    id: "runway-gen4",
    name: "Runway Gen-4",
    category: "Vision",
    pricing: { type: "subscription", monthlyPrice: 28, freeQuota: 0 },
    dxScore: 4.8,
    performance: { intelligence: 92, speed: 60, accuracy: 95, benchmarkScore: 96.5, benchmarkName: "VMAF Score", contextWindow: 0, maxOutput: 0 },
    killerFeature: "엔터프라이즈급 영상 품질과 정밀 모션 제어",
    lastUpdated: LAST_UPDATED,
    url: "https://runwayml.com",
    color: "#ffffff",
    iconName: "Image",
    regions: ["US"]
  },
  {
    id: "leonardo-ai",
    name: "Leonardo.ai",
    category: "Vision",
    pricing: { type: "subscription", monthlyPrice: 9, freeQuota: 0 },
    dxScore: 4.4,
    performance: { intelligence: 85, speed: 80, accuracy: 88, benchmarkScore: 89.0, benchmarkName: "Prompt Fidelity", contextWindow: 0, maxOutput: 0 },
    killerFeature: "팀 단위 커스텀 AI 모델 훈련 및 스타일 참조",
    lastUpdated: LAST_UPDATED,
    url: "https://leonardo.ai",
    color: "#ffffff",
    iconName: "Layout",
    regions: ["Global"]
  },

  // 3. Voice & Audio
  {
    id: "cartesia-sonic",
    name: "Cartesia",
    category: "Voice",
    pricing: { type: "subscription", monthlyPrice: 4, freeQuota: 0 },
    dxScore: 4.9,
    performance: { intelligence: 85, speed: 99, accuracy: 96, benchmarkScore: 98.2, benchmarkName: "TTFA (ms)", contextWindow: 0, maxOutput: 0 },
    killerFeature: "90ms의 초저지연 TTFA와 인간적 감정 표현",
    lastUpdated: LAST_UPDATED,
    url: "https://cartesia.ai",
    color: "#ffffff",
    iconName: "Mic",
    regions: ["US"]
  },
  {
    id: "deepgram-nova",
    name: "Deepgram",
    category: "Voice",
    pricing: { type: "request", unitPrice: 0.0092, freeQuota: 0 },
    dxScore: 4.7,
    performance: { intelligence: 80, speed: 95, accuracy: 92, benchmarkScore: 94.5, benchmarkName: "WER (Word Error Rate)", contextWindow: 0, maxOutput: 0 },
    killerFeature: "종량제 기반의 고성능 실시간 오디오 파이프라인",
    lastUpdated: LAST_UPDATED,
    url: "https://deepgram.com",
    color: "#13ef95",
    iconName: "Activity",
    logoSlug: "deepgram",
    regions: ["Global"]
  },
  {
    id: "elevenlabs-v3",
    name: "ElevenLabs",
    category: "Voice",
    pricing: { type: "request", unitPrice: 0.0001, freeQuota: 10000 },
    dxScore: 4.8,
    performance: { intelligence: 90, speed: 88, accuracy: 98, benchmarkScore: 97.8, benchmarkName: "MOS (Naturalness)", contextWindow: 0, maxOutput: 0 },
    killerFeature: "70개국 이상의 다국어 음성 합성 독보적 1위",
    lastUpdated: LAST_UPDATED,
    url: "https://elevenlabs.io",
    color: "#2563eb",
    iconName: "Mic",
    logoSlug: "elevenlabs",
    regions: ["Global"]
  },
  {
    id: "hume-evi",
    name: "Hume AI",
    category: "Voice",
    pricing: { type: "subscription", monthlyPrice: 70, freeQuota: 0 },
    dxScore: 4.5,
    performance: { intelligence: 95, speed: 85, accuracy: 90, benchmarkScore: 92.0, benchmarkName: "Empathy Score", contextWindow: 0, maxOutput: 0 },
    killerFeature: "사용자의 감정에 동조하는 공감형 음성 인터페이스",
    lastUpdated: LAST_UPDATED,
    url: "https://hume.ai",
    color: "#ffffff",
    iconName: "Mic",
    regions: ["US"]
  },

  // 4. Builder & Frameworks
  {
    id: "pydantic-ai",
    name: "PydanticAI",
    category: "Builder",
    pricing: { type: "free", freeQuota: 0 },
    dxScore: 5.0,
    performance: { intelligence: 95, speed: 100, accuracy: 100, benchmarkScore: 99.5, benchmarkName: "Type Safety", contextWindow: 0, maxOutput: 0 },
    killerFeature: "타입 안정성 기반의 완벽한 구조화 에이전트 구축",
    lastUpdated: LAST_UPDATED,
    url: "https://pydantic.ai",
    color: "#e92063",
    iconName: "Code",
    logoSlug: "pydantic",
    regions: ["Global"]
  },
  {
    id: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    category: "Builder",
    pricing: { type: "subscription", monthlyPrice: 5, freeQuota: 0 },
    dxScore: 5.0,
    performance: { intelligence: 90, speed: 95, accuracy: 95, benchmarkScore: 98.0, benchmarkName: "React Integration", contextWindow: 0, maxOutput: 0 },
    killerFeature: "Next.js 최적화 및 Generative UI 통합 지원",
    lastUpdated: LAST_UPDATED,
    url: "https://sdk.vercel.ai",
    color: "#ffffff",
    iconName: "Workflow",
    logoSlug: "vercel",
    regions: ["Global"]
  },
  {
    id: "langgraph-cloud",
    name: "LangGraph",
    category: "Builder",
    pricing: { type: "request", unitPrice: 0.001, freeQuota: 0 },
    dxScore: 4.6,
    performance: { intelligence: 92, speed: 85, accuracy: 92, benchmarkScore: 91.5, benchmarkName: "Agent Stability", contextWindow: 0, maxOutput: 0 },
    killerFeature: "상태 머신 기반의 명시적 워크플로우 제어",
    lastUpdated: LAST_UPDATED,
    url: "https://langchain.com",
    color: "#ffffff",
    iconName: "Workflow",
    regions: ["US", "EU"]
  },
  {
    id: "composio",
    name: "Composio",
    category: "Builder",
    pricing: { type: "subscription", monthlyPrice: 29, freeQuota: 0 },
    dxScore: 4.5,
    performance: { intelligence: 85, speed: 85, accuracy: 88, benchmarkScore: 87.0, benchmarkName: "Tool Connectivity", contextWindow: 0, maxOutput: 0 },
    killerFeature: "200개 이상의 SaaS 도구 연동 및 인증 자동화",
    lastUpdated: LAST_UPDATED,
    url: "https://composio.dev",
    color: "#ffffff",
    iconName: "Box",
    regions: ["Global"]
  },

  // 5. Infra & Observability
  {
    id: "pinecone-serverless",
    name: "Pinecone",
    category: "Infra",
    pricing: { type: "infra", unitPrice: 4.5, unitName: "1M Write", freeQuota: 0 },
    dxScore: 4.7,
    performance: { intelligence: 85, speed: 92, accuracy: 95, benchmarkScore: 94.0, benchmarkName: "Query Latency", contextWindow: 0, maxOutput: 0 },
    killerFeature: "완전 관리형 서버리스 벡터 DB의 업계 표준",
    lastUpdated: LAST_UPDATED,
    url: "https://pinecone.io",
    color: "#ffffff",
    iconName: "Database",
    baseUsage: 1,
    regions: ["US", "EU", "Asia"]
  },
  {
    id: "upstash-vector",
    name: "Upstash Vector",
    category: "Infra",
    pricing: { type: "request", unitPrice: 0.000004, freeQuota: 10000 },
    dxScore: 4.9,
    performance: { intelligence: 80, speed: 98, accuracy: 90, benchmarkScore: 91.0, benchmarkName: "Edge Latency", contextWindow: 0, maxOutput: 0 },
    killerFeature: "진정한 요청당 과금 방식의 엣지 최적화 DB",
    lastUpdated: LAST_UPDATED,
    url: "https://upstash.com",
    color: "#3ecf8e",
    iconName: "Zap",
    logoSlug: "upstash",
    baseUsage: 10,
    regions: ["Global"]
  },
  {
    id: "helicone",
    name: "Helicone",
    category: "Infra",
    pricing: { type: "subscription", monthlyPrice: 79, freeQuota: 10000 },
    dxScore: 4.8,
    performance: { intelligence: 80, speed: 95, accuracy: 95, benchmarkScore: 93.5, benchmarkName: "Caching Efficiency", contextWindow: 0, maxOutput: 0 },
    killerFeature: "스마트 캐싱을 통한 비용 절감 및 관측성 확보",
    lastUpdated: LAST_UPDATED,
    url: "https://helicone.ai",
    color: "#ffffff",
    iconName: "BarChart",
    regions: ["US", "EU"]
  },
  {
    id: "braintrust",
    name: "Braintrust",
    category: "Infra",
    pricing: { type: "subscription", monthlyPrice: 249, freeQuota: 0 },
    dxScore: 4.4,
    performance: { intelligence: 90, speed: 85, accuracy: 95, benchmarkScore: 96.0, benchmarkName: "Eval Accuracy", contextWindow: 0, maxOutput: 0 },
    killerFeature: "AI 품질 평가 및 회귀 테스트 자동화 플랫폼",
    lastUpdated: LAST_UPDATED,
    url: "https://braintrustdata.com",
    color: "#ffffff",
    iconName: "Shield",
    regions: ["US"]
  },
  {
    id: "supabase-db",
    name: "Supabase",
    category: "Infra",
    pricing: { type: "infra", unitPrice: 0.125, unitName: "GB", freeQuota: 0.5 },
    dxScore: 4.7,
    performance: { intelligence: 85, speed: 85, accuracy: 95, benchmarkScore: 94.8, benchmarkName: "BaaS Completeness", contextWindow: 0, maxOutput: 0 },
    killerFeature: "PostgreSQL 기반의 가장 완성도 높은 BaaS",
    lastUpdated: LAST_UPDATED,
    url: "https://supabase.com",
    color: "#3ecf8e",
    iconName: "Database",
    logoSlug: "supabase",
    baseUsage: 0.01,
    regions: ["Global"]
  }
];


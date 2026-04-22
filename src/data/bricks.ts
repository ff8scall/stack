import { PricingData } from "@/lib/calculator";
import { MessageSquare, Zap, Mic, Image, Layout, Box, Database, Search, Workflow, Cpu, Code } from 'lucide-react';

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
    id: "openai-gpt4o",
    name: "GPT-4o",
    category: "Language",
    pricing: { type: "token", inputPrice: 2.5, outputPrice: 10, freeQuota: 0 },
    dxScore: 4.5,
    killerFeature: "업계 표준의 추론 능력과 범용성",
    lastUpdated: "2026-04-22",
    url: "https://openai.com",
    color: "#74aa9c",
    iconName: "MessageSquare",
    logoSlug: "openai"
  },
  {
    id: "anthropic-claude4",
    name: "Claude 4",
    category: "Language",
    pricing: { type: "token", inputPrice: 3, outputPrice: 15, freeQuota: 0 },
    dxScore: 4.8,
    killerFeature: "압도적인 긴 문맥 이해도와 섬세한 글쓰기",
    lastUpdated: "2026-04-22",
    url: "https://anthropic.com",
    color: "#d97757",
    iconName: "Cpu",
    logoSlug: "anthropic"
  },
  {
    id: "gemini-3-pro",
    name: "Gemini 3 Pro",
    category: "Language",
    pricing: { type: "token", inputPrice: 2, outputPrice: 12, freeQuota: 1500000 },
    dxScore: 4.2,
    killerFeature: "구글 생태계 통합 및 광활한 무료 티어",
    lastUpdated: "2026-04-20",
    url: "https://aistudio.google.com",
    color: "#4285f4",
    iconName: "Zap",
    logoSlug: "googlegemini"
  },
  {
    id: "groq-llama3",
    name: "Groq",
    category: "Language",
    pricing: { type: "request", unitPrice: 0.0001, freeQuota: 1000 },
    dxScore: 4.0,
    killerFeature: "비교 불가능한 압도적인 추론 속도",
    lastUpdated: "2026-04-18",
    url: "https://groq.com",
    color: "#f55036",
    iconName: "Zap",
    logoSlug: "groq"
  },

  // 2. Vision & UI
  {
    id: "v0-dev",
    name: "v0.dev",
    category: "Vision",
    pricing: { type: "subscription", monthlyPrice: 20, freeQuota: 5 },
    dxScore: 4.9,
    killerFeature: "말 한마디로 완성되는 고퀄리티 UI 컴포넌트",
    lastUpdated: "2026-04-12",
    url: "https://v0.dev",
    color: "#000000",
    iconName: "Layout"
  },
  {
    id: "midjourney-v7",
    name: "Midjourney v7",
    category: "Vision",
    pricing: { type: "subscription", monthlyPrice: 30, freeQuota: 0 },
    dxScore: 5.0,
    killerFeature: "예술적 감각이 극대화된 이미지 생성 AI",
    lastUpdated: "2026-04-05",
    url: "https://midjourney.com",
    color: "#ffffff",
    iconName: "Image"
  },

  // 3. Infra (New)
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
    baseUsage: 0.01 // 유저당 0.01GB (10MB) 기준
  },

  // 4. Voice & Audio
  {
    id: "elevenlabs-v3",
    name: "ElevenLabs",
    category: "Voice",
    pricing: { type: "request", unitPrice: 0.0003, freeQuota: 10000 },
    dxScore: 4.8,
    killerFeature: "가장 인간다운 감정이 실린 음성 합성",
    lastUpdated: "2026-04-14",
    url: "https://elevenlabs.io",
    color: "#2563eb",
    iconName: "Mic",
    logoSlug: "elevenlabs"
  },

  // 5. Builder
  {
    id: "cursor-ide",
    name: "Cursor",
    category: "Builder",
    pricing: { type: "subscription", monthlyPrice: 20, freeQuota: 2000 },
    dxScore: 4.9,
    killerFeature: "AI와 한 몸이 되어 코딩하는 차세대 IDE",
    lastUpdated: "2026-04-21",
    url: "https://cursor.sh",
    color: "#3b82f6",
    iconName: "Code",
    logoSlug: "cursor"
  },
  {
    id: "perplexity-pro",
    name: "Perplexity",
    category: "Language",
    pricing: { type: "subscription", monthlyPrice: 20, freeQuota: 5 },
    dxScore: 4.8,
    killerFeature: "실시간 웹 검색이 결합된 가장 완벽한 답변 엔진",
    lastUpdated: "2026-04-21",
    url: "https://perplexity.ai",
    color: "#22c55e",
    iconName: "Search",
    logoSlug: "perplexity"
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    category: "Language",
    pricing: { type: "token", inputPrice: 2, outputPrice: 6, freeQuota: 0 },
    dxScore: 4.3,
    killerFeature: "유럽을 대표하는 강력하고 효율적인 오픈 웨이트 모델",
    lastUpdated: "2026-04-21",
    url: "https://mistral.ai",
    color: "#f97316",
    iconName: "Cpu",
    logoSlug: "mistralai"
  },
  {
    id: "pinecone-db",
    name: "Pinecone",
    category: "Infra",
    pricing: { type: "infra", unitPrice: 0.000002, unitName: "Req", freeQuota: 100000 },
    dxScore: 4.6,
    killerFeature: "가장 안정적이고 관리하기 쉬운 벡터 데이터베이스",
    lastUpdated: "2026-04-22",
    url: "https://pinecone.io",
    color: "#000000",
    iconName: "Database",
    logoSlug: "pinecone",
    baseUsage: 10 // 유저당 10 RUs 기준
  },
  {
    id: "upstash-redis",
    name: "Upstash",
    category: "Infra",
    pricing: { type: "request", unitPrice: 0.000002, freeQuota: 10000 },
    dxScore: 4.9,
    killerFeature: "서버리스 환경을 위한 Redis/Kafka 서비스",
    lastUpdated: "2026-04-22",
    url: "https://upstash.com",
    color: "#3ecf8e",
    iconName: "Zap",
    logoSlug: "upstash",
    baseUsage: 100 // 유저당 100 요청 기준
  },
  {
    id: "runway-gen3",
    name: "Runway",
    category: "Vision",
    pricing: { type: "subscription", monthlyPrice: 15, freeQuota: 0 },
    dxScore: 4.7,
    killerFeature: "텍스트에서 비디오로, 차세대 영상 제작 솔루션",
    lastUpdated: "2026-04-21",
    url: "https://runwayml.com",
    color: "#ffffff",
    iconName: "Image",
    logoSlug: "runway"
  },
];


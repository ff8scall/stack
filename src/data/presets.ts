export interface Preset {
  id: string;
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  brickIds: string[];
  color: string;
}

export const presets: Preset[] = [
  {
    id: "ai-saas-starter",
    name: {
      ko: "AI SaaS 스타터",
      en: "AI SaaS Starter"
    },
    description: {
      ko: "최소한의 비용으로 강력한 AI 앱을 구축하는 표준 조합",
      en: "The standard combo for building AI apps with minimal cost"
    },
    brickIds: ["openai-gpt41", "supabase-db", "vercel-ai-sdk"],
    color: "#74aa9c"
  },
  {
    id: "heavy-agent",
    name: {
      ko: "초고성능 에이전트",
      en: "High-Perf Agent"
    },
    description: {
      ko: "복잡한 추론과 긴 문맥 처리가 필요한 엔터프라이즈급 구성",
      en: "Enterprise-grade config for complex reasoning and long context"
    },
    brickIds: ["anthropic-claude46", "supabase-db", "gemini-3-pro"],
    color: "#d97757"
  },
  {
    id: "content-creator",
    name: {
      ko: "크리에이티브 스튜디오",
      en: "Creative Studio"
    },
    description: {
      ko: "이미지, 음성, UI 생성을 아우르는 창작자용 스택",
      en: "Creator stack for image, voice, and UI generation"
    },
    brickIds: ["fal-ai", "elevenlabs-v3", "runway-gen4"],
    color: "#3b82f6"
  }
];

import { getTranslations } from 'next-intl/server';
import BrickGrid from '@/components/BrickGrid';
import CalculatorBar from '@/components/CalculatorBar';
import Navbar from '@/components/Navbar';
import PresetSelector from '@/components/PresetSelector';

export const revalidate = 3600; // 1시간마다 데이터 갱신 (ISR)

export default async function IndexPage() {
  const t = await getTranslations('Index');

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '0 2rem 12rem 2rem'
    }}>
      {/* SEO용 H1 (디자인상 Navbar 로고와 겹치지 않게 시각적으로는 Navbar를 강조하고, 검색엔진에는 의미 전달) */}
      <h1 style={{ 
        position: 'absolute', 
        width: '1px', 
        height: '1px', 
        padding: 0, 
        margin: '-1px', 
        overflow: 'hidden', 
        clip: 'rect(0,0,0,0)', 
        border: 0 
      }}>
        {t('title')}
      </h1>
      
      <Navbar />
      <PresetSelector />
      <BrickGrid />
      <CalculatorBar />
    </main>
  );
}

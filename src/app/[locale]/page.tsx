import BrickGrid from '@/components/BrickGrid';
import CalculatorBar from '@/components/CalculatorBar';
import Navbar from '@/components/Navbar';
import PresetSelector from '@/components/PresetSelector';

export const revalidate = 3600; // 1시간마다 데이터 갱신 (ISR)

export default function IndexPage() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '0 2rem 12rem 2rem'
    }}>
      <Navbar />
      <PresetSelector />
      <BrickGrid />
      <CalculatorBar />
    </main>
  );
}

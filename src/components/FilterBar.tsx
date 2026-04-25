import { useStackStore } from '@/store/useStackStore';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

const categories = ['All', 'Language', 'Vision', 'Voice', 'Builder', 'Infra'];

export default function FilterBar({ isNavbar = false }: { isNavbar?: boolean }) {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useStackStore();
  const t = useTranslations('Categories');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
      maxWidth: '1200px',
      marginBottom: isNavbar ? '0' : '2rem',
    }}>
      {!isNavbar && (
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto 1rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI bricks... (e.g. GPT-4, Supabase)"
            style={{
              width: '100%',
              padding: '0.9rem 1rem 0.9rem 3rem',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
          />
          {searchQuery && (
            <X 
              size={18} 
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }} 
            />
          )}
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: isNavbar ? '0.2rem' : '0.5rem',
        padding: isNavbar ? '0' : '0.5rem',
        borderRadius: '16px',
        border: isNavbar ? 'none' : '1px solid var(--border)',
        backgroundColor: 'transparent',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        justifyContent: isNavbar ? 'flex-start' : 'center'
      }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '500',
              backgroundColor: activeCategory === category ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: activeCategory === category ? '#fff' : 'var(--foreground-secondary)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {t(category)}
          </button>
        ))}
      </div>
    </div>
  );
}


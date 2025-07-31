import { Button } from '@/components/ui/button';
import type { Translations } from '@/content/translations';

type LanguageToggleProps = {
  language: 'en' | 'sw';
  setLanguage: (lang: 'en' | 'sw') => void;
  t: Translations[keyof Translations];
};

export function LanguageToggle({ language, setLanguage, t }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`transition-all ${language === 'en' ? 'ring-2 ring-primary-foreground/50' : ''}`}
      >
        EN
      </Button>
      <Button
        variant={language === 'sw' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('sw')}
        className={`transition-all ${language === 'sw' ? 'ring-2 ring-primary-foreground/50' : ''}`}
      >
        SW
      </Button>
    </div>
  );
}

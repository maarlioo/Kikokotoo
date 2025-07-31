import type { Translations } from '@/content/translations';

type FooterProps = {
  t: Translations[keyof Translations];
};

export function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t bg-accent/10">
      <div className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p className="font-semibold text-accent mb-2">{t.footer.disclaimerTitle}</p>
        <p className="text-sm mb-4">{t.footer.disclaimerText}</p>
        <p className="text-sm">{t.footer.contactInfo}</p>
      </div>
    </footer>
  );
}

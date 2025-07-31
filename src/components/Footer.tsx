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
        <div className="flex justify-center gap-4 my-4">
          <a href="https://www.psssf.or.tz/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline text-accent font-semibold">
            PSSSF
          </a>
          <a href="https://www.nssf.or.tz/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline text-accent font-semibold">
            NSSF
          </a>
        </div>
        <p className="text-xs mt-6">Made with ❤️ by mariohilmar</p>
      </div>
    </footer>
  );
}

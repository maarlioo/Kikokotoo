"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { LanguageToggle } from '@/components/LanguageToggle';
import { PensionCalculator } from '@/components/PensionCalculator';
import { Footer } from '@/components/Footer';
import { translations } from '@/content/translations';
import { ArrowDown, Coins } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const t = translations[language];
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleScrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Coins className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold font-headline text-accent">{t.appName}</h1>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} t={t} />
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto flex flex-col items-center justify-center text-center py-20 md:py-32 px-4">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-primary">
            {t.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
            {t.tagline}
          </p>
          <Button size="lg" className="mt-8 text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow" onClick={handleScrollToCalculator}>
            {t.startCalculation} <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </section>

        <div ref={calculatorRef} className="pb-16 md:pb-24">
          <PensionCalculator language={language} t={t} />
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

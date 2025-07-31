
"use client";

import { useState, useMemo, useEffect } from 'react';
import { differenceInMonths, format } from 'date-fns';
import { AlertTriangle, CalendarIcon, CheckCircle2, ChevronsUpDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";
import type { Translations } from '@/content/translations';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

type PensionCalculatorProps = {
  language: 'en' | 'sw';
  t: Translations[keyof Translations];
};

const MIN_MONTHS = 180;

export function PensionCalculator({ language, t }: PensionCalculatorProps) {
  const [hiredDate, setHiredDate] = useState<Date>();
  const [retirementDate, setRetirementDate] = useState<Date>();
  const [salaryInputMode, setSalaryInputMode] = useState<'table' | 'multiline'>('table');
  const [salaries, setSalaries] = useState<(number | null)[]>(Array(36).fill(null));
  const [multilineSalaryText, setMultilineSalaryText] = useState('');
  
  const [ape, setApe] = useState<number | null>(null);
  const [lumpSumPension, setLumpSumPension] = useState<number | null>(null);
  const [monthlyPension, setMonthlyPension] = useState<number | null>(null);

  const { toast } = useToast();

  const monthsOfService = useMemo(() => {
    if (hiredDate && retirementDate && retirementDate > hiredDate) {
      return differenceInMonths(retirementDate, hiredDate);
    }
    return 0;
  }, [hiredDate, retirementDate]);

  const enteredSalariesCount = useMemo(() => salaries.filter(s => s !== null && s > 0).length, [salaries]);
  const allSalariesEntered = useMemo(() => enteredSalariesCount === 36, [enteredSalariesCount]);
  const sumOfSalaries = useMemo(() => salaries.reduce((acc, s) => acc + (s || 0), 0), [salaries]);

  useEffect(() => {
    if (allSalariesEntered && sumOfSalaries > 0) {
      const calculatedApe = (sumOfSalaries / 36) * 12;
      setApe(calculatedApe);
    } else {
      setApe(null);
      setLumpSumPension(null);
      setMonthlyPension(null);
    }
  }, [allSalariesEntered, sumOfSalaries]);

  const handleSalaryChange = (index: number, value: string) => {
    const newSalaries = [...salaries];
    const numericValue = parseFloat(value.replace(/,/g, ''));
    newSalaries[index] = isNaN(numericValue) || numericValue < 0 ? null : numericValue;
    setSalaries(newSalaries);
  };
  
  const handleMultilineSalaryChange = (text: string) => {
    setMultilineSalaryText(text);
    const parsedSalaries = text
      .split('\n')
      .map(line => line.replace(/[^0-9.]/g, ''))
      .filter(line => line.trim() !== '')
      .map(numStr => parseFloat(numStr))
      .filter(num => !isNaN(num) && num > 0);
    
    const newSalaries = Array(36).fill(null);
    for (let i = 0; i < Math.min(parsedSalaries.length, 36); i++) {
        newSalaries[i] = parsedSalaries[i];
    }
    setSalaries(newSalaries);
  };

  const calculatePensions = (type: 'lump' | 'monthly') => {
    if (ape === null || monthsOfService < MIN_MONTHS) {
      toast({
        variant: "destructive",
        title: t.calculator.errors.calculationErrorTitle,
        description: t.calculator.errors.incompleteData,
      });
      return;
    }
    const basePension = (1 / 580) * monthsOfService * ape;
    if (type === 'lump') {
      const cp = basePension * 0.33 * 12.5;
      setLumpSumPension(cp);
      setMonthlyPension(null);
    } else {
      const mp = (basePension * 0.67) / 12;
      setMonthlyPension(mp);
      setLumpSumPension(null);
    }
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return '---';
    return `TZS ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">{t.eligibility.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {t.eligibility.conditions.map((cond, i) => <li key={i}>{cond}</li>)}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">{t.calculator.step1.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hired-date" className="font-semibold">{t.calculator.step1.hiredDate}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !hiredDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {hiredDate ? format(hiredDate, "PPP") : <span>{t.calculator.step1.pickDate}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={hiredDate}
                    onSelect={setHiredDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="retirement-date" className="font-semibold">{t.calculator.step1.retirementDate}</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !retirementDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {retirementDate ? format(retirementDate, "PPP") : <span>{t.calculator.step1.pickDate}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={retirementDate}
                    onSelect={setRetirementDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {monthsOfService > 0 && (
            <Alert variant={monthsOfService >= MIN_MONTHS ? "default" : "destructive"}>
              {monthsOfService >= MIN_MONTHS ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <AlertTitle>{t.calculator.step1.serviceDurationTitle}</AlertTitle>
              <AlertDescription>
                {t.calculator.step1.serviceDurationText(monthsOfService)}
                {monthsOfService < MIN_MONTHS && ` (${t.calculator.errors.notEnoughMonths})`}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">{t.calculator.step2.title}</CardTitle>
          <CardDescription>{t.calculator.step2.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center space-x-2 mb-4">
                <Label htmlFor="input-mode">{t.calculator.step2.multilineMode}</Label>
                <Switch
                    id="input-mode"
                    checked={salaryInputMode === 'multiline'}
                    onCheckedChange={(checked) => setSalaryInputMode(checked ? 'multiline' : 'table')}
                />
                <Label htmlFor="input-mode">{t.calculator.step2.tableMode}</Label>
            </div>
             <p className="text-sm text-muted-foreground mb-4">{t.calculator.step2.progress(enteredSalariesCount)}</p>
            {salaryInputMode === 'table' ? (
                <ScrollArea className="h-72 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
                        {salaries.map((_, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Label className="w-8 text-right">{index + 1}.</Label>
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder={t.calculator.step2.salaryPlaceholder}
                                    value={salaries[index]?.toLocaleString('en-US') || ''}
                                    onChange={(e) => handleSalaryChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <Textarea
                    placeholder={t.calculator.step2.multilinePlaceholder}
                    className="h-72"
                    value={multilineSalaryText}
                    onChange={(e) => handleMultilineSalaryChange(e.target.value)}
                />
            )}
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-primary/20">
          <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">{t.calculator.step3.title}</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <span className="font-semibold">{t.calculator.step3.apeLabel}</span>
                  <span className={`font-bold text-2xl ${ape !== null ? 'text-primary' : 'text-muted-foreground'}`}>{formatCurrency(ape)}</span>
              </div>
          </CardContent>
      </Card>

      <Card className="shadow-lg border-primary/20">
          <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">{t.calculator.step4.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" onClick={() => calculatePensions('lump')} disabled={ape === null || monthsOfService < MIN_MONTHS}>
                    {t.calculator.step4.calculateLumpSum}
                </Button>
                <Button size="lg" onClick={() => calculatePensions('monthly')} disabled={ape === null || monthsOfService < MIN_MONTHS}>
                    {t.calculator.step4.calculateMonthly}
                </Button>
              </div>
              
              {(lumpSumPension !== null || monthlyPension !== null) && (
                <div className="space-y-4">
                    {lumpSumPension !== null && (
                        <Alert variant="default" className="bg-primary/10 border-primary/30">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <AlertTitle className="font-semibold text-primary">{t.calculator.step4.lumpSumResultTitle}</AlertTitle>
                            <AlertDescription className="text-xl font-bold text-primary">{formatCurrency(lumpSumPension)}</AlertDescription>
                        </Alert>
                    )}
                    {monthlyPension !== null && (
                        <Alert variant="default" className="bg-primary/10 border-primary/30">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <AlertTitle className="font-semibold text-primary">{t.calculator.step4.monthlyResultTitle}</AlertTitle>
                            <AlertDescription className="text-xl font-bold text-primary">{formatCurrency(monthlyPension)}</AlertDescription>
                        </Alert>
                    )}
                </div>
              )}
          </CardContent>
      </Card>

      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">{t.explanation.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {t.explanation.items.map((item, index) => (
               <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left"><Info className="mr-2 h-4 w-4 text-accent shrink-0"/>{item.title}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

    </div>
  );
}

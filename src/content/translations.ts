export const translations = {
  en: {
    appName: "Kikokotoo",
    title: "Old Age / Retirement Pension Benefits Calculator",
    tagline: "Plan your future with confidence. Get an estimate of your pension benefits in minutes.",
    startCalculation: "Start Pension Calculation",
    
    eligibility: {
      title: "Eligibility Conditions",
      conditions: [
        "You must have contributed at least 180 months (15 years).",
        "You must have attained the official retirement age.",
      ],
    },
    
    calculator: {
      step1: {
        title: "Step 1: Basic Inputs",
        hiredDate: "Hired Date",
        retirementDate: "Retirement Date",
        pickDate: "Pick a date",
        serviceDurationTitle: "Months of Service",
        serviceDurationText: (months: number) => `You have ${months} months of service.`,
      },
      step2: {
        title: "Step 2: Best 36 Monthly Salaries",
        description: "Enter your 36 highest monthly salaries from your employment history.",
        tableMode: "Structured Table Input",
        multilineMode: "Advanced Multiline Input",
        progress: (count: number) => `You've entered ${count} of 36 salaries.`,
        salaryPlaceholder: "e.g., 1,500,000",
        multilinePlaceholder: "Paste 36 salaries here, one per line...",
      },
      step3: {
        title: "Step 3: Annual Pensionable Emoluments (APE)",
        apeLabel: "Your Calculated APE is:",
      },
      step4: {
        title: "Step 4: Calculate Your Pension",
        calculateLumpSum: "Calculate Lump Sum Pension (CP)",
        calculateMonthly: "Calculate Monthly Pension",
        lumpSumResultTitle: "Your Estimated Lump Sum Pension (CP) is:",
        monthlyResultTitle: "Your Estimated Monthly Pension is:",
      },
      errors: {
        calculationErrorTitle: "Calculation Error",
        incompleteData: "Please ensure you have at least 180 months of service and all 36 salaries are entered to calculate.",
        notEnoughMonths: "This is below the required 180 months.",
      },
    },

    explanation: {
      title: "Understanding The Numbers",
      items: [
        {
          title: "What is 'Annual Pensionable Emoluments' (APE)?",
          content: "APE is your average annual salary based on your best 36 monthly salaries. It's calculated as: (Sum of your 36 best salaries ÷ 36) × 12. This figure is a key factor in determining your final pension amount.",
        },
        {
          title: "What does 'Months of Service' mean?",
          content: "This is the total number of months you have made contributions to your pension fund throughout your employment. A minimum of 180 months (15 years) is typically required to be eligible for pension benefits.",
        },
        {
          title: "Where do the formula constants (1/580, 0.33, 0.67, 12.5) come from?",
          content: "These are standard factors used in many pension calculation formulas. The '1/580' is an accrual rate. The '0.33' (33%) and '0.67' (67%) represent the split between taking a portion as a one-time lump sum versus a recurring monthly pension. The '12.5' is a commutation factor used to calculate the lump sum amount. These values are set by pension regulations and may vary between different funds.",
        },
      ]
    },

    footer: {
      disclaimerTitle: "Disclaimer",
      disclaimerText: "This calculator is for estimation purposes only and should not be considered financial advice. Please confirm all details and figures with your official pension fund for accurate information.",
      contactInfo: "For official inquiries, contact your pension fund provider directly.",
    },
  },
  sw: {
    appName: "Kikokotoo",
    title: "Kikokotoo cha Mafao ya Pensheni ya Uzeeni / Kustaafu",
    tagline: "Panga maisha yako ya usoni kwa uhakika. Pata makadirio ya mafao yako ya pensheni ndani ya dakika chache.",
    startCalculation: "Anza Kuhesabu Pensheni",
    
    eligibility: {
      title: "Vigezo na Masharti",
      conditions: [
        "Unapaswa kuwa umechangia kwa angalau miezi 180 (miaka 15).",
        "Lazima uwe umefikia umri rasmi wa kustaafu.",
      ],
    },
    
    calculator: {
      step1: {
        title: "Hatua ya 1: Taarifa za Msingi",
        hiredDate: "Tarehe ya Kuajiriwa",
        retirementDate: "Tarehe ya Kustaafu",
        pickDate: "Chagua tarehe",
        serviceDurationTitle: "Muda wa Utumishi (Miezi)",
        serviceDurationText: (months: number) => `Una miezi ${months} ya utumishi.`,
      },
      step2: {
        title: "Hatua ya 2: Mishahara Bora ya Miezi 36",
        description: "Weka mishahara yako 36 ya juu zaidi ya kila mwezi kutoka kwenye historia yako ya ajira.",
        tableMode: "Jedwali la Mishahara",
        multilineMode: "Uingizaji wa Mistari Mingi",
        progress: (count: number) => `Umeingiza mishahara ${count} kati ya 36.`,
        salaryPlaceholder: "k.m., 1,500,000",
        multilinePlaceholder: "Bandika mishahara 36 hapa, mmoja kwa kila mstari...",
      },
      step3: {
        title: "Hatua ya 3: Mapato ya Mwaka ya Pensheni (APE)",
        apeLabel: "APE yako iliyokokotolewa ni:",
      },
      step4: {
        title: "Hatua ya 4: Kokotoa Pensheni Yako",
        calculateLumpSum: "Hesabu Pensheni ya Mkupuo (CP)",
        calculateMonthly: "Hesabu Pensheni ya Kila Mwezi",
        lumpSumResultTitle: "Makadirio ya Pensheni yako ya Mkupuo (CP) ni:",
        monthlyResultTitle: "Makadirio ya Pensheni yako ya Kila Mwezi ni:",
      },
      errors: {
        calculationErrorTitle: "Kosa la Ukokotoaji",
        incompleteData: "Tafadhali hakikisha una angalau miezi 180 ya utumishi na mishahara yote 36 imeingizwa ili kuweza kukokotoa.",
        notEnoughMonths: "Huu ni chini ya kiwango kinachohitajika cha miezi 180.",
      },
    },

    explanation: {
      title: "Kuelewa Namba",
      items: [
        {
          title: "Mapato ya Mwaka ya Pensheni (APE) ni nini?",
          content: "APE ni wastani wa mshahara wako wa mwaka unaotokana na mishahara yako bora 36 ya kila mwezi. Inakokotolewa hivi: (Jumla ya mishahara yako bora 36 ÷ 36) × 12. Namba hii ni kipengele muhimu katika kubainisha kiasi chako cha mwisho cha pensheni.",
        },
        {
          title: "Nini maana ya 'Muda wa Utumishi'?",
          content: "Hii ni jumla ya idadi ya miezi ambayo umechania kwenye mfuko wako wa pensheni katika kipindi chote cha ajira yako. Kiwango cha chini cha miezi 180 (miaka 15) huhitajika ili kustahili kupata mafao ya pensheni.",
        },
        {
          title: "Viwango vya kanuni (1/580, 0.33, 0.67, 12.5) vinatoka wapi?",
          content: "Hivi ni vigezo vya kawaida vinavyotumika katika kanuni nyingi za kukokotoa pensheni. '1/580' ni kiwango cha mkusanyiko. '0.33' (33%) na '0.67' (67%) zinawakilisha mgawanyo kati ya kuchukua sehemu kama mkupuo wa mara moja dhidi ya pensheni ya kila mwezi. '12.5' ni kigezo cha ubadilishaji kinachotumika kukokotoa kiasi cha mkupuo. Thamani hizi huwekwa na kanuni za pensheni na zinaweza kutofautiana kati ya mifuko tofauti.",
        },
      ]
    },

    footer: {
      disclaimerTitle: "Kanusho",
      disclaimerText: "Kikokotoo hiki ni kwa ajili ya makadirio tu na hakipaswi kuchukuliwa kama ushauri wa kifedha. Tafadhali thibitisha maelezo na takwimu zote na mfuko wako rasmi wa pensheni kwa taarifa sahihi.",
      contactInfo: "Kwa maswali rasmi, wasiliana na mtoa huduma wako wa mfuko wa pensheni moja kwa moja.",
    },
  },
};

export type Translations = typeof translations;

import type { Metadata } from "next";
import { InvestmentHub } from "@/components/investment/investment-hub";

export const metadata: Metadata = {
  title: "Investiții în Afaceri Românești | Transparență & Micro-Capital Crutsanimia",
  description:
    "Platformă de micro-capital și investiții locale în România, cu transparență, verificare fiscală și oportunități de finanțare pentru afaceri autohtone.",
  openGraph: {
    title: "Investiții în Afaceri Românești | Transparență & Micro-Capital Crutsanimia",
    description:
      "Fără tepe, fără anonimat. Verificare fiscală, criterii clare și finanțare pentru afaceri românești.",
    type: "website",
  },
};

export default function InvestmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "Crutsanimia Investment Hub",
        url: "https://crutsanimia-ron.vercel.app/investment",
        description:
          "Platformă de micro-capital și investiții în afaceri românești, cu verificare fiscală și transparență.",
        areaServed: "Romania",
        category: "Investment",
      },
      {
        "@type": "InvestmentFund",
        name: "Crutsanimia Micro-Capital",
        description:
          "Fund de micro-investiții axat pe afaceri locale, preluare la poartă și capital local transparent.",
        investmentType: "Private equity and venture",
        currency: "RON",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="space-y-6 pb-10 text-slate-100">
        <InvestmentHub />
      </main>
    </>
  );
}

import { Section } from "@/components/ui/section";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <Section
      title="Creează cont"
      description="Alege rolul: cetățean, antreprenor, producător sau transportator."
    >
      <SignupForm />
    </Section>
  );
}

import { Section } from "@/components/ui/section";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <Section
      title="Autentificare"
      description="Intră în contul crutsanimia-ron cu email și parolă."
    >
      <LoginForm />
    </Section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { submitLead } from "@/services/leads";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastro — Leão do E-commerce" },
      {
        name: "description",
        content: "Cadastre-se na comunidade premium de vendedores do Brasil.",
      },
    ],
  }),
  component: CadastroPage,
});

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .regex(/^[\d\s()+-]+$/, "Formato inválido"),
});

type FormData = z.infer<typeof schema>;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function LionMark() {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div
        className="absolute inset-0 border-2 border-gold/70 rounded-sm"
        style={{ transform: "rotate(10deg)" }}
      />
      <span className="relative font-display font-black text-gold text-lg leading-none">L</span>
    </div>
  );
}

function CadastroPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setApiError(null);
    try {
      await submitLead({ data });
      setIsSuccess(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Erro inesperado. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-onyx text-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-onyx/80 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3">
          <LionMark />
          <span className="font-display font-black text-sm tracking-widest uppercase text-white/90">
            Leão do E-commerce
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-bold uppercase tracking-wider text-white/50 hover:text-gold transition"
        >
          ← Voltar
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <div
          className="w-full max-w-md animate-[fade-up_0.6s_ease_forwards]"
          style={{ opacity: 0 }}
        >
          {isSuccess ? (
            <SuccessState />
          ) : (
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 sm:p-10">
              {/* Header */}
              <div className="mb-8 text-center">
                <p className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase mb-3">
                  Comunidade Exclusiva
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Cadastre-se <span className="text-gold italic">agora</span>
                </h1>
                <p className="mt-3 text-white/50 text-sm">
                  Preencha os dados abaixo e entraremos em contato em breve.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="nome"
                    className="text-white/70 text-xs uppercase tracking-wider font-bold"
                  >
                    Nome completo
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome"
                    autoComplete="name"
                    {...register("nome")}
                    className={cn(
                      "bg-white/[0.04] border-white/10 text-white placeholder:text-white/25 focus-visible:ring-gold/50 focus-visible:border-gold/40 h-11",
                      errors.nome && "border-red-500/60",
                    )}
                  />
                  {errors.nome && (
                    <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-white/70 text-xs uppercase tracking-wider font-bold"
                  >
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    {...register("email")}
                    className={cn(
                      "bg-white/[0.04] border-white/10 text-white placeholder:text-white/25 focus-visible:ring-gold/50 focus-visible:border-gold/40 h-11",
                      errors.email && "border-red-500/60",
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="telefone"
                    className="text-white/70 text-xs uppercase tracking-wider font-bold"
                  >
                    Telefone
                  </Label>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="telefone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        autoComplete="tel"
                        onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        className={cn(
                          "bg-white/[0.04] border-white/10 text-white placeholder:text-white/25 focus-visible:ring-gold/50 focus-visible:border-gold/40 h-11",
                          errors.telefone && "border-red-500/60",
                        )}
                      />
                    )}
                  />
                  {errors.telefone && (
                    <p className="text-red-400 text-xs mt-1">{errors.telefone.message}</p>
                  )}
                </div>

                {apiError && <p className="text-red-400 text-sm text-center">{apiError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 px-7 py-4 bg-gold text-onyx font-bold rounded-sm uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Quero Entrar"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 sm:p-10 text-center">
      <div className="mx-auto mb-6 w-16 h-16 rounded-full border-2 border-gold/50 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.25)]">
        <svg
          className="w-8 h-8 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
        Cadastro <span className="text-gold italic">realizado!</span>
      </h2>
      <p className="text-white/60 text-sm leading-relaxed mb-8">
        Cadastro realizado com sucesso!
        <br />
        Em breve entraremos em contato.
      </p>
      <Link
        to="/"
        className="inline-block px-7 py-4 bg-gold text-onyx font-bold rounded-sm uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] transition"
      >
        Voltar ao início
      </Link>
    </div>
  );
}

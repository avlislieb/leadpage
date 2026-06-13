import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-jungle.jpg";
import watchImg from "@/assets/product-watch.jpg";
import headphonesImg from "@/assets/product-headphones.jpg";
import phoneImg from "@/assets/product-phone.jpg";
import controllerImg from "@/assets/product-controller.jpg";
import lesson1 from "@/assets/lesson-1.jpg";
import lesson2 from "@/assets/lesson-2.jpg";
import lesson3 from "@/assets/lesson-3.jpg";
import lesson4 from "@/assets/lesson-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leão do E-commerce — Aprenda. Aplique. Venda. Escale." },
      {
        name: "description",
        content:
          "Comunidade premium para vendedores de Mercado Livre, Shopee e TikTok Shop. Catálogo de produtos validados, mentoria e logística completa.",
      },
      { property: "og:title", content: "Leão do E-commerce" },
      {
        property: "og:description",
        content:
          "Aprenda. Aplique. Venda. Escale. Plataforma completa de produtos, aulas e logística.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const COMMUNITY_LINK = "https://wa.me/message/3DW6WSW3AVNYE1";

const PRODUCTS = [
  {
    id: 1,
    name: "Titan Gold Series v4",
    category: "Smartwatches",
    img: watchImg,
    buy: 89.9,
    sell: 199,
    stock: 142,
    link: COMMUNITY_LINK,
  },
  {
    id: 2,
    name: "Blackout Pods Pro",
    category: "Áudio",
    img: headphonesImg,
    buy: 45,
    sell: 129.9,
    stock: 320,
    link: COMMUNITY_LINK,
  },
  {
    id: 3,
    name: "Onyx Phone Slim",
    category: "Eletrônicos",
    img: phoneImg,
    buy: 320,
    sell: 599,
    stock: 64,
    link: COMMUNITY_LINK,
  },
  {
    id: 4,
    name: "Gold Pad Controller",
    category: "Games",
    img: controllerImg,
    buy: 75,
    sell: 169.9,
    stock: 88,
    link: COMMUNITY_LINK,
  },
];

const CATEGORIES = [
  "Todos",
  "Eletrônicos",
  "Smartwatches",
  "Áudio",
  "Games",
  "Casa Inteligente",
];

const LESSONS = [
  { title: "Primeira Venda em 24h", duration: "12 min", img: lesson1 },
  { title: "Domine o Mercado Livre", duration: "28 min", img: lesson2 },
  { title: "Logística para Escalar", duration: "18 min", img: lesson3 },
  { title: "TikTok Shop do Zero", duration: "22 min", img: lesson4 },
];

const TESTIMONIALS = [
  {
    name: "Lucas Andrade",
    result: "R$ 38k em 30 dias",
    text: "Saí de zero pra vender 5 mil reais por dia no Mercado Livre. A logística do Leão é absurda.",
  },
  {
    name: "Camila Rocha",
    result: "+220 pedidos/semana",
    text: "Encontrei produtos validados que ninguém estava vendendo. Margem dobrou no primeiro mês.",
  },
  {
    name: "Rafael Tavares",
    result: "Escalou pra R$ 100k/mês",
    text: "O suporte e as aulas são de outro nível. Tudo é direto ao ponto, sem enrolação.",
  },
];

function useCounter(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.floor(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return { value, ref };
}

function Counter({ to, prefix = "+", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const { value, ref } = useCounter(to);
  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

function Index() {
  const [activeCat, setActiveCat] = useState("Todos");
  const filtered =
    activeCat === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCat);

  return (
    <div className="bg-onyx text-white font-body selection:bg-gold/30">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Outfit:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-onyx/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <LionMark />
            <span className="font-display font-extrabold tracking-tight text-sm sm:text-base">
              LEÃO <span className="text-gold">DO E-COMMERCE</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest text-white/60 font-medium">
            <a href="#sobre" className="hover:text-gold transition">Sobre</a>
            <a href="#catalogo" className="hover:text-gold transition">Catálogo</a>
            <a href="#aulas" className="hover:text-gold transition">Aulas</a>
            <a href="#logistica" className="hover:text-gold transition">Logística</a>
          </div>
          <a
            href="#cta"
            className="hidden sm:inline-flex px-4 py-2 bg-gold text-onyx text-xs font-bold uppercase tracking-wider rounded-sm hover:brightness-110 transition"
          >
            Entrar
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex flex-col justify-end px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Selva premium com produtos de e-commerce e silhueta de leão"
            className="w-full h-full object-cover"
            width={1080}
            height={1536}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/70 to-onyx/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full space-y-5 animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
          <div className="inline-block px-3 py-1 border border-gold/40 rounded-full bg-gold/10 backdrop-blur-sm">
            <span className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase">
              Liderança & Escala
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight leading-[0.9]">
            LEÃO DO
            <br />
            <span className="gold-shimmer-text">E-COMMERCE</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-snug max-w-md">
            Aprenda. Aplique. Venda. <span className="text-gold">Escale seu império digital.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <a
              href={COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 bg-gold text-onyx font-bold rounded-sm uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] transition text-center"
            >
              Entrar para a Comunidade
            </a>
            <a
              href="#catalogo"
              className="px-7 py-4 border border-white/20 text-white font-bold rounded-sm uppercase tracking-wider text-sm backdrop-blur-md hover:bg-white/5 transition text-center"
            >
              Ver Catálogo
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-16 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
          <span>Scroll</span>
          <div className="h-px w-12 bg-white/20" />
        </div>
      </header>

      {/* STATS / SOBRE */}
      <section id="sobre" className="border-y border-white/10 bg-onyx-soft">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { v: 500, label: "Produtos Validados" },
            { v: 100, label: "Alunos Ativos" },
            { v: 1000, label: "Pedidos Enviados" },
            { v: 1, label: "Milhão em Vendas", prefix: "+R$", suffix: "M" },
          ].map((s, i) => (
            <div
              key={i}
              className="p-8 text-center border-r last:border-r-0 border-white/5 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:last-child]:border-r-0"
            >
              <div className="font-display text-3xl sm:text-4xl font-extrabold gold-shimmer-text">
                <Counter to={s.v} prefix={s.prefix ?? "+"} suffix={s.suffix ?? ""} />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
            Quem Somos
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight">
            A maior comunidade <br />
            de <span className="text-gold italic">vendedores de elite</span> do Brasil.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            O Leão do E-commerce é uma comunidade criada para ajudar pessoas a começarem
            e escalarem suas vendas online através de produtos validados, fornecedores
            confiáveis, suporte logístico e aulas práticas.
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="px-6 py-24 bg-onyx-soft border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
              Como Funciona
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
              Quatro passos para <span className="text-gold italic">escalar</span>.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "01", t: "Escolha um Produto", d: "Selecione itens validados no nosso catálogo profissional." },
              { n: "02", t: "Anuncie", d: "Publique em Mercado Livre, Shopee, TikTok Shop." },
              { n: "03", t: "Venda", d: "Receba pedidos e nossa equipe é notificada automaticamente." },
              { n: "04", t: "Escale", d: "Use nossa estrutura logística para crescer sem limites." },
            ].map((s) => (
              <div
                key={s.n}
                className="group relative p-7 bg-onyx border border-white/10 rounded-lg hover:border-gold/40 transition overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 text-7xl font-display font-extrabold text-gold/5 group-hover:text-gold/15 transition">
                  {s.n}
                </div>
                <div className="relative">
                  <div className="text-gold text-xs font-bold tracking-widest mb-4">
                    PASSO {s.n}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{s.t}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
                Catálogo Profissional
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold mt-2">
                Oportunidades <span className="text-gold italic">da Semana</span>
              </h2>
            </div>
            <span className="text-xs text-white/40 font-mono">
              {filtered.length} produtos disponíveis
            </span>
          </div>

          {/* filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 -mx-6 px-6">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                  activeCat === c
                    ? "bg-gold text-onyx"
                    : "bg-white/5 border border-white/10 text-white/60 hover:border-gold/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((p) => {
              const profit = p.sell - p.buy;
              return (
                <div
                  key={p.id}
                  className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-gold/40 transition"
                >
                  <div className="aspect-square bg-onyx overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <span className="text-[10px] text-gold font-bold uppercase tracking-widest">
                        {p.category}
                      </span>
                      <h3 className="text-base font-bold mt-1">{p.name}</h3>
                      <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
                        Estoque: {p.stock} un.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 border-y border-white/5 py-3">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase">Compra</p>
                        <p className="font-bold text-sm">{fmtBRL(p.buy)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase">Sugestão</p>
                        <p className="font-bold text-sm text-emerald-400">{fmtBRL(p.sell)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-white/60">
                        Lucro: <span className="text-gold font-bold">{fmtBRL(profit)}</span>
                      </div>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-white text-onyx text-[10px] font-bold uppercase rounded-full hover:bg-gold transition"
                      >
                        Solicitar
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AULAS */}
      <section id="aulas" className="px-6 py-24 bg-onyx-soft border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
              Academia
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold mt-2">
              Aulas para vender <span className="text-gold italic">de verdade</span>.
            </h2>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4">
            {LESSONS.map((l, i) => (
              <div key={i} className="shrink-0 w-72 group cursor-pointer">
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group-hover:border-gold/40 transition">
                  <img
                    src={l.img}
                    alt={l.title}
                    loading="lazy"
                    width={896}
                    height={512}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                      Aula {String(i + 1).padStart(2, "0")} · {l.duration}
                    </span>
                    <div className="size-9 rounded-full bg-gold text-onyx flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 font-bold group-hover:text-gold transition">{l.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMUNIDADE */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
              Comunidade
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
              Você nunca está <span className="text-gold italic">sozinho</span>.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Acesso direto à mentoria, suporte ativo e uma rede de vendedores que
              compartilham resultados todos os dias.
            </p>
            <a
              href={COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-4 bg-gold text-onyx font-bold rounded-sm uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] transition"
            >
              Entrar para a Comunidade
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Grupo no WhatsApp",
              "Mentorias ao vivo",
              "Produtos exclusivos",
              "Suporte dedicado",
              "Atualizações semanais",
              "Networking de elite",
            ].map((b) => (
              <div
                key={b}
                className="p-5 bg-white/[0.03] border border-white/10 rounded-lg hover:border-gold/40 transition flex items-center gap-3"
              >
                <div className="size-2 rounded-full bg-gold shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                <span className="text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGÍSTICA */}
      <section id="logistica" className="bg-gold text-onyx rounded-t-[40px]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="space-y-3 mb-12">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
              Full-Commerce
            </span>
            <h2 className="font-display text-5xl sm:text-7xl font-extrabold uppercase leading-[0.9] italic">
              Você vende.
              <br />
              Nós enviamos.
            </h2>
            <p className="text-onyx/70 text-lg max-w-xl">
              Foque no marketing e no crescimento. Nossa estrutura cuida do resto.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { n: "01", t: "Venda", d: "Pedido entra no marketplace" },
              { n: "02", t: "Recebimento", d: "Integração automática" },
              { n: "03", t: "Separação", d: "Conferência rigorosa" },
              { n: "04", t: "Envio", d: "Coleta diária" },
              { n: "05", t: "Cliente", d: "Entrega rápida" },
            ].map((s, i) => (
              <div
                key={s.n}
                className="relative p-5 bg-onyx/5 border border-onyx/10 rounded-2xl"
              >
                <div className="size-9 bg-onyx text-gold flex items-center justify-center rounded-full font-bold text-sm">
                  {s.n}
                </div>
                <h4 className="font-bold text-base mt-4">{s.t}</h4>
                <p className="text-xs opacity-70 mt-1">{s.d}</p>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 text-onyx/30">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
              Resultados Reais
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
              Quem aplica, <span className="text-gold italic">vende</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-7 bg-white/[0.03] border border-white/10 rounded-xl space-y-5 hover:border-gold/40 transition"
              >
                <div className="text-gold text-3xl leading-none font-display">"</div>
                <p className="text-white/80 leading-relaxed">{t.text}</p>
                <div className="pt-5 border-t border-white/5 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-onyx font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-gold">{t.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" className="px-6 py-24 bg-onyx-soft border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-7">
          <LionMark className="mx-auto size-14" />
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold leading-tight">
            Pronto para se tornar <br />
            o <span className="gold-shimmer-text">leão</span> do seu mercado?
          </h2>
          <p className="text-white/60 text-lg">
            Entre para a comunidade hoje e tenha acesso a tudo que precisa para
            escalar suas vendas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
            <a
              href={COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gold text-onyx font-bold rounded-sm uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition"
            >
              Entrar para a Comunidade
            </a>
            <a
              href="#catalogo"
              className="px-8 py-4 border border-white/20 text-white font-bold rounded-sm uppercase tracking-wider text-sm hover:bg-white/5 transition"
            >
              Ver Catálogo
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <LionMark />
                <span className="font-display font-extrabold tracking-tight">
                  LEÃO <span className="text-gold">DO E-COMMERCE</span>
                </span>
              </div>
              <p className="text-sm text-white/40 max-w-xs">
                Plataforma premium de produtos, aulas e logística para vendedores
                de elite.
              </p>
            </div>
            <FooterCol title="Plataforma" links={["Catálogo", "Aulas", "Comunidade", "Logística"]} />
            <FooterCol title="Social" links={["Instagram", "YouTube", "WhatsApp", "TikTok"]} />
            <FooterCol title="Legal" links={["Termos de Uso", "Política de Privacidade", "Suporte"]} />
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-white/30 uppercase tracking-widest">
              © 2026 Leão do E-commerce. Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
              Made in Brasil 🦁
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-3">
      <h5 className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">{title}</h5>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-white/50 hover:text-gold transition">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LionMark({ className = "size-8" }: { className?: string }) {
  return (
    <div
      className={`${className} relative flex items-center justify-center border border-gold/40 rounded-sm rotate-45 bg-gold/10`}
    >
      <span className="font-display font-extrabold text-gold -rotate-45 text-xs">L</span>
    </div>
  );
}

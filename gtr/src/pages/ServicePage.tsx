import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Phone, MessageCircle, CheckCircle2, ChevronRight, ArrowRight, BadgeCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, SITE, PHONE, PHONE_LABEL, WHATSAPP } from "@/data/services";
import NotFound from "./NotFound";
import heroImage from "@/assets/hero-construction.jpg";

const steps = [
  ["Share your requirement", "Call, message or fill the form."],
  ["Site visit & estimate", "We review scope and send a clear quote."],
  ["Execution", "Trained team, safety checks and progress updates."],
  ["Handover", "Quality records and documented completion."],
];

const setMeta = (sel: string, make: () => HTMLElement, attr: string, val: string) => {
  let el = document.head.querySelector<HTMLElement>(sel);
  if (!el) { el = make(); document.head.appendChild(el); }
  el.setAttribute(attr, val);
};

const ServicePage = () => {
  const { slug } = useParams();
  const s = services.find((x) => x.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!s) return;
    const url = `${SITE}/services/${s.slug}`;
    document.title = s.metaTitle;
    setMeta('meta[name="description"]', () => Object.assign(document.createElement("meta"), { name: "description" }), "content", s.metaDesc);
    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", url);
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "ld-service";
    ld.text = JSON.stringify([
      { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.metaDesc, url,
        provider: { "@type": "GeneralContractor", name: "SRJ Construction", url: SITE, telephone: PHONE }, areaServed: "IN" },
      { "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ]);
    document.head.appendChild(ld);
    return () => { ld.remove(); };
  }, [s]);

  if (!s) return <NotFound />;
  const Icon = s.icon;
  const others = services.filter((x) => x.slug !== s.slug);
  const cta = "bg-accent text-black hover:bg-accent/90 font-semibold";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <section className="relative isolate overflow-hidden pt-28 pb-16 md:pb-20">
          <div className="absolute inset-0 -z-10">
            <img src={heroImage} alt="" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </div>
          <div className="container mx-auto px-4">
            <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-1 text-sm text-white/60">
                <Link to="/" className="hover:text-accent">Home</Link><ChevronRight className="w-4 h-4" />
                <Link to="/#services" className="hover:text-accent">Services</Link><ChevronRight className="w-4 h-4" />
                <span className="text-white">{s.title}</span>
            </nav>
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="max-w-3xl">
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white/80 backdrop-blur">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-black"><Icon className="h-4 w-4" /></span>
                  SRJ Construction <span className="text-accent">/</span> {s.title}
                </div>
                <h1 className="mb-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{s.title}<span className="text-accent">.</span></h1>
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{s.intro}</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className={`${cta} shadow-lg shadow-accent/20`} asChild><Link to={`/request-quote?service=${s.slug}`}>Discuss your project <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                  <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white hover:text-black" asChild>
                    <a href={`tel:${PHONE}`}><Phone className="mr-2 h-4 w-4" />Call {PHONE_LABEL}</a>
                  </Button>
                </div>
              </div>
              <aside className="rounded-2xl border border-white/15 bg-black/55 p-6 shadow-2xl backdrop-blur-md">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">A clear path forward</p>
                <h2 className="mb-2 text-xl font-semibold">Let’s plan your next project.</h2>
                <p className="mb-5 text-sm leading-relaxed text-white/65">Share your scope with our team. We’ll help you understand the next steps and prepare a clear quote.</p>
                <Button className={`${cta} mb-3 w-full`} asChild><a href={WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />Chat on WhatsApp</a></Button>
                <p className="text-center text-xs text-white/50">Mon–Sat · 9:30 AM–6:30 PM</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">What we do</p><h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Expertise built around your needs</h2></div>
              <p className="max-w-md text-white/60">From the first conversation through delivery, every detail has a clear purpose.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {s.offers.map((o, i) => (
                <article key={o.t} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.06]">
                  <div className="mb-8 flex items-center justify-between"><span className="text-sm font-medium tracking-widest text-accent">0{i + 1}</span><ArrowRight className="h-4 w-4 text-white/35 transition group-hover:-rotate-45 group-hover:text-accent" /></div>
                  <h3 className="mb-2 text-lg font-semibold">{o.t}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{o.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.035] py-16 md:py-20">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">The SRJ difference</p>
              <h2 className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl">Built on trust.<br />Delivered with care.</h2>
              <ul className="space-y-4">
                {s.why.map((w) => (<li key={w} className="flex gap-3 text-base text-white/80"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{w}</li>))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Our process</p>
              <h2 className="mb-8 text-3xl font-semibold tracking-tight md:text-4xl">A straightforward way to get started</h2>
              <ol className="space-y-0">
                {steps.map(([t, d], i) => (
                  <li key={t} className="flex gap-4 border-l border-white/15 pb-6 pl-5 last:border-transparent last:pb-0">
                    <span className="-ml-[1.65rem] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-black text-xs font-semibold text-accent">0{i + 1}</span>
                    <div className="-mt-1"><h3 className="text-base font-semibold">{t}</h3><p className="mt-1 text-sm text-white/60">{d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-accent">Good to know</p>
            <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight md:text-4xl">Frequently asked questions</h2>
            <Accordion type="single" collapsible>
              {s.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`f${i}`} className="border-white/20">
                  <AccordionTrigger className="text-left text-lg hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-white/75 text-base">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-10 text-black md:px-12 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[1px] border-black/10" />
            <div>
              <h2 className="mb-2 text-2xl font-semibold md:text-3xl">Ready to start your {s.title.toLowerCase()} project?</h2>
              <p className="text-black/70">Tell us what you need. We’ll help you take the next step.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-black text-white hover:bg-black/85" asChild><Link to={`/request-quote?service=${s.slug}`}>Request a quote</Link></Button>
              <Button size="lg" variant="outline" className="border-black bg-transparent text-black hover:bg-black hover:text-white" asChild><a href={`tel:${PHONE}`}>Call now</a></Button>
            </div>
          </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-2xl font-semibold">Explore our other services</h2>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link key={o.slug} to={`/services/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 hover:border-accent hover:text-accent transition-colors">
                  {o.title}<ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicePage;

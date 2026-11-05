import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CaretDownIcon, GooglePlayLogoIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { BETA, EMAIL, GROUP_URL, PLAY_URL, TESTING_URL } from "./links";

export const metadata: Metadata = {
  title: "One Dialer · Phone & call blocker for Android",
  description: "Fast T9 dialer with call blocking, dual SIM and a frosted glass design. Now in closed beta on Google Play.",
  icons: { icon: "/one-dialer/icon.png", apple: "/one-dialer/icon.png" },
  openGraph: {
    title: "One Dialer",
    description: "Fast T9 dialer with call blocking, dual SIM and a frosted glass design.",
    images: ["/one-dialer/og.png"],
  },
};

// Captions and lines from the Play listing (D:\dialer\docs\store-listing.md), in its screenshot order.
const FEATURES = [
  { img: "01-glass-design", title: "Glass design, your way", text: "A soft dark edge glow or a liquid glass style for the nav bar, buttons and menus." },
  { img: "02-incoming-call", title: "A call screen that looks good", text: "Full screen, tinted by the caller. Answer or decline right from the lock screen." },
  { img: "03-in-call", title: "Big, clear call controls", text: "Large buttons for speaker, mute, keypad and hold, with smooth spring motion." },
  { img: "04-t9-dialer", title: "Smart T9 dialer", text: "Type a few digits and it finds the contact by name or number." },
  { img: "05-contacts", title: "Contacts with an A–Z index", text: "Favourites, merge duplicates, import vCard and SIM contacts." },
  { img: "06-call-blocking", title: "Block private and unknown callers", text: "Rules that work before your phone even rings, plus the phone's own block list." },
  { img: "07-dual-sim", title: "Dual SIM per contact", text: "Pick a SIM for every contact, set a default, or be asked every time." },
  { img: "08-make-it-yours", title: "Make it yours", text: "Glass style, glow strength and a Reduce visual effects setting for older phones." },
];

const FAQ = [
  {
    q: "Why a closed beta?",
    a: "Google Play asks new apps to be tested by a group of people before they go public. Joining helps One Dialer get there, and you get every update first.",
  },
  {
    q: "The Play link says the app isn't available.",
    a: "Make sure you joined the Google Group with the same Google account that's signed in on your phone's Play Store. After joining, it can take a few minutes for the testing link to work.",
  },
  { q: "Which phones does it work on?", a: "Android 10 or newer. To make and receive calls, set One Dialer as your default phone app when it asks." },
  { q: "Is it free? Are there ads?", a: "It's free and has no ads." },
  {
    q: "Do my calls and contacts leave my phone?",
    a: "No. Your call history and contacts stay on your phone. The privacy policy below lists exactly what is sent, such as crash reports.",
  },
  { q: "I got One Dialer as an APK file.", a: "That copy isn't official: it won't get updates and may have been changed. Uninstall it, then join the beta here to get it from Google Play." },
  { q: "How do I leave the beta?", a: "Open the Google Play testing link and choose Leave the program, then uninstall the app if you like." },
];

function Pill({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex h-14 items-center gap-2.5 rounded-[var(--radius-pill)] px-7 text-[16px] font-semibold transition-[transform,background-color,box-shadow] active:scale-[0.97] ${
        primary
          ? "bg-[linear-gradient(180deg,#2fd57a,#00a84e)] text-black shadow-[0_10px_40px_rgb(0_192_90/0.35),inset_0_1px_0_rgb(255_255_255/0.35)] hover:shadow-[0_12px_50px_rgb(0_192_90/0.5),inset_0_1px_0_rgb(255_255_255/0.35)]"
          : "glass text-ink hover:bg-white/[0.08]"
      }`}
    >
      {children}
    </a>
  );
}

function Step({ n, title, text, note, href, cta, icon }: { n: number; title: string; text: string; note: string; href: string; cta: string; icon: React.ReactNode }) {
  return (
    <div className="glass-3d rim flex h-full flex-col rounded-[var(--radius-card)] p-7 sm:p-9">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-green/15 text-[18px] font-bold text-green">{n}</span>
      <h3 className="mt-6 text-[24px] font-bold tracking-[-0.03em]">{title}</h3>
      <p className="mt-2 text-[16.5px] leading-relaxed text-ink-2">{text}</p>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-3">{note}</p>
      <div className="mt-auto pt-8">
        <Pill href={href} primary={n === 1}>
          {icon}
          {cta}
          <ArrowUpRightIcon size={16} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Pill>
      </div>
    </div>
  );
}

export default function OneDialer() {
  return (
    <div className="relative isolate overflow-x-clip">
      {/* The call screen's aurora: violet and green, far behind everything. */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 -z-10 h-[900px] w-[1400px] -translate-x-1/2 bg-[radial-gradient(closest-side_at_68%_40%,rgb(120_60_200/0.30),transparent),radial-gradient(closest-side_at_30%_60%,rgb(0_192_90/0.16),transparent)]" />

      <header className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 pt-4 sm:px-8">
        <Link href="/one-dialer/" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.02em]">
          <Image src="/one-dialer/icon.png" alt="" width={34} height={34} className="rounded-[10px]" priority />
          One Dialer
          {BETA && <span className="rounded-full bg-green/15 px-2.5 py-1 text-[12px] font-semibold text-green">Closed beta</span>}
        </Link>
        <a href={BETA ? "#join" : PLAY_URL} className="glass hidden h-11 items-center rounded-[var(--radius-pill)] px-5 text-[15px] font-semibold sm:inline-flex">
          {BETA ? "Join the beta" : "Get it on Google Play"}
        </a>
      </header>

      <main>
        {/* Hero, not revealed so it shows before scripts run (the screenshots are framed on black: lighten blends that black into the aurora) */}
        <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-4 pt-14 pb-24 sm:px-8 md:grid-cols-12 md:pt-20">
          <div className="md:col-span-7">
            <h1 className="text-[clamp(2.9rem,6.4vw,5.6rem)] leading-[0.95] font-bold tracking-[-0.055em]">
              Your calls, in <span className="text-green">frosted glass.</span>
            </h1>
            <p className="mt-7 max-w-[34ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-snug text-ink-2">
              A fast, private phone app for Android: smart T9 dialer, call blocking and dual SIM, with a clean dark look and smooth spring motion.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {BETA ? (
                <>
                  <Pill href="#join" primary>
                    Join the beta <ArrowRightIcon size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                  </Pill>
                  <a href="#features" className="inline-flex h-14 items-center rounded-[var(--radius-pill)] px-6 text-[16px] font-semibold text-ink transition-colors hover:bg-white/[0.06]">
                    See what&apos;s inside
                  </a>
                </>
              ) : (
                <Pill href={PLAY_URL} primary>
                  <GooglePlayLogoIcon size={20} weight="fill" /> Get it on Google Play
                </Pill>
              )}
            </div>
            <p className="mt-6 text-[14px] text-ink-3">Free · No ads · Android 10+ · English and Italian</p>
          </div>
          <div className="md:col-span-5">
            <Image
              src="/one-dialer/screens/02-incoming-call.webp"
              alt="One Dialer's incoming call screen"
              width={1080}
              height={1920}
              priority
              className="mx-auto w-[min(78vw,380px)] mix-blend-lighten"
            />
          </div>
        </section>

        {/* Join */}
        {BETA && (
          <section id="join" className="mx-auto max-w-[1200px] scroll-mt-6 px-4 py-20 sm:px-8 md:py-28">
            <Reveal>
              <h2 className="text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.98] font-bold tracking-[-0.05em]">Join in two steps.</h2>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
                One Dialer is in closed testing on Google Play. Join the testers group, then install it from Play like any other app.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              <Reveal>
                <Step
                  n={1}
                  title="Join the Google Group"
                  text="Open the group and tap Join group. That puts your Google account on the testers list."
                  note="Use the same Google account that's signed in on your phone's Play Store."
                  href={GROUP_URL}
                  cta="Join the group"
                  icon={<UsersThreeIcon size={20} weight="fill" />}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Step
                  n={2}
                  title="Become a tester on Google Play"
                  text="Open the testing page, tap Become a tester, then Download it on Google Play and install."
                  note="After joining the group it can take a few minutes for this page to let you in."
                  href={TESTING_URL}
                  cta="Become a tester"
                  icon={<GooglePlayLogoIcon size={20} weight="fill" />}
                />
              </Reveal>
            </div>
            <Reveal>
              <p className="mt-8 rounded-[var(--radius-inner)] bg-card px-6 py-5 text-[15.5px] leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">Got One Dialer as an APK file?</span> Copies shared as files, or pulled out of a phone by
                another app, aren&apos;t official. They don&apos;t get updates and may have been changed. Uninstall it and join here instead.
              </p>
            </Reveal>
          </section>
        )}

        {/* Features */}
        <section id="features" className="py-20 md:py-28">
          <Reveal className="mx-auto max-w-[1200px] px-4 sm:px-8">
            <h2 className="text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.98] font-bold tracking-[-0.05em]">
              Everything a phone app <span className="text-ink-2">should be.</span>
            </h2>
          </Reveal>
          <div className="no-scrollbar mx-auto mt-12 flex max-w-[1200px] snap-x snap-mandatory gap-5 overflow-x-auto px-4 sm:px-8 md:grid md:snap-none md:grid-cols-4 md:overflow-visible">
            {FEATURES.map((f, i) => (
              <Reveal key={f.img} delay={(i % 4) * 0.06} className="w-[72vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none">
                <figure>
                  <Image src={`/one-dialer/screens/${f.img}.webp`} alt={f.title} width={1080} height={1920} className="w-full mix-blend-lighten" loading="lazy" />
                  {/* The screenshot carries its own title, so the caption is just the line under it. */}
                  <figcaption className="mt-3 px-1 text-[14.5px] leading-snug text-ink-2">{f.text}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.98] font-bold tracking-[-0.05em]">
              Questions, <span className="text-ink-2">answered.</span>
            </h2>
          </Reveal>
          <Reveal className="overflow-hidden rounded-[var(--radius-card)] bg-card lg:col-span-8">
            {FAQ.map((f, i) => (
              <details key={f.q} className={`group ${i ? "border-t border-white/[0.06]" : ""}`}>
                <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.02] sm:px-8 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-[17px] group-open:font-semibold">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.05] text-ink-2 transition-transform duration-300 group-open:rotate-180 group-open:bg-green/15 group-open:text-green">
                    <CaretDownIcon size={16} weight="bold" />
                  </span>
                </summary>
                <p className="max-w-[62ch] px-6 pb-6 text-[16px] leading-relaxed text-ink-2 sm:px-8">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] px-4 py-10 text-[14px] text-ink-3 sm:px-8">
        <span>© {new Date().getFullYear()} Syed Arham Raza</span>
        <nav className="flex gap-6">
          <Link href="/one-dialer/privacy/" className="hover:text-ink">
            Privacy policy
          </Link>
          <a href={`mailto:${EMAIL}?subject=One%20Dialer`} className="hover:text-ink">
            Contact
          </a>
        </nav>
      </footer>
    </div>
  );
}

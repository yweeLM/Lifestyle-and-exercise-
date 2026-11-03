import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Globe,
  Heart,
  Home,
  MessageCircle,
  Moon,
  Scale,
  ShieldCheck,
  Smartphone,
  Sun,
  Type,
  User,
} from 'lucide-react'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'

const QUIZ_URL = 'https://digitalsavvy.getformly.com/f/oHF55Q'

const reasons = [
  {
    icon: Home,
    title: 'You parent the way you were raised.',
    text: 'An analog childhood leans on structure and control. Your type shows where that clashes with your child.',
  },
  {
    icon: MessageCircle,
    title: 'Your child needs you for context.',
    text: 'Whether they come to you depends on your relationship, not on what you know.',
  },
  {
    icon: Scale,
    title: 'Rules should teach self-control.',
    text: 'Your type shows if your boundaries guide your child or only control them.',
  },
]

const worlds = [
  { label: 'Information', analog: 'Limited, from a few sources', digital: 'Gigabytes, from search and video' },
  { label: 'Talking', analog: 'Slower, face to face', digital: 'Instant, online' },
  { label: 'Technology', analog: 'Learned email as an adult', digital: 'Unlocks a phone at age 2' },
  { label: 'A long essay', analog: 'Typewriter, every letter by hand', digital: 'Speech-to-text, edits as they go' },
  { label: 'What they value', analog: 'Effort and the process', digital: 'Speed and ease' },
]

const moments = [
  {
    icon: Clock,
    title: 'Setting screen-time rules',
    text: 'Agree **limits together** in a family agreement.',
  },
  {
    icon: ShieldCheck,
    title: 'Keeping them safe online',
    text: 'Use **parental controls** without creating distrust.',
  },
  {
    icon: Heart,
    title: 'Talking about what they saw',
    text: '**Listen without judgment** so they keep sharing.',
  },
  {
    icon: Smartphone,
    title: 'When a rule gets broken',
    text: 'Respond **calmly** to teach accountability, even when they change admin settings.',
  },
]

function Bold({ text }: { text: string }) {
  const parts = text.split('**')
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <strong key={i} className="font-semibold text-foreground">{p}</strong> : p))}
    </>
  )
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const t = document.documentElement.dataset.theme
    if (t) return t === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* storage unavailable */
    }
  }, [dark])
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setDark((d) => !d)}
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  )
}

function IconBadge({ icon: Icon }: { icon: typeof Home }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-clay-bg text-clay">
      <Icon className="size-5" strokeWidth={1.75} />
    </span>
  )
}

function FlowNode({ icon: Icon, title, text, main }: { icon: typeof Home; title: string; text: string; main?: boolean }) {
  return (
    <div
      className={
        'flex flex-1 flex-col items-center rounded-[14px] border p-4 text-center ' +
        (main ? 'border-clay bg-clay-bg' : 'border-border bg-card')
      }
    >
      <Icon className={'mb-2 size-7 ' + (main ? 'text-clay' : 'text-muted-foreground')} strokeWidth={1.5} />
      <div className="font-semibold">{title}</div>
      <div className="text-[13px] text-muted-foreground">{text}</div>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center text-faint" aria-hidden>
      <ArrowRight className="hidden size-6 md:block" />
      <ArrowDown className="size-6 md:hidden" />
    </div>
  )
}

export default function App() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <header className="flex items-center justify-between gap-3 border-b border-border py-3 text-[13px] text-muted-foreground">
        <span>
          Digital Savvy Parenting · From Yetty Williams, family coach · For parents of children aged 5–18
        </span>
        <ThemeToggle />
      </header>

      {/* First screen */}
      <section className="grid gap-8 pt-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
        <Reveal>
          <h1>Knowing your parenting type helps you guide your child's digital life</h1>
          <div className="mt-6 flex flex-col items-start gap-3">
            <Button asChild size="lg">
              <a href={QUIZ_URL} target="_blank" rel="noopener">
                Take the parenting type quiz
                <ArrowUpRight className="size-5" />
              </a>
            </Button>
            <span className="text-[13px] text-muted-foreground">Opens on Formly</span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={0.08 * (i + 1)}>
              <Card className="flex gap-4 p-4">
                <IconBadge icon={r.icon} />
                <div>
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-muted-foreground">{r.text}</div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Two worlds */}
      <section className="mt-16">
        <Reveal>
          <h2 className="mb-4">You and your child grew up in different worlds</h2>
          <Card className="overflow-hidden p-0">
            <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border bg-muted text-sm sm:text-base">
              <div className="p-3 sm:p-4" />
              <div className="flex items-center gap-2 p-3 font-semibold sm:p-4">
                <Type className="hidden size-5 text-muted-foreground sm:block" strokeWidth={1.75} />
                Analog parent
              </div>
              <div className="flex items-center gap-2 p-3 font-semibold sm:p-4">
                <Smartphone className="hidden size-5 text-clay sm:block" strokeWidth={1.75} />
                Digital-native child
              </div>
            </div>
            {worlds.map((w, i) => (
              <div
                key={w.label}
                className={
                  'grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] text-sm sm:text-base ' +
                  (i < worlds.length - 1 ? 'border-b border-border' : '')
                }
              >
                <div className="p-3 text-[13px] font-medium text-muted-foreground sm:p-4">{w.label}</div>
                <div className="p-3 sm:p-4">{w.analog}</div>
                <div className="p-3 sm:p-4">{w.digital}</div>
              </div>
            ))}
          </Card>
        </Reveal>
      </section>

      {/* Context, not content */}
      <section className="mt-16">
        <Reveal>
          <h2 className="mb-4">Your child doesn't need you for content. They need you for context.</h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            <FlowNode icon={Globe} title="The internet" text="Google, YouTube, TikTok, Instagram, Snapchat" />
            <FlowArrow />
            <FlowNode icon={User} title="You" text="Help them make sense of what they see" main />
            <FlowArrow />
            <FlowNode icon={Heart} title="Your child" text="Knows what fits their values and what doesn't" />
          </div>
        </Reveal>
      </section>

      {/* Moments */}
      <section className="mt-16">
        <Reveal>
          <h2 className="mb-4">Your type shows up in 4 everyday moments</h2>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {moments.map((m, i) => (
            <Reveal key={m.title} delay={0.06 * i}>
              <Card className="flex h-full gap-4 p-4">
                <IconBadge icon={m.icon} />
                <div>
                  <div className="font-semibold">{m.title}</div>
                  <div className="text-muted-foreground">
                    <Bold text={m.text} />
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-border pt-4 text-[13px] text-muted-foreground">
        Based on <em>Digital Savvy Parenting</em> by Yetty Williams, family coach and therapist.
      </footer>
    </div>
  )
}

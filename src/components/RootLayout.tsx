'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { Logo, Logomark } from '@/components/Logo'
import { Offices } from '@/components/Offices'
import { SocialMedia } from '@/components/SocialMedia'

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  panelId,
  invert = false,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
}: {
  panelId: string
  invert?: boolean
  icon: React.ComponentType<{ className?: string }>
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement>
}) {
  let { logoHovered, setLogoHovered } = useContext(RootLayoutContext)!

  return (
    <Container className="px-0">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          className="group"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Logo
            className="w-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
            invert={invert}
            filled={logoHovered}
            isMenuExpanded={expanded}
          />
        </Link>
        <div className="flex items-center gap-x-8 ml-8">
          <Button href="/contact" invert={invert} className="hidden sm:block">
            Contact us
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-controls={panelId}
            className={clsx(
              'group -m-2.5 rounded-full p-2.5 transition hover:bg-neutral-950/10',
              invert ? 'hover:bg-white/10' : '',
            )}
            aria-label="Toggle navigation"
          >
            {Icon && (
              <Icon
                className={clsx(
                  'h-6 w-6',
                  invert
                    ? 'fill-white group-hover:fill-neutral-200'
                    : 'fill-neutral-950 group-hover:fill-neutral-700',
                )}
              />
            )}
          </button>
        </div>
      </div>
    </Container>
  )
}

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="even:mt-px sm:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({
  href,
  children,
  icon: Icon,
}: {
  href: string
  children: React.ReactNode
  icon?: React.ComponentType<React.ComponentProps<'svg'>>
}) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-neutral-950 px-6 py-12 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16 hover:bg-neutral-900 transition-colors duration-200"
    >
      <div className="flex items-center">
        {Icon && (
          <Icon className="h-8 w-8 text-emerald-500 mr-4" />
        )}
        <span>{children}</span>
      </div>
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function Navigation() {
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/products">Shop</NavigationItem>
        <NavigationItem href="/about">About Us</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/education">Get Your Card</NavigationItem>
        <NavigationItem href="/locations">Locations</NavigationItem>
      </NavigationRow>
    </nav>
  )
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  let panelId = useId()
  let [expanded, setExpanded] = useState(false)
  let openRef = useRef<React.ElementRef<'button'>>(null)
  let closeRef = useRef<React.ElementRef<'button'>>(null)
  let navRef = useRef<React.ElementRef<'div'>>(null)
  let shouldReduceMotion = useReducedMotion()
  let pathname = usePathname()
  let isHomePage = pathname === '/'

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('a')?.href === window.location.href
      ) {
        setExpanded(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      {/* Hero background image for home page only */}
      {isHomePage && (
        <div className="fixed inset-0 -z-30">
          <div className="absolute inset-0 z-10" style={{ 
            background: 'linear-gradient(to bottom, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.7) 10%, rgba(3, 7, 18, 0.3) 20%, transparent 30%)'
          }}></div>
          <img 
            src="/images/BotSciFarm_HighRes_37.JPG"
            alt="Premium cannabis plants" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <header className="relative z-40">
        <div
          className="absolute top-6 right-0 left-0 pt-8"
          aria-hidden={expanded ? 'true' : undefined}
          // @ts-ignore (https://github.com/facebook/react/issues/17157)
          inert={expanded ? '' : undefined}
        >
          <Header
            panelId={panelId}
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            invert={isHomePage}
            onToggle={() => {
              setExpanded((expanded) => !expanded)
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true }),
              )
            }}
          />
        </div>

        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? 'auto' : '0.5rem' }}
          className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
          aria-hidden={expanded ? undefined : 'true'}
          // @ts-ignore (https://github.com/facebook/react/issues/17157)
          inert={expanded ? undefined : ''}
        >
          <motion.div layout className="bg-neutral-800">
            <div ref={navRef} className="bg-neutral-950 pt-16 pb-16">
              <Header
                invert
                panelId={panelId}
                icon={XIcon}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((expanded) => !expanded)
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true }),
                  )
                }}
              />
            </div>
            <Navigation />
            <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
              <Container>
                <div className="grid grid-cols-1 gap-y-10 pt-10 pb-16 sm:grid-cols-2 sm:pt-16">
                  <div>
                    <h2 className="font-display text-base font-semibold text-white">
                      Our offices
                    </h2>
                    <Offices
                      invert
                      className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                    />
                  </div>
                  <div className="sm:border-l sm:border-transparent sm:pl-16">
                    <h2 className="font-display text-base font-semibold text-white">
                      Follow us
                    </h2>
                    <SocialMedia className="mt-6" invert />
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <motion.div
        layout
        style={isHomePage ? {} : { borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className={`relative flex flex-auto overflow-hidden ${isHomePage ? 'bg-transparent' : 'bg-white'} pt-36`}
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col"
        >
          {/* Interactive grid pattern - aligned with hero image */}
          {isHomePage && (
            <div className="absolute inset-x-0 top-0 -mt-[136px] left-0 right-0 -z-10">
              <GridPattern
                className="w-full h-screen fill-emerald-900/30 stroke-emerald-800/20 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
                yOffset={-96}
                interactive
              />
            </div>
          )}

          <main className="w-full flex-auto">{children}</main>

          <Footer />
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname}>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}

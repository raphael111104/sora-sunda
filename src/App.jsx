import { useMemo } from 'react'
import { useReducedMotion } from 'motion/react'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useAmbientAudio } from './hooks/useAmbientAudio'
import { assets } from './lib/assets'
import { navigationItems, sectionDividers } from './data/siteContent'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { BackToTop } from './components/BackToTop'
import { Hero } from './components/sections/Hero'
import { StoryIntro } from './components/sections/StoryIntro'
import { RumahAdat } from './components/sections/RumahAdat'
import { MusikTradisi } from './components/sections/MusikTradisi'
import { BusanaSunda } from './components/sections/BusanaSunda'
import { AlamSunda } from './components/sections/AlamSunda'
import { NilaiAdat } from './components/sections/NilaiAdat'
import { ClosingSection } from './components/sections/ClosingSection'
import { Footer } from './components/Footer'
import { SectionDivider } from './components/SectionDivider'

function App() {
  const reducedMotion = Boolean(useReducedMotion())
  const sectionIds = useMemo(() => navigationItems.map((item) => item.id), [])
  const activeSection = useScrollSpy(sectionIds)
  const audio = useAmbientAudio()

  useLenisScroll(reducedMotion)

  const handleNavigate = (id) => {
    const element = document.getElementById(id)
    if (!element) {
      return
    }

    element.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="relative overflow-x-clip bg-[var(--color-bg)] text-[var(--color-text)]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(179,149,87,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(46,62,45,0.28),transparent_22%),linear-gradient(180deg,rgba(4,5,4,0.1),rgba(4,5,4,0.82))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 50% 12%, rgba(206,180,123,0.08), transparent 26%), radial-gradient(circle at 15% 25%, rgba(127,150,106,0.06), transparent 20%), radial-gradient(circle at 75% 72%, rgba(164,126,84,0.08), transparent 24%)',
        }}
      />

      <Navbar
        activeSection={activeSection}
        isAudioActive={audio.isActive}
        items={navigationItems}
        onNavigate={handleNavigate}
        onToggleAudio={audio.toggle}
        reducedMotion={reducedMotion}
      />

      <ScrollProgress />
      <BackToTop reducedMotion={reducedMotion} />

      <main className="relative z-10">
        <Hero assets={assets} onNavigate={handleNavigate} reducedMotion={reducedMotion} />
        <SectionDivider {...sectionDividers[0]} />
        <StoryIntro assets={assets} reducedMotion={reducedMotion} />
        <SectionDivider {...sectionDividers[1]} />
        <RumahAdat assets={assets} reducedMotion={reducedMotion} />
        <SectionDivider {...sectionDividers[2]} />
        <MusikTradisi
          assets={assets}
          audio={audio}
          reducedMotion={reducedMotion}
        />
        <SectionDivider {...sectionDividers[3]} />
        <BusanaSunda assets={assets} reducedMotion={reducedMotion} />
        <SectionDivider {...sectionDividers[4]} />
        <AlamSunda assets={assets} reducedMotion={reducedMotion} />
        <SectionDivider {...sectionDividers[5]} />
        <NilaiAdat reducedMotion={reducedMotion} />
        <SectionDivider {...sectionDividers[6]} />
        <ClosingSection
          assets={assets}
          onNavigate={handleNavigate}
          reducedMotion={reducedMotion}
        />
      </main>

      <Footer items={navigationItems} onNavigate={handleNavigate} />
    </div>
  )
}

export default App

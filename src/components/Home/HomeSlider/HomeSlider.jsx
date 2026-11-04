import { Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules'
import './HomeSlider.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../context/StoreContext'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function HomeSlider() {
  const navigate = useNavigate()
  const { t } = useStore()

  const slides = [
    {
      img: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1200&auto=format&fit=crop',
      tag: t('hero.slide1Tag'),
      title: t('hero.slide1Title'),
      sub: t('hero.slide1Sub'),
      cta: t('hero.slide1Cta'),
      to: '/products?category=prebuilts',
      accent: '#2df8c5',
    },
    {
      img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop',
      tag: t('hero.slide2Tag'),
      title: t('hero.slide2Title'),
      sub: t('hero.slide2Sub'),
      cta: t('hero.slide2Cta'),
      to: '/products?category=mouses',
      accent: '#ff0055',
    },
    {
      img: 'https://images.unsplash.com/photo-1603481546238-487240415921?q=80&w=1200&auto=format&fit=crop',
      tag: t('hero.slide3Tag'),
      title: t('hero.slide3Title'),
      sub: t('hero.slide3Sub'),
      cta: t('hero.slide3Cta'),
      to: '/products',
      accent: '#7d2df8',
    },
  ]

  return (
    <div className="h-[340px] sm:h-[420px] md:h-[460px] lg:h-[520px] overflow-hidden group relative">
      <Swiper
        modules={[Pagination, A11y, Autoplay, EffectFade]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        effect="fade"
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="h-full w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            {({ isActive }) => (
              <div className="relative h-full w-full overflow-hidden">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms]"
                  style={{
                    backgroundImage: `url(${slide.img})`,
                    transform: isActive ? 'scale(1.06)' : 'scale(1)',
                  }}
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020509]/85 via-[#020509]/50 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020509]/60 to-transparent z-10" />

                {/* Accent line */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="absolute top-0 left-0 right-0 h-[2px] z-20"
                  style={{ background: slide.accent, boxShadow: `0 0 12px ${slide.accent}` }}
                />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-14 gap-4 max-w-2xl">
                  {/* Tag */}
                  <motion.div
                    custom={0}
                    variants={textVariants}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    className="flex items-center gap-2"
                  >
                    <span className="h-[2px] w-8" style={{ background: slide.accent }} />
                    <span
                      className="font-mono text-xs uppercase tracking-[0.3em] font-bold"
                      style={{ color: slide.accent }}
                    >
                      {slide.tag}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    custom={1}
                    variants={textVariants}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight whitespace-pre-line"
                  >
                    {slide.title}
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.p
                    custom={2}
                    variants={textVariants}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    className="text-slate-300 font-mono text-sm max-w-xs"
                  >
                    {slide.sub}
                  </motion.p>

                  {/* CTA */}
                  <motion.div
                    custom={3}
                    variants={textVariants}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    className="pt-2"
                  >
                    <button
                      onClick={() => navigate(slide.to)}
                      className="px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#050508] transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        background: slide.accent,
                        boxShadow: `0 0 20px ${slide.accent}60`,
                      }}
                    >
                      {slide.cta} →
                    </button>
                  </motion.div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

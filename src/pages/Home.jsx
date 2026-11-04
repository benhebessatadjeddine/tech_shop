import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import HomeMenu from "../components/Home/HomeMenu"
import HomeSlider from "../components/Home/HomeSlider/HomeSlider"
import SectionHeader from "../components/Home/SectionHeader"
import FlashSalesSlider from "../components/Home/FlashSalesSlider"
import SiteBtn from "../components/SiteBtn"
import CategoryItem from "../components/Home/CategoryItem"
import { HiOutlineComputerDesktop } from "react-icons/hi2"
import { BsMotherboard } from "react-icons/bs"
import { CiMonitor } from "react-icons/ci"
import { BsMouse } from "react-icons/bs"
import { CiHeadphones } from "react-icons/ci"
import { LuGamepad } from "react-icons/lu"
import ProductBox from "../components/Home/ProductBox"
import NewArrivalBox from "../components/Home/NewArrivalBox"
import OurServices from "../components/OurServices/OurServices"
import Floating3D from "../components/Home/Floating3D"
import { PRODUCTS } from "../data/products"
import { useStore } from "../context/StoreContext"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

const flashProductsIds = PRODUCTS.filter(p => p.offPercent).slice(0, 6).map(p => p.id)

const topGear = PRODUCTS
  .filter(p => !flashProductsIds.includes(p.id) && p.rating >= 4.8)
  .slice(0, 4)

const topGearIds = topGear.map(p => p.id)

const catalog = PRODUCTS
  .filter(p => !flashProductsIds.includes(p.id) && !topGearIds.includes(p.id))
  .slice(0, 8)

export default function Home() {
  const navigate = useNavigate()
  const { t, lang } = useStore()

  const cats = [
    { id: 'prebuilts',  Svg: HiOutlineComputerDesktop, name: t('categories.prebuilts') },
    { id: 'keyboards',  Svg: BsMotherboard,            name: t('categories.keyboards') },
    { id: 'mouses',     Svg: BsMouse,                  name: t('categories.mouses') },
    { id: 'headsets',   Svg: CiHeadphones,             name: t('categories.headsets') },
    { id: 'monitors',   Svg: CiMonitor,                name: t('categories.monitors') },
    { id: 'all',        Svg: LuGamepad,                name: lang === 'it' ? 'Altro...' : 'More...' },
  ]

  return (
    <div className="mt-5 space-y-28 pb-20 relative">

      {/* Ambient CSS orbs and 3D objects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden>
        <div className="orb-cyan   absolute top-[8%]  left-[18%]  w-[250px] md:w-[28vw] h-[250px] md:h-[28vw] bg-[#2df8c5]/8  rounded-full blur-[110px]" />
        <div className="orb-red    absolute bottom-[15%] right-[8%] w-[300px] md:w-[36vw] h-[300px] md:h-[36vw] bg-[#ff0055]/7  rounded-full blur-[130px]" />
        <div className="orb-purple absolute top-[55%] left-[50%] -translate-x-1/2 w-[350px] md:w-[42vw] h-[350px] md:h-[42vw] bg-[#7d2df8]/5 rounded-full blur-[160px]" />
        <Floating3D />
      </div>

      {/* ── Hero ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
        className="grid grid-cols-12 gap-6 relative"
      >
        <div className="hidden md:block md:col-span-3 relative z-50"><HomeMenu /></div>
        <div className="col-span-12 md:col-span-9 border border-[#2df8c5]/20 shadow-[0_0_30px_rgba(45,248,197,0.08)] overflow-hidden relative z-10">
          <HomeSlider />
        </div>
      </motion.div>

      {/* ── Flash Sales ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={fadeUp}
        className="glass-card p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#ff0055]/12 blur-[80px] rounded-full pointer-events-none" />
        <SectionHeader flagName={t('home.limitedTime')} title={t('home.flashDrops')} />
        <div className="mt-8"><FlashSalesSlider /></div>
        <div className="flex justify-center mt-4">
          <SiteBtn noMargin text={t('home.viewAllDeals')} to="/products" />
        </div>
      </motion.div>

      {/* ── Categories ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
        className="py-14 relative"
      >
        <div className="absolute inset-0 border-y border-[#2df8c5]/12 bg-gradient-to-r from-transparent via-[#2df8c5]/4 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <motion.div variants={fadeUp}>
            <SectionHeader flagName={t('home.arsenal')} title={t('home.browseUpgrades')} />
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-10">
            {cats.map(cat => (
              <motion.div key={cat.id} variants={fadeUp} className="hover-lift"
                onClick={() => navigate(cat.id === 'all' ? '/products' : `/products?category=${cat.id}`)}
              >
                <CategoryItem Svg={cat.Svg} name={cat.name} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Top Tier Gear ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.06 }} variants={stagger}>
        <motion.div variants={fadeUp}>
          <SectionHeader isNeedViewAllBtn title={t('home.topGear')} flagName={t('home.trending')} />
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {topGear.map(p => (
            <motion.div key={p.id} variants={fadeUp}>
              <ProductBox product={p} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Explore Components ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.04 }} variants={stagger}>
        <motion.div variants={fadeUp}>
          <SectionHeader flagName={t('home.inventory')} title={t('home.exploreComponents')} />
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {catalog.map(p => (
            <motion.div key={p.id} variants={fadeUp}>
              <ProductBox product={p} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <SiteBtn noMargin text={t('home.initFullCatalog')} to="/products" />
        </div>
      </motion.div>

      {/* ── Next Gen Tech ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.06 }} variants={fadeUp}
        className="glass border border-[#7d2df8]/20 p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#7d2df8]/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <SectionHeader flagName={t('home.featured')} title={t('home.nextGenTech')} />
        <div className="grid grid-cols-12 gap-5 mt-10">
          <div className="col-span-12 md:col-span-6 max-h-[460px] overflow-hidden border border-[#2df8c5]/20 bg-[#0c0f1a] cursor-pointer hover:border-[#2df8c5]/60 transition-colors"
            onClick={() => navigate('/products?category=prebuilts')}>
            <NewArrivalBox
              title={lang === 'it' ? "Preassemblati Quantici" : "Quantum Prebuilts"}
              desc={lang === 'it' ? "Rig 8K estremi. Rendering IA, raffreddamento custom loop." : "The ultimate 8K gaming rig. AI rendering, custom loop cooling."}
              imageUrl="/assets/images/ourproductsImages/gaming_laptop.png"
            />
          </div>
          <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-5 grid-rows-2 max-h-[460px]">
            <div className="col-span-2 overflow-hidden border border-[#ff0055]/20 bg-[#0c0f1a] cursor-pointer hover:border-[#ff0055]/60 transition-colors"
              onClick={() => navigate('/products?category=keyboards')}>
              <NewArrivalBox imageRight 
                title={lang === 'it' ? "Tastiere Custom" : "Custom Keyboards"} 
                desc={lang === 'it' ? "Gasket mount, hot-swap, polling 8K." : "Gasket mount, hot-swap, 8K polling."}
                imageUrl="/assets/images/flashsalesImages/Keyboard.png" />
            </div>
            <div className="overflow-hidden border border-[#7d2df8]/20 bg-[#0c0f1a] cursor-pointer hover:border-[#7d2df8]/60 transition-colors"
              onClick={() => navigate('/products?category=headsets')}>
              <NewArrivalBox 
                title={lang === 'it' ? "Audio Studio" : "Studio Audio"} 
                desc={lang === 'it' ? "Microfoni broadcast" : "Broadcast mics"} 
                imageUrl="/assets/images/newarrivalImages/Speakers.png" />
            </div>
            <div className="overflow-hidden border border-[#2df8c5]/20 bg-[#0c0f1a] cursor-pointer hover:border-[#2df8c5]/60 transition-colors"
              onClick={() => navigate('/products')}>
              <NewArrivalBox 
                title={lang === 'it' ? "RGB Sync" : "RGB Gear"} 
                desc={lang === 'it' ? "Sincronizza tutto" : "Sync everything"} 
                imageUrl="/assets/images/ourproductsImages/red_glow.png" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Services ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
        className="pt-12 border-t border-[#2df8c5]/12"
      >
        <OurServices />
      </motion.div>
    </div>
  )
}

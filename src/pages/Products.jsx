import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductBox from '../components/Home/ProductBox'
import SectionHeader from '../components/Home/SectionHeader'
import { FiSearch } from 'react-icons/fi'

const SORTS = [
  { label: 'Featured', value: 'default' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('category') || 'all'
  const initialSearch = searchParams.get('search') || ''

  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState(initialSearch)

  useEffect(() => {
    const urlCat = searchParams.get('category')
    const urlSearch = searchParams.get('search')
    if (urlCat) setActiveCategory(urlCat)
    if (urlSearch !== null) setSearch(urlSearch)
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = PRODUCTS
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, sort, search])

  const handleCategory = (id) => {
    setActiveCategory(id)
    setSearchParams(id === 'all' ? {} : { category: id })
  }

  return (
    <motion.div
      initial="hidden" animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      className="relative z-10 py-8 space-y-10"
    >
      <div className="orb-cyan fixed top-[10%] right-[5%] w-[28vw] h-[28vw] bg-[#2df8c5]/6 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div variants={fadeUp}>
        <SectionHeader flagName="Our Catalog" title="ALL PRODUCTS" />
      </motion.div>

      {/* Controls bar */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 justify-between">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#2df8c5] transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#0c0f1a] border border-[#2df8c5]/20 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#2df8c5]/60 transition-colors"
          />
        </div>
        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="bg-[#0c0f1a] border border-[#2df8c5]/20 text-slate-300 font-mono text-sm px-4 py-2.5 focus:outline-none focus:border-[#2df8c5]/60 transition-colors"
        >
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </motion.div>

      {/* Category tabs */}
      <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.id)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-[#2df8c5] text-black border-[#2df8c5] shadow-[0_0_15px_rgba(45,248,197,0.5)]'
                : 'border-[#2df8c5]/20 text-slate-400 hover:border-[#2df8c5]/50 hover:text-[#2df8c5]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Results count */}
      <motion.p variants={fadeUp} className="font-mono text-xs text-slate-500 uppercase tracking-widest">
        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
      </motion.p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <motion.div variants={fadeUp} className="py-24 text-center font-mono text-slate-500">
          <p className="text-lg">No products match your search.</p>
          <button onClick={() => { setSearch(''); setActiveCategory('all') }} className="mt-4 text-[#2df8c5] hover:text-white transition-colors text-sm">
            Clear filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              transition={{ delay: i * 0.04 }}
            >
              <ProductBox product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

import propTypes from 'prop-types'

export default function CategoryItem({ Svg, name }) {
  return (
    <div
      className='group cursor-pointer flex flex-col items-center justify-center gap-3 aspect-square w-full
        bg-[#0c0f1a] border border-[#2df8c5]/15
        transition-all duration-250
        hover:border-[#2df8c5]/70 hover:bg-[#0c0f1a] hover:shadow-[0_0_18px_rgba(45,248,197,0.18)]'
      style={{ willChange: 'border-color, box-shadow' }}
    >
      <Svg
        className='w-10 h-10 text-slate-500 group-hover:text-[#2df8c5] transition-colors duration-250'
        style={{ willChange: 'color' }}
      />
      <span className='font-mono text-xs tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors duration-250'>
        {name}
      </span>
    </div>
  )
}

CategoryItem.propTypes = {
  Svg: propTypes.func,
  name: propTypes.string
}
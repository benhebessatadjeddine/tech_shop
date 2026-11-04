import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'

export default function SectionHeader({ flagName, title, isNeedViewAllBtn, viewAllTo = '/products' }) {
    const { t } = useStore()

    return (
        <div className="flex justify-between items-end gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <span className="block w-[14px] h-9 bg-[#ff0055] shadow-[0_0_12px_rgba(255,0,85,0.7)]" />
                    <span className="text-[#ff0055] font-mono font-bold tracking-widest uppercase text-sm">{flagName}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight glitch-text" data-text={typeof title === 'string' ? title : ''}>
                    {title}
                </h2>
            </div>
            {isNeedViewAllBtn && (
                <Link to={viewAllTo} className="hidden sm:block cyber-btn px-5 py-2.5 text-xs whitespace-nowrap">
                    {t('home.viewAll')}
                </Link>
            )}
        </div>
    )
}

SectionHeader.propTypes = {
    flagName: propTypes.string,
    title: propTypes.oneOfType([propTypes.string, propTypes.node]),
    isNeedViewAllBtn: propTypes.bool,
    viewAllTo: propTypes.string,
}

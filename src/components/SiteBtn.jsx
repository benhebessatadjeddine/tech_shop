import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function SiteBtn({ text, to, onClick, type = 'button', noMargin }) {
  const cls = `inline-block w-full cyber-btn px-8 py-3.5 text-sm text-center ${!noMargin ? 'my-6' : ''}`

  if (to) return <Link to={to} className={cls}>{text}</Link>

  return (
    <button type={type} onClick={onClick} className={cls}>
      {text}
    </button>
  )
}

SiteBtn.propTypes = {
  text: propTypes.string,
  to: propTypes.string,
  onClick: propTypes.func,
  type: propTypes.string,
  noMargin: propTypes.bool,
}
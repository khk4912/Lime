import styles from './CustomVJSButton.module.css'

const VJSButtonStyle: React.CSSProperties = {
  content: '',
  inset: 0,
  display: 'block',
  borderRadius: '999px',
  background: 'var(--dim-200)',
  color: 'var(--light-overlay-70)',
  WebkitBackdropFilter: 'blur(0.25rem)',
  backdropFilter: 'blur(0.25rem)',
} as const

type CustomVJSButtonProps = {
  className?: string
  title?: string
  children?: React.ReactNode
  onClick?: () => void
}
export function CustomVJSButton ({ className, title, children, onClick }: CustomVJSButtonProps) {
  return (
    <button
      className={`vjs-control vjs-button ${styles.limeCustomVjsButton} ${className ?? ''} `}
      style={VJSButtonStyle}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}

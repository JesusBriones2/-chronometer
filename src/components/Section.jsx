export function Section({ children, isActive }) {
  return (
    <section className={isActive ? 'section--active' : ''}>
      {children}
    </section>
  )
}
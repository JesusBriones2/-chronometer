import './../css/nav.css'
import { useState } from 'react'

export function Nav({ fn }) {
  const [tabActive, setTabActive] = useState(0)
  const texts = [
    ['bell', 'Alarma'],
    ['clock', 'Reloj'],
    ['stopwatch', 'Cronómetro'],
    ['hourglass-start', 'Temporizador'],
  ]
  const className = 'nav__item--active'

  const selectTab = (index) => {
    fn(index)
    setTabActive(index)
  }

  return (
    <nav>
      <ul className="nav__list">
        {texts.map(([icon, text], index) => (
          <li
            key={index}
            className={`nav__item ${tabActive === index ? className : ''}`}
            onClick={() => selectTab(index)}
          >
            <i className={`icon-${icon}`}></i>
            <span className="nav__item-text">{text}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

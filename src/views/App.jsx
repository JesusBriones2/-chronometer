import './../css/app.css'

import { useState } from 'react'

import { Nav } from '../components/Nav'
import { Section } from '../components/Section'
import { Chronometer } from './chronometer'
import { Alarm } from './alarm'
import { Clock } from './clock'
import { Timer } from './timer'



export function App() {
  const [sectionActive, setSectionActive] = useState(0)

  return (
    <div className="container">
      <header className="header">
        <Nav fn={(tabSelected) => setSectionActive(tabSelected)} />
      </header>
      <main className="main">
        <Section isActive={0 === sectionActive}>
          <Alarm />
        </Section>
        <Section isActive={1 === sectionActive}>
          <Clock />
        </Section>
        <Section isActive={2 === sectionActive}>
          <Chronometer />
        </Section>
        <Section isActive={3 === sectionActive}>
          <Timer />
        </Section>
      </main>
    </div>
  )
}

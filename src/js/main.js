import { Nav } from './nav.js'
import './services/chronometer.js'

const main = document.querySelector('.main')
let sectionActive = main.querySelector('.alarm')

Nav(
  document.querySelector('.nav'),
  ['alarm', 'clock', 'chronometer', 'timer'],
  (item) => {
    const section = main.querySelector(`.${item}`)
    sectionActive.classList.remove('sec-active')
    section.classList.add('sec-active')
    sectionActive = section
  }
)

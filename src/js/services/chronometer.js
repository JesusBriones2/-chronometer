;(() => {
  const $clock = document.querySelector('.chronometer__clock')
  const $buttons = document.querySelector('.chronometer__buttons')
  const $records = document.querySelector('.chronometer__records')

  let time = { m: 0, s: 0, ms: 0 }
  let preTime = { m: 0, s: 0, ms: 0 }
  let numRecords = 0
  let interval = null

  // Devuelve el tiempo en formato "00:00.00".
  function formatTime(t) {
    const f = (n) => ('0' + n).slice(-2)
    return `${f(t.m)}:${f(t.s)}.${f(t.ms)}`
  }

  // Calcula la diferencia entre marcas de tiempo.
  function calcDifferenceTime() {
    const dif =
      time.m * 60000 +
      time.s * 1000 +
      time.ms * 10 -
      (preTime.m * 60000 + preTime.s * 1000 + preTime.ms * 10)

    return {
      m: Math.floor(dif / 60000),
      s: Math.floor((dif % 60000) / 1000),
      ms: (dif % 1000) / 10
    }
  }

  const renderTime = () => ($clock.textContent = formatTime(time))

  function startChronometer() {
    const increaseMinutes = () => (time.m < 99 ? time.m++ : 0)

    const increaseSeconds = () => {
      if (time.s === 59) {
        time.s = 0
        increaseMinutes()
      } else time.s++
    }

    const increaseMilliseconds = () => {
      if (time.ms === 99) {
        time.ms = 0
        increaseSeconds()
      } else time.ms++
      renderTime()
    }

    if (!interval) interval = setInterval(increaseMilliseconds, 10)
  }

  function pauseChronometer() {
    clearInterval(interval)
    interval = null
  }

  const restartChronometer = () => {
    time = { m: 0, s: 0, ms: 0 }
    preTime = { m: 0, s: 0, ms: 0 }
    renderTime()
    numRecords = 0
    $records.innerHTML = ''
  }

  function captureRecord() {
    numRecords++

    const li = document.createElement('li')
    li.classList.add('chronometer__record')
    li.innerHTML += `
      <span class="chronometer__number">
        <i class="icon-flag"></i>
        <span>${numRecords}</span>
      </span>
      <span>+ ${formatTime(calcDifferenceTime())}</span>
      <span>${formatTime(time)}</span>`

    $records.insertAdjacentElement('afterbegin', li)
    preTime = Object.assign({}, time)
  }

  const actions = {
    play: {
      action: startChronometer,
      addClass: [0, 1],
      removeClass: [2, 3],
    },
    pause: {
      action: pauseChronometer,
      addClass: [2, 3],
      removeClass: [0, 1],
    },
    stop: {
      action: restartChronometer,
      addClass: [0],
      removeClass: [],
    },
    flag: {
      action: captureRecord,
      addClass: [],
      removeClass: [],
    },
  }

  $buttons.addEventListener('click', ({ target }) => {
    if (!target.closest('button')) return

    const btnId = target.dataset.id
    const buttons = $buttons.children

    actions[btnId].action()
    actions[btnId].addClass.forEach((i) => buttons[i].classList.add('hide'))
    actions[btnId].removeClass.forEach((i) =>
      buttons[i].classList.remove('hide')
    )
  })
})()

(() => {
  const clockElem = document.querySelector(".clock");
  const buttonsElem = document.querySelector(".buttons");
  const recordElem = document.querySelector(".record-cont");

  let time = { m: 0, s: 0, ms: 0 };
  let preTime = { m: 0, s: 0, ms: 0 };
  let numRecords = 0;
  let interval;



  // Devuelve el tiempo en formato "00:00.00".
  function formatTime(t) {
    const f = (n) => ("0" + n).slice(-2);
    return `${f(t.m)}:${f(t.s)}.${f(t.ms)}`;
  }



  function calcDifferenceTime() {
    // Convierte los tiempos a ms y los resta.
    let dif =
      time.m * 60000 +
      time.s * 1000 +
      time.ms * 10 -
      (preTime.m * 60000 + preTime.s * 1000 + preTime.ms * 10);

    // Convierte a m,s,ms los ms de diferencia.
    return {
      m: Math.floor(dif / 60000),
      s: Math.floor((dif % 60000) / 1000),
      ms: (dif % 1000) / 10
    };
  }



  const renderTime = () => (clockElem.textContent = formatTime(time));



  // Controla el incremento de tiempo.
  function startChronometer() {
    const increaseMinutes = () => (time.m < 99 ? time.m++ : 0);

    const increaseSeconds = () => {
      time.s == 59 ? ((time.s = 0), increaseMinutes()) : time.s++;
    };

    const increaseMilliseconds = () => {
      time.ms == 99 ? ((time.ms = 0), increaseSeconds()) : time.ms++;
      renderTime();
    };

    if (!interval) interval = setInterval(increaseMilliseconds, 10);
  }



  function pauseChronometer() {
    clearInterval(interval);
    interval = null;
  }



  const restartChronometer = () => {
    time = preTime = { m: 0, s: 0, ms: 0 };
    renderTime();
    numRecords = 0;
    recordElem.innerHTML = "";
  };



  function captureRecord() {
    numRecords++;

    const elem = document.createElement("div");
    elem.classList.add("record");
    elem.innerHTML += `
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>
        <span class="num">${numRecords}</span>
      </div>
      <span class="difference">+ ${formatTime(calcDifferenceTime())}</span>
      <span class="time">${formatTime(time)}</span>`;

    recordElem.insertAdjacentElement("afterbegin", elem);
    preTime = Object.assign({}, time);
  };



  buttonsElem.addEventListener("click", (e) => {
    const tag = e.target;
    const btns = buttonsElem.children;
    let idBtn = null;

    if (tag.tagName == "BUTTON") idBtn = tag.id;
    if (["path", "svg"].includes(tag.tagName)) idBtn = tag.closest("BUTTON").id;
    if (!idBtn) return;

    const actions = {
      play: { action: startChronometer, addClass: [0, 1], removeClass: [2, 3] },
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
    };

    actions[idBtn].action();
    actions[idBtn].addClass.forEach((i) => btns[i].classList.add("hide"));
    actions[idBtn].removeClass.forEach((i) => btns[i].classList.remove("hide"));
  });
})();

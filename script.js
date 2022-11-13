(() => {
	const recordElement = document.querySelector('.record');
	const clock = document.querySelector('.clock');
	const buttons = document.querySelector('.buttons');

	let time = {m:0, s:0, ms:0};
	let preTime = {m:0, s:0, ms:0};
	let interval = null;
	let numRecords = 0;



	// Formatea un numero en "00".
	const ft = n => ('0' + n).slice(-2);

	// Devuelve el tiempo en formato "00:00.00".
	const timeString = t => `${ft(t.m)}:${ft(t.s)}.${ft(t.ms)}`;
	
	// Actualiza el cronometro en el Dom.
	const updateTime = () => clock.textContent = timeString(time);

	

	// Incrementares de tiempo.
	const increaseMinutes = () => time.m < 99 ? time.m++ : 0;

	const increaseSeconds = () => time.s == 59 ? (time.s = 0, increaseMinutes()) : time.s++;

	const increaseMilliseconds = () => {
		time.ms == 99 ? (time.ms = 0, increaseSeconds()) : time.ms++;
		updateTime();
	}



	// Controles del cronometro.
	const startChronometer = () => interval == null ? interval = setInterval(increaseMilliseconds, 10) : 0;

	const pauseChronometer = () => { clearInterval(interval); interval = null; }
	
	const restartChronometer = () => {
		time = preTime = {m:0, s:0, ms:0};
		updateTime();
		numRecords = 0;
		recordElement.innerHTML = '';
		recordElement.classList.add('hide-record');
	}



	// Calcula la diferencia entre dos tiempos.
	const timeDifference = () => {
		let timeCopy = Object.assign({}, time);
		let dif = { m: 0, s: 0, ms: 0 };
		let x = 0;

		if (timeCopy.ms >= preTime.ms) { dif.ms = timeCopy.ms - preTime.ms; }
		else {
			dif.ms = ('1' + ft(timeCopy.ms)) - preTime.ms;
			x++;
		}

		x != 0 ? (timeCopy.s -= x, x--) : 0;

		if (timeCopy.s >= preTime.s) { dif.s = timeCopy.s - preTime.s; }
		else {
			dif.s = ('1' + ft(timeCopy.s)) - preTime.s;
			dif.s -= dif.s + preTime.s >= 60 ? 40 : 0;
			x++;
		}

		timeCopy.m -= x;
		timeCopy.m >= preTime.m ? dif.m = timeCopy.m - preTime.m : 0;

		return dif;
	}



	// Captura el record.
	const captureRecord = () => {
		numRecords++;
		
		const element = document.createElement('DIV');
		element.classList.add('record__register');
		element.innerHTML += `
		<span class="record__register-num">
			<i class="fa-solid fa-flag record-icon"></i>${ft(numRecords)}
		</span>
		<span class="record__difference">+ ${timeString(timeDifference())}</span>
		<span class="record__time">${timeString(time)}</span>`;

		recordElement.insertAdjacentElement('afterbegin', element);
		preTime = Object.assign({}, time);
	}



	// Control de evento click de los botones.
	buttons.addEventListener('click', (e) => {	
		let nameBtn = e.target.classList.item(1);
		let btns = buttons.children;
		let CLASS = 'btnHide';

		if (nameBtn == 'fa-play') {
			startChronometer();
			btns[0].classList.add(CLASS)
			btns[1].classList.add(CLASS)
			btns[2].classList.remove(CLASS);
			btns[3].classList.remove(CLASS);
		}
		else if (nameBtn == 'fa-pause') {
			pauseChronometer();
			btns[0].classList.remove(CLASS);
			btns[1].classList.remove(CLASS);
			btns[3].classList.add(CLASS);
			btns[2].classList.add(CLASS);
		}
		else if (nameBtn == 'fa-stop') {
			restartChronometer();
			btns[0].classList.add(CLASS);
		}
		else if (nameBtn == 'fa-flag') {
			captureRecord();
			recordElement.classList.remove('hide-record');
		}
	});
})();
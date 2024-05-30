import './../css/chronometer.css'

export function Chronometer() {
  return (
    <>
      <span className="chronometer__clock">00:00.00</span>
      <div className="chronometer__buttons">
        <button className="icon-stop hide" data-id="stop"></button>
        <button className="icon-play" data-id="play"></button>
        <button className="icon-flag hide" data-id="flag"></button>
        <button className="icon-pause hide" data-id="pause"></button>
      </div>
      <ul className="chronometer__records">
        <li className="chronometer__record">
          <span className="chronometer__number">
            <i className="icon-flag"></i>
            <span>1</span>
          </span>
          <span>+ 00:00.00</span>
          <span>00:00.00</span>
        </li>
      </ul>
    </>
  )
}

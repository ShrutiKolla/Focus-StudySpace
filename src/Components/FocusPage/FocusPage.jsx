import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Timer from '../Timer/Timer'
import CompleteNotif from '../CompleteNotif/CompleteNotif'
import config from '../../assets/config.svg'
import volume from '../../assets/volume.svg'

import musicDb from '../Footer/musicDb.json'

import focusCss from './focus.module.css'

const FocusPage = ({ hrs, mins, secs, setShowModal, setShowStart }) => {

  const [showConfig, setShowConfig] = useState(false)
  const [genre, setGenre] = useState(0);
  const [song, setSong] = useState(0)
  const [bg, setBg] = useState(0);
  const [complete, setComplete] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const volRef = useRef('')
  const audioRef = useRef()

  useEffect(() => {
    if (showConfig) {
      volRef.current.value = audioRef.current.volume * 100
      volRef.current.style.backgroundSize = `${audioRef.current.volume * 100}% 100%`
    }
  }, [showConfig])

  const bgs = [
    {
      backgroundImage: `url(assets/metro.gif)`,
      backgroundSize: `cover`,
      backgroundPosition: `center`
    },
    {
      backgroundImage: `url(assets/Moments.gif)`,
      backgroundSize: `cover`,
      backgroundPosition: `center`
    },
    {
      backgroundImage: `url(assets/sakura.gif)`,
      backgroundSize: `cover`,
      backgroundPosition: `center`
    },
    {
      backgroundImage: `url(assets/cozy.gif)`,
      backgroundSize: `cover`,
      backgroundPosition: `center`
    }
  ]

  function handleConfig() {
    setShowConfig(prev => !prev)
  }
  function handleComplete() {
    setComplete(true)
  }
  function changeSong(dir) {
    const n = musicDb[genre].length;
    dir === 1 ? setSong(curr => (curr + 1) % n) : setSong(curr => (curr - 1 + n) % n)
  }

  function handleVol(e) {
    audioRef.current.volume = e.target.value / 100;
    e.target.style.backgroundSize = `${e.target.value}% 100%`
  }

  function resetTimer() {
    setResetKey(prev => prev + 1);
  }
  return (
    <div className={focusCss.focusDiv}
      style={{
        backgroundImage: bgs[bg].backgroundImage,
        backgroundSize: bgs[bg].backgroundSize,
        backgroundPosition: bgs[bg].backgroundPosition
      }}>

      <Navbar focus={true} setShowModal={setShowModal} setShowStart={setShowStart} />

      <div className={focusCss.focusBody}>

        <p className={focusCss.quote}>You don't have to be great to start, but you have to start to be great</p>
        <p className={focusCss.timer}>
          <Timer key={resetKey} hrs={hrs} mins={mins} handleComplete={handleComplete} secs={secs} />
        </p>

        <div className={`${focusCss.config} ${showConfig && focusCss.configShow}`} onClick={handleConfig}>
          <img src={config} alt="" />
        </div>

        {showConfig &&
          <div className={focusCss.configuration}>

            <p>Mood</p>
            <div className={focusCss.genres}>
              <div onClick={() => { setGenre(0); setSong(0) }}
                className={genre === 0 ? focusCss.genSelected : focusCss.genre}>
                <svg fill="#000000" width="800px" height="800px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 48.9179 13.7969 C 49.3398 13.7969 49.6446 13.3984 49.6211 12.9531 L 49.4804 10.7266 L 51.3318 11.9922 C 51.6601 12.2266 52.1992 12.1328 52.4334 11.7813 C 52.6446 11.4062 52.5275 10.8906 52.0585 10.6797 L 50.0430 9.6953 L 52.0820 8.6875 C 52.5040 8.4766 52.6211 7.9609 52.4334 7.6094 C 52.2462 7.2344 51.6601 7.1641 51.3318 7.3984 L 49.4804 8.6875 L 49.6446 6.4141 C 49.6912 5.9687 49.3398 5.5938 48.9179 5.5938 C 48.4259 5.5938 48.1446 5.9687 48.1681 6.4141 L 48.3088 8.6875 L 46.4099 7.3984 C 46.0820 7.1641 45.5896 7.1875 45.3554 7.6094 C 45.1445 7.9609 45.2382 8.4531 45.6836 8.6875 L 47.6992 9.6953 L 45.6836 10.6797 C 45.2382 10.8672 45.1210 11.3828 45.3320 11.7813 C 45.5430 12.1562 46.0820 12.2266 46.4099 11.9922 L 48.3088 10.7266 L 48.1912 12.9531 C 48.1681 13.3984 48.4259 13.7969 48.9179 13.7969 Z M 5.6523 22.9141 C 9.0273 21.8360 12.5195 21.2969 15.8476 21.2969 C 20.1601 21.2969 23.3242 21.9766 27.4023 21.9766 C 31.6210 21.9766 34.2460 19.1172 34.2460 15.3906 C 34.2460 11.5703 31.3164 8.8516 27.7070 8.8516 C 25.0351 8.8516 22.6913 10.5156 21.7070 12.7422 C 21.3320 13.5156 21.4726 14.4297 22.2929 14.8516 C 23.0429 15.2266 23.9570 14.9922 24.4492 14.0313 C 24.9648 12.8360 26.2304 11.8984 27.7070 11.8984 C 29.6523 11.8984 31.1757 13.2578 31.1757 15.3906 C 31.1757 17.5234 29.6992 18.9297 27.4023 18.9297 C 23.5117 18.9297 20.3007 18.2266 15.8476 18.2266 C 12.0273 18.2266 8.1601 18.9062 4.7148 20.0078 C 3.7304 20.2891 3.3554 21.1328 3.5898 21.9531 C 3.8242 22.7500 4.5976 23.2187 5.6523 22.9141 Z M 42.3085 33.8828 C 47.7697 33.8828 51.6366 30.4141 51.6366 25.5625 C 51.6366 20.7813 47.9569 17.3125 43.3866 17.3125 C 39.1445 17.3125 36.0039 20.2656 35.4413 24.1562 C 35.3007 25.1172 35.8398 25.8906 36.6835 26.0078 C 37.5507 26.125 38.3007 25.5860 38.4882 24.4844 C 38.8866 22.0469 40.9257 20.3594 43.3866 20.3594 C 46.2462 20.3594 48.5665 22.4922 48.5665 25.5625 C 48.5665 28.6797 46.1056 30.8360 42.3085 30.8360 C 35.1601 30.8360 27.4492 26.7578 18.0742 26.7578 C 13.2460 26.7578 8.8398 27.5313 4.7148 29.0078 C 3.7539 29.3360 3.3554 30.1562 3.5898 30.9766 C 3.8242 31.7734 4.6210 32.2656 5.6523 31.9141 C 9.4726 30.4609 13.4570 29.8282 18.0742 29.8282 C 27.4257 29.8282 34.4101 33.8828 42.3085 33.8828 Z M 27.4257 50.4062 C 31.0351 50.4062 33.8242 47.7344 33.8242 43.9141 C 33.8242 38.3828 28.1757 35.2891 17.7695 35.2891 C 13.4101 35.2891 8.6992 36.1328 4.7148 37.5156 C 3.7539 37.8438 3.3554 38.6641 3.5898 39.4844 C 3.8242 40.2813 4.6210 40.7734 5.6523 40.4219 C 9.3788 39.0860 13.5507 38.3594 17.7695 38.3594 C 26.2773 38.3594 30.7773 40.4922 30.7773 43.9141 C 30.7773 46.0703 29.2773 47.3594 27.4257 47.3594 C 25.5742 47.3594 24.4492 46.1172 24.1210 44.1484 C 23.9804 43.2813 23.3476 42.5781 22.3398 42.6484 C 21.2851 42.7188 20.8632 43.6094 21.0039 44.5469 C 21.4257 47.8047 23.8398 50.4062 27.4257 50.4062 Z M 48.9179 46.2109 C 49.3398 46.2109 49.6446 45.8125 49.6211 45.3672 L 49.4804 43.1406 L 51.3318 44.4063 C 51.6601 44.6406 52.1992 44.5469 52.4334 44.1953 C 52.6446 43.8438 52.5275 43.3047 52.0585 43.0938 L 50.0430 42.1094 L 52.0820 41.1016 C 52.5040 40.8906 52.6211 40.3750 52.4334 40.0234 C 52.2462 39.6484 51.6601 39.5782 51.3318 39.8125 L 49.4804 41.1016 L 49.6446 38.8516 C 49.6912 38.3828 49.3398 38.0078 48.9179 38.0078 C 48.4259 38.0078 48.1446 38.3828 48.1681 38.8516 L 48.3088 41.1016 L 46.4099 39.8125 C 46.0820 39.5782 45.5896 39.6250 45.3554 40.0234 C 45.1445 40.3750 45.2382 40.8672 45.6836 41.1016 L 47.6992 42.1094 L 45.6836 43.0938 C 45.2382 43.3047 45.1210 43.8203 45.3320 44.1953 C 45.5430 44.5703 46.0820 44.6406 46.4099 44.4063 L 48.3088 43.1406 L 48.1912 45.3672 C 48.1681 45.8125 48.4259 46.2109 48.9179 46.2109 Z" /></svg>
                <p><strong>Chill</strong></p>
              </div>
              <div onClick={() => { setGenre(1); setSong(0) }}
                className={genre === 1 ? focusCss.genSelected : focusCss.genre}>
                <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="800px" height="800px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
                  <g>
                    <path d="M57.473,42.533c0-5.891-6.195-18.732-12.889-31.731c-0.48-0.937-0.902-1.752-1.242-2.422
		c-2.582-5.089-5.769-5.849-7.44-5.849c-2.897,0-5.535,2.08-7.429,5.857c-0.3,0.598-0.668,1.323-1.089,2.151
		C20.707,23.691,14.527,36.67,14.527,42.531c0,11.294,8.77,20.559,19.854,21.392v3.548c0,1.104,0.896,2,2,2c1.104,0,2-0.896,2-2
		v-3.605C49.104,62.676,57.473,53.567,57.473,42.533z M37.381,59.936v-5.844l7.291-7.292c0.391-0.391,0.391-1.022,0-1.413
		c-0.391-0.392-1.023-0.392-1.414,0l-5.877,5.877V31.841l5.604-5.604c0.391-0.391,0.391-1.023,0-1.414
		c-0.392-0.391-1.023-0.391-1.414,0l-4.189,4.189v-2.543c0-0.553-0.447-1-1-1s-1,0.447-1,1v4.543l-0.061,0.061
		c-0.391,0.391-0.391,1.023,0,1.414c0.018,0.018,0.042,0.024,0.061,0.041v10.72l-5.224-5.225c-0.391-0.392-1.023-0.392-1.414,0
		c-0.391,0.391-0.391,1.022,0,1.414l6.55,6.551c0.026,0.026,0.06,0.036,0.088,0.059v7.217l-0.061,0.061
		c-0.391,0.391-0.391,1.023,0,1.414c0.018,0.018,0.042,0.024,0.061,0.041v5.195c-9.348-0.329-16.855-8.016-16.855-17.441
		c0-5.713,9.027-23.491,12.424-30.182c0.424-0.835,0.795-1.566,1.099-2.17c1.146-2.286,2.586-3.65,3.853-3.65
		c1.284,0,2.694,1.333,3.874,3.659c0.343,0.675,0.768,1.5,1.252,2.443c3.724,7.231,12.445,24.166,12.445,29.9
		C53.473,51.701,46.369,59.228,37.381,59.936z"/>
                    <path d="M36.381,21.469c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1v-1C37.381,21.916,36.934,21.469,36.381,21.469z" />
                    <path d="M26.749,36.019c-0.19,0.19-0.3,0.45-0.3,0.709c0,0.271,0.11,0.53,0.29,0.711c0.19,0.189,0.45,0.289,0.71,0.289
		c0.271,0,0.521-0.1,0.71-0.289c0.181-0.189,0.29-0.439,0.29-0.711c0-0.259-0.1-0.519-0.29-0.7
		C27.789,35.659,27.109,35.659,26.749,36.019z"/>
                  </g>
                </svg>
                <p><strong>Ambient</strong></p>
              </div>
              <div onClick={() => { setGenre(2); setSong(0) }}
                className={genre === 2 ? focusCss.genSelected : focusCss.genre}>
                <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512" xml:space="preserve">
                  <g>
                    <g>
                      <path d="M263.434,311.362c-0.184-0.901-0.451-1.788-0.803-2.632c-0.352-0.846-0.79-1.663-1.295-2.436
			c-0.507-0.76-1.098-1.492-1.746-2.14c-0.648-0.648-1.366-1.24-2.14-1.746c-0.762-0.507-1.578-0.943-2.436-1.295
			c-0.845-0.352-1.732-0.62-2.633-0.803c-1.816-0.366-3.689-0.366-5.505,0c-0.887,0.183-1.774,0.451-2.633,0.803
			c-0.845,0.352-1.661,0.788-2.422,1.295c-0.774,0.505-1.493,1.098-2.14,1.746c-0.648,0.648-1.239,1.379-1.746,2.14
			c-0.521,0.774-0.943,1.591-1.295,2.436c-0.352,0.845-0.634,1.73-0.803,2.632c-0.183,0.915-0.282,1.832-0.282,2.761
			c0,0.914,0.099,1.83,0.282,2.744c0.169,0.903,0.451,1.79,0.803,2.633c0.352,0.846,0.774,1.663,1.295,2.436
			c0.507,0.76,1.098,1.492,1.746,2.14s1.366,1.239,2.14,1.746c0.76,0.507,1.577,0.943,2.422,1.295
			c0.859,0.352,1.746,0.62,2.647,0.803c0.901,0.183,1.83,0.282,2.746,0.282s1.845-0.099,2.746-0.282
			c0.901-0.183,1.788-0.451,2.633-0.803c0.859-0.352,1.676-0.788,2.436-1.295c0.774-0.507,1.492-1.098,2.14-1.746
			s1.239-1.378,1.746-2.14c0.505-0.774,0.943-1.591,1.295-2.436c0.352-0.845,0.618-1.731,0.803-2.633
			c0.183-0.914,0.28-1.83,0.28-2.744C263.714,313.194,263.617,312.277,263.434,311.362z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M497.92,125.403c-7.775,0-14.08,6.305-14.08,14.08v7.123H354.955c-0.108,0-0.215-0.008-0.325-0.008h-24.268v-16.619
			h12.672c7.775,0,14.08-6.305,14.08-14.08s-6.305-14.08-14.08-14.08H221.239c-7.777,0-14.08,6.305-14.08,14.08
			s6.304,14.08,14.08,14.08h14.316v16.619h-28.921c-1.152-0.304-2.36-0.466-3.607-0.466h-12.177
			C120.454,142.159,23.395,71.76,22.398,71.03c-4.28-3.131-9.956-3.593-14.687-1.195C2.981,72.234,0,77.088,0,82.392v235.052
			c0,5.287,2.963,10.127,7.67,12.534c2.023,1.034,4.221,1.545,6.411,1.545c2.906,0,5.798-0.9,8.243-2.664
			c0.712-0.514,49.349-35.341,102.225-57.458v86.489c0,47.309,38.487,85.798,85.796,85.798H354.63
			c47.309,0,85.796-38.489,85.796-85.798V232.395c0-0.092-0.007-0.18-0.007-0.272h43.42v5.22c0,7.775,6.305,14.08,14.08,14.08
			s14.08-6.305,14.08-14.08v-97.859C512,131.707,505.695,125.403,497.92,125.403z M263.714,129.979h38.487v16.619h-38.487V129.979z
			 M150.493,232.53c-5.355,1.493-10.839,3.191-16.478,5.146c-0.192,0.066-0.376,0.146-0.563,0.22
			c-41.16,14.334-81.305,37.785-105.291,53.121V108.97c33.51,21.605,98.545,59.036,154.675,64.762v10.182h-58.713
			c-7.777,0-14.08,6.305-14.08,14.08c0,7.775,6.304,14.08,14.08,14.08h58.711v14.049c-1.019,0.107-2.066,0.252-3.102,0.38
			c-0.729,0.091-1.453,0.166-2.185,0.268c-1.156,0.161-2.335,0.353-3.509,0.541c-0.636,0.101-1.271,0.191-1.909,0.3
			c-1.247,0.213-2.515,0.456-3.782,0.698c-0.559,0.107-1.117,0.206-1.677,0.32c-1.34,0.268-2.699,0.563-4.061,0.866
			c-0.469,0.104-0.936,0.204-1.407,0.311c-1.439,0.328-2.894,0.68-4.355,1.045c-0.359,0.09-0.718,0.179-1.079,0.27
			c-1.553,0.396-3.119,0.811-4.697,1.246C150.879,232.422,150.686,232.477,150.493,232.53z M412.264,357.89L412.264,357.89
			c0,31.781-25.855,57.637-57.635,57.637H210.343c-31.78,0-57.635-25.855-57.635-57.637v-96.695
			c13.248-4.044,25.319-6.499,36.071-7.343c0.055-0.004,0.11-0.008,0.165-0.013v86.866c0,21.273,17.308,38.58,38.582,38.58h88.727
			c0.008,0,0.018,0.001,0.027,0.001c0.008,0,0.018-0.001,0.027-0.001h21.138c21.274,0,38.583-17.308,38.583-38.58v-101.55
			c0-7.775-6.305-14.08-14.08-14.08H210.997V174.76H354.63c0.052,0,0.103,0.004,0.154,0.004c0.027,0,0.053,0.004,0.08,0.004
			c1.629,0.007,3.246,0.086,4.846,0.228c0.079,0.007,0.159,0.011,0.238,0.018c0.759,0.07,1.512,0.159,2.263,0.259
			c0.09,0.013,0.18,0.023,0.27,0.035c0.796,0.11,1.587,0.235,2.373,0.377c0.006,0,0.013,0.001,0.018,0.003
			c12.129,2.205,23.092,8.257,31.412,16.936c0.114,0.12,0.228,0.238,0.341,0.358c0.411,0.435,0.812,0.879,1.21,1.326
			c0.22,0.249,0.436,0.5,0.652,0.753c0.308,0.359,0.612,0.721,0.911,1.088c0.327,0.401,0.645,0.81,0.96,1.221
			c0.19,0.246,0.382,0.49,0.568,0.739c3.258,4.389,5.912,9.254,7.829,14.47c0.003,0.01,0.007,0.02,0.011,0.03
			c2.263,6.173,3.499,12.837,3.499,19.784V357.89z M249.634,285.956c7.777,0,14.08-6.305,14.08-14.08v-18.638h38.487v97.89h-74.673
			c-5.746,0-10.421-4.673-10.421-10.42v-87.471h18.447v18.638C235.553,279.652,241.857,285.956,249.634,285.956z M330.362,351.127
			v-97.89h17.506v87.471c0,5.746-4.675,10.42-10.422,10.42H330.362z M483.311,203.962h-0.001h-47.717
			c-0.084-0.241-0.184-0.473-0.272-0.712c-0.158-0.435-0.33-0.863-0.493-1.294c-0.342-0.9-0.687-1.797-1.059-2.681
			c-0.165-0.393-0.344-0.777-0.514-1.167c-0.393-0.898-0.789-1.795-1.212-2.677c-0.193-0.403-0.401-0.794-0.6-1.193
			c-0.421-0.843-0.842-1.688-1.29-2.515c-0.272-0.501-0.562-0.99-0.843-1.485c-0.398-0.701-0.789-1.407-1.207-2.095
			c-0.468-0.773-0.962-1.526-1.452-2.284c-0.252-0.387-0.491-0.784-0.748-1.166c-2.349-3.498-4.942-6.816-7.765-9.924h65.173
			V203.962z"/>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M95.693,195.239c-0.183-0.898-0.451-1.785-0.803-2.632c-0.352-0.845-0.788-1.674-1.295-2.435
			c-0.521-0.76-1.112-1.494-1.76-2.142c-3.267-3.265-8.124-4.759-12.701-3.843c-0.901,0.183-1.788,0.449-2.633,0.801
			c-0.859,0.352-1.676,0.79-2.436,1.297c-0.774,0.505-1.492,1.097-2.14,1.745c-0.648,0.648-1.239,1.38-1.746,2.142
			c-0.507,0.762-0.943,1.591-1.295,2.435c-0.352,0.846-0.62,1.732-0.803,2.633c-0.183,0.903-0.282,1.83-0.282,2.746
			s0.099,1.845,0.282,2.76c0.183,0.901,0.451,1.774,0.803,2.633c0.352,0.845,0.789,1.661,1.295,2.422
			c0.507,0.774,1.098,1.494,1.746,2.154c0.648,0.648,1.366,1.239,2.14,1.746c0.76,0.505,1.577,0.943,2.436,1.295
			c0.845,0.352,1.732,0.618,2.633,0.801c0.901,0.184,1.83,0.268,2.746,0.268c3.703,0,7.336-1.492,9.955-4.111
			c0.648-0.662,1.239-1.38,1.76-2.154c0.507-0.76,0.943-1.577,1.295-2.422c0.352-0.859,0.62-1.732,0.803-2.633
			c0.183-0.915,0.268-1.844,0.268-2.76C95.961,197.07,95.877,196.141,95.693,195.239z"/>
                    </g>
                  </g>
                </svg>
                <p><strong>Jazz</strong></p>

              </div>
              <div onClick={() => { setGenre(3); setSong(0) }}
                className={genre === 3 ? focusCss.genSelected : focusCss.genre}>
                <svg id="lofi" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 17V12C22 10.1786 21.513 8.47087 20.6622 7M2 18V12C2 6.47715 6.47715 2 12 2C13.8214 2 15.5291 2.48697 17 3.33782" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M8 15.1871C8 14.6088 8 14.3196 7.93097 14.0899C7.77135 13.5588 7.35457 13.156 6.83579 13.0313C6.61143 12.9775 6.33578 13.0002 5.78447 13.0457C4.82772 13.1247 4.34935 13.1642 3.95934 13.3151C3.06004 13.6629 2.3739 14.4394 2.1131 15.4044C2 15.8229 2 16.3248 2 17.3285V17.514C2 18.5431 2 19.0577 2.12305 19.493C2.36454 20.3475 2.942 21.0543 3.71133 21.437C4.10333 21.632 4.58932 21.7123 5.56129 21.8728C6.20632 21.9793 6.52883 22.0326 6.78984 21.9788C7.30414 21.8729 7.72826 21.4938 7.90852 20.9791C8 20.7178 8 20.3763 8 19.6934V15.1871Z" stroke="#1C274C" stroke-width="1.5" />
                  <path d="M16 15.1871C16 14.6088 16 14.3196 16.069 14.0899C16.2286 13.5588 16.6454 13.156 17.1642 13.0313C17.3886 12.9775 17.6642 13.0002 18.2155 13.0457C19.1723 13.1247 19.6506 13.1642 20.0407 13.3151C20.94 13.6629 21.6261 14.4394 21.8869 15.4044C22 15.8229 22 16.3248 22 17.3285V17.514C22 18.5431 22 19.0577 21.877 19.493C21.6355 20.3475 21.058 21.0543 20.2887 21.437C19.8967 21.632 19.4107 21.7123 18.4387 21.8728C17.7937 21.9793 17.4712 22.0326 17.2102 21.9788C16.6959 21.8729 16.2717 21.4938 16.0915 20.9791C16 20.7178 16 20.3763 16 19.6934V15.1871Z" stroke="#1C274C" stroke-width="1.5" />
                  <path d="M12 6.5L12 11.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M15 8L15 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M9 8L9 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <p><strong>Lo-fi</strong></p>
              </div>
            </div>

            <div className={focusCss.volumeDiv}
            >
              <img src={volume} alt="" />
              <input
                style={{ backgroundSize: `${50}% 100%` }}
                id="volume"
                onChange={(e) => handleVol(e)} ref={volRef}
                className={focusCss.volume} type="range" />
            </div>

            <p>Background</p>
            <div className={focusCss.bgs}>
              <div className={bg === 0 ? focusCss.bgSelected : focusCss.bg} onClick={() => setBg(0)}>
                <svg fill="#000000" width="800px" height="800px" viewBox="0 0 750 750" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M646.38,392.53c-24.61-.29-49.06,1.64-73.49,3.85-7.63-12.29-13.24-25.68-17.8-39.42-7.56-24.76-22.77-46.57-43.73-61.81-20.17-18.65-42.32-27.18-69.86-26.19-46.72,2.97-96.06,3.07-137.97,26.67-33.3,20.73-63.23,48.65-81.28,83.85-3.41,8.37-10.94,22.38-11.47,33.88-36.98-.46-74-.24-110.82-3.45-13.05,1.07-14.23,22.64-3.09,27.54,8.64,3.84,18.49,4.1,27.81,4.61,58.05,.4,116.06-.32,173.85-6.24,28.9,.42,57.83,3.86,86.86,3.39,55.84,.9,110.91-11.7,166.73-9.97,31.41,.58,62.84,2.47,94.25,1.13,19.17-1.47,19.11-36.59,0-37.85Zm-134.02,8.8c-29.97,.75-59.97-.27-89.92,1.5-25.53,1.16-50.98,3.18-76.42,5.62-30.32,4.6-60.62,8.44-91.38,6.03-6.82-.3-13.64-.52-20.46-.69,.22-.67,.43-1.33,.63-1.94,4.2-12.23,10.49-23.7,17.83-34.32,26.02-38.73,66.63-65.29,110.59-79.58,21.8-6.38,44.53-5.6,66.94-3.97,19.32,2.32,40.96,8.32,55.48,22.2,12.46,10.55,26.76,19.35,37.02,32.22,11.3,15.12,17.16,33.16,24.73,50.31-11.67,1.04-23.35,1.99-35.05,2.63Z" /><path d="M532.89,473.94c-28.49-.3-56.84,2.77-85.21,4.88-86.81,6.31-173.5-7.87-259.81-15.45-13.03,1.04-14.25,22.71-3.09,27.53,35.05,9.84,72.54,7.15,108.56,11.05,34.77,3.48,69.56-.73,104.4-.23,35.02-.38,69.8,3.91,104.7,6.06,10.15,.46,20.29,.71,30.45,.71,17.45-1,17.45-33.55,0-34.56Z" /><path d="M449.1,534.91c-20.94,0-41.87-.32-62.81-.68-22.12,.05-44.37-1.59-66.41-.93-9.52,2.31-11.42,15.91-6.5,23.19,4.86,7.23,15.09,5.88,22.74,6.91,37.64,1.39,75.31-.7,112.97-.37,7.07,0,10.68-7.98,10.68-14.05s-3.6-14.06-10.68-14.06Z" /><path d="M425.43,585.43c-4.69-4.14-11.05-1.59-16.61-1.38-13.44,1.65-27.58,1.27-40.43,5.77-13.05,5.87-8.43,30.24,7.1,27.69,15.07-1.8,30.27-2.56,45.36-4.33,11.46-2.85,12.82-20.69,4.58-27.75Z" /><path d="M152.98,266.72c14.06,4.28,23.99,15.9,33.87,26.13,14,13.53,25.61-12.91,15.14-22.92-14.1-14.47-30.62-34.08-52.77-32.26-14.08,4.19-11.13,28.23,3.76,29.06Z" /><path d="M297,215.93c8.54,19.5,26.99,2.71,20.94-12.81-5.64-16.81-9.2-34.49-16.8-50.55-4.06-9.35-15.99-7.65-18.66,1.73-1.95,5.57-.46,11.48,1.07,16.98,4.92,15.57,8.27,28.26,13.46,44.65Z" /><path d="M428.81,223.56c15.57,6.96,16.94-16.35,21.91-25.71,3.27-7.4,7.57-14.33,11.33-21.48,4.1-7.8,8.54-15.63,11.37-24,4.73-10.32-6.25-27.48-16.74-16.57-10.55,15.94-19.38,33.4-27.32,50.82-3.96,11.39-13.41,27.9-.54,36.94Z" /><path d="M595.78,260c6.86-9.93,18.09-23.69,8.54-35.41-11.21-11.28-19.72,8.2-25.87,15.6-7.7,10.32-20.76,23.49-10.03,36.33,12.02,12.11,20.58-8.82,27.35-16.52Z" /></svg>
                <p><strong>Home</strong></p>
              </div>
              <div className={bg === 1 ? focusCss.bgSelected : focusCss.bg} onClick={() => setBg(1)}>
                <svg width="800px" height="800px" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M143.063 168.391C137.16 131.449 151.858 98.6331 189.534 96.1059C220.56 94.0247 243.85 122.951 235.666 153.711C235.393 154.735 230.694 163.051 231.224 163.621C240.265 173.329 254.687 178.64 264.028 189.669C293.158 224.079 287.913 273.161 245.576 290.207C209.762 304.631 155.673 312.403 123.927 284.703C93.3085 257.99 112.74 190.764 146.478 176.827" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M201.659 126.405C201.659 125.714 201.659 125.025 201.659 124.337" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M181.99 129.251C182.333 127.797 182.157 126.301 182.265 124.817" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M190.865 144.768C211.037 133.823 234.317 123.69 253.562 111.517" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path opacity="0.503384" d="M152.18 180.954C163.557 186.233 226.382 183.664 221.424 162.293C219.632 154.565 160.986 162.293 152.18 173.625C139.362 190.121 166.265 249.888 167.453 254.495" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M128.17 223.461C117.922 216.854 105.8 213.789 94.252 210.161" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M95.0066 197.969C93.6221 202.948 96.866 209.996 96.9246 210.161" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M92.1949 220.173C90.9456 222.54 85.4858 223.245 85 223.425" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M284.396 201.294C295.443 193.978 303.471 182.538 313.175 173.585" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M294.981 174.693C295.82 178.009 296.597 181.349 297.448 184.669" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M305.983 190.223C308.851 190.493 311.561 189.611 314.206 189.039" stroke="#000000" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p><strong>Chill</strong></p>
              </div>
              <div className={bg === 2 ? focusCss.bgSelected : focusCss.bg} onClick={() => setBg(2)}>
                <svg height="800px" width="800px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512" xml:space="preserve">
                  <g>
                    <path class="st0" d="M458.16,194.44c-0.273,0.018-28.5,2.165-67.387,10.203c-28.446,5.894-62.604,14.96-95.796,28.747
		c33.921-40.151,68.424-66.306,96.142-82.965c17.115-10.285,31.629-16.943,41.778-20.998c5.075-2.028,9.077-3.41,11.75-4.274
		c1.327-0.437,2.346-0.737,3-0.928l0.71-0.2l0.145-0.036c4.984-1.282,7.984-6.356,6.712-11.34
		c-1.291-4.974-6.366-7.975-11.349-6.702c-1.182,0.292-85.648,22.317-165.384,118.168c0.237-1.746,0.437-3.465,0.637-5.184
		c11.476-50.808,35.048-88.74,57.746-115.34c14.205-16.606,28.028-28.738,38.25-36.667c5.111-3.965,9.312-6.875,12.204-8.785
		c1.456-0.945,2.564-1.645,3.292-2.092l0.818-0.481l0.164-0.11l0.018-0.008c4.474-2.547,6.039-8.23,3.492-12.695
		c-2.546-4.475-8.221-6.039-12.695-3.492c-0.637,0.372-29.356,16.76-59.694,52.227c-13.914,16.268-28.155,36.676-40.087,61.303
		C280.462,47.471,238.63,3.993,237.229,2.728c-3.637-3.637-9.53-3.637-13.168,0c-3.638,3.638-3.638,9.522-0.018,13.159
		c1.128,1.292,40.087,42.123,40.159,145.523c0,11.568-0.618,24.09-1.71,37.258c-13.059-47.506-35.339-85.356-56.801-113.156
		c-29.774-38.56-57.948-58.12-58.492-58.503c-4.238-2.928-10.041-1.872-12.968,2.356c-2.929,4.229-1.874,10.03,2.364,12.959
		l0.2,0.145c2.691,1.91,29.483,21.48,56.802,57.893c22.553,30.074,45.27,71.68,55.728,124.325
		C167.314,125.179,70.117,85.584,69.317,85.22c-4.748-1.946-10.186,0.346-12.132,5.112c-1.945,4.756,0.346,10.194,5.111,12.131
		l0.237,0.1c5.328,2.192,93.614,40.278,169.148,129.963c-96.123-43.096-177.424-46.507-178.152-46.561
		c-5.148-0.219-9.495,3.774-9.695,8.912c-0.218,5.139,3.765,9.476,8.913,9.694l1,0.055c9.421,0.536,83.32,6.111,169.167,44.361
		c-22.59,0.973-47.526,3.537-70.825,7.248c-14.986,2.391-29.282,5.248-41.85,8.484c-12.568,3.256-23.336,6.82-31.683,10.976
		c-4.602,2.301-6.476,7.894-4.166,12.495c2.292,4.602,7.894,6.466,12.496,4.166c6.329-3.192,16.205-6.566,28.009-9.595
		c35.467-9.184,88.486-15.632,126.862-15.596c2.873,0,5.548,0.072,8.239,0.137c-1.674,33.838-6.548,69.869-13.295,103.326
		c-1.965,9.676-4.056,19.133-6.257,28.246c-15.823,6.42-21.971,30.502-26.518,48.608c-5.875,23.226-14.224,56.429,13.986,63.54
		c28.21,7.112,36.576-26.081,42.432-49.317c4.856-19.188,11.331-45.142-2.437-57.62c2.164-9.04,4.238-18.36,6.166-27.928
		c7.094-35.076,12.186-72.825,13.878-108.874c2.219-0.055,4.401-0.118,6.692-0.118c23.572-0.009,50.908,2.81,75.718,7.421
		c24.79,4.574,47.271,11.095,60.53,17.77c4.601,2.301,10.185,0.436,12.496-4.166c2.292-4.601,0.436-10.194-4.166-12.495
		c-16.115-8.011-39.541-14.578-65.459-19.424c-18.879-3.502-38.959-5.966-58.166-7.066c30.61-12.359,62.331-20.825,88.94-26.318
		c18.897-3.91,35.23-6.384,46.798-7.875c5.784-0.746,10.367-1.254,13.495-1.564c1.582-0.164,2.765-0.273,3.565-0.337l1.164-0.1
		c5.129-0.391,8.986-4.866,8.585-9.986C467.763,197.895,463.289,194.048,458.16,194.44z"/>
                  </g>
                </svg>
                <p><strong>Blossom</strong></p>
              </div>
              <div className={bg === 3 ? focusCss.bgSelected : focusCss.bg} onClick={() => setBg(3)}>
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="800px" height="800px" viewBox="0 0 562.204 562.204"
                  xml:space="preserve">
                  <g>
                    <path d="M287.119,238.249c-0.306-11.628,0-22.95,1.225-34.578c8.262,0.612,16.83-0.306,25.397-2.448
		c2.143,2.448,5.814,3.672,8.568,0.612c0.918-0.918,2.448-2.448,3.978-4.284c1.53,0.918,3.673,1.224,5.814-0.306
		c75.888-53.856,31.212-131.58-8.568-194.31c-3.365-5.202-11.016-3.06-11.628,3.06c-3.978,57.834-75.888,80.478-77.418,139.842
		c-0.306,13.158,3.06,23.868,8.568,32.436c0.918,9.486,9.792,14.688,19.278,17.442c4.284,2.142,8.568,4.284,13.158,5.508
		c-1.224,11.628-0.918,23.562,0,35.496c-45.594-4.284-88.74-3.06-113.22,3.06c-0.918-1.53-3.06-2.142-4.896-0.612
		C106.58,281.701,78.733,398.593,140.24,443.27c2.448,1.836,6.426,0.611,7.65-2.143c2.754-4.59,5.202-9.486,7.344-14.076
		c-1.53,29.988,0.306,59.67,13.464,85.986c23.256,47.43,93.942,50.184,138.618,48.96c111.996-3.06,106.182-107.406,95.778-191.862
		c5.813,4.59,11.934,13.464,15.3,17.137c1.836,1.836,5.202,1.836,7.038,0C515.09,296.389,397.279,250.795,287.119,238.249z
		 M276.715,190.513c-9.18-3.978-16.83-10.404-22.032-18.972c0.306-0.612,0.918-1.224,1.224-1.836
		c3.366-3.978,7.344-7.344,11.628-10.098c7.956-5.202,16.83-9.486,26.01-12.852C284.671,160.525,279.164,175.213,276.715,190.513z
		 M289.567,194.491c2.754-16.218,7.65-32.13,15.912-48.96c0.612-0.918,0.612-1.836,0.612-2.754
		c10.098-2.754,22.031-5.202,31.212-3.672c4.284,0.612,6.12,1.53,7.956,3.366c0,0,0.306,0.612,0.611,1.224
		c0,0,0.612,1.53,0.612,1.836c-0.306-1.53,0,1.224,0,1.836c0,0.306,0,1.224-0.306,2.448c-3.979,16.83-20.502,32.13-32.437,43.758
		c0,0,0,0.306-0.306,0.306C305.479,195.715,297.218,195.715,289.567,194.491z M247.952,132.679
		c3.672-21.42,23.562-39.168,37.637-54.162c15.912-16.83,29.683-34.272,35.497-55.692c23.867,37.944,48.653,82.314,37.331,121.176
		c-0.611-5.814-3.672-10.71-11.016-14.076c-10.404-4.59-22.95-3.06-33.966-0.918c-13.158,2.754-26.622,7.65-38.862,13.771
		c-7.956,4.284-18.36,10.098-25.092,18.054C246.728,152.875,246.115,143.389,247.952,132.679z M307.315,548.533
		c-51.408,3.672-118.422-5.508-134.64-62.424c-11.322-40.086-2.448-88.128-4.59-129.438c0-2.448-2.142-3.366-3.978-3.06
		c1.224-3.672,2.754-7.038,4.59-10.71c3.978-7.345,7.956-13.771,13.77-4.59c6.12,9.485,8.568,22.031,11.016,33.048
		c4.896,20.195,8.874,41.616,9.486,62.118c0,3.06,3.366,6.426,6.732,5.201c41.922-17.136,30.294-64.565,59.67-89.352
		c0.612,16.83,3.672,40.086,22.337,40.698c18.973,0.611,26.929-33.048,29.07-47.736c13.464,19.584,27.234,37.026,35.802,59.67
		c1.53,4.284,6.427,4.59,8.874,1.225c3.366-4.591,17.748-19.584,24.175-28.152C399.422,451.531,407.684,540.883,307.315,548.533z
		 M400.951,355.753c-1.836-7.649-14.076-7.649-13.157,0.612c0,0.612,0,0.918,0.306,1.53c-5.508,10.403-20.809,37.025-27.234,26.622
		c-10.403-16.83-23.256-31.213-35.496-46.818c-1.224-1.53-3.365-0.918-4.283,0.306c-1.225-2.448-5.509-2.142-6.427,0.918
		c-4.283,12.853-7.649,25.704-16.218,36.721c-15.912,20.502-19.584-32.742-19.584-35.803c0-3.672-3.978-5.813-7.038-3.978
		c-35.19,20.502-25.704,69.768-58.446,88.74c-1.53-31.212-7.344-69.462-23.562-94.86c-5.508-8.874-14.076-9.792-22.032-3.672
		c-17.136,13.77-15.606,33.354-8.262,49.878c-1.224,14.076-2.754,28.458-3.978,42.84c-1.224-0.918-3.06-1.224-4.284,0.306
		c-25.704,29.988-33.048-53.243-32.13-70.38c2.142-33.66,14.994-70.686,36.108-97.92c1.224,1.53,3.06,2.142,5.508,1.53
		c35.19-10.404,75.888-10.098,115.362-5.814c2.448,18.972,6.426,37.638,10.71,55.692c1.224,4.896,7.956,2.754,7.038-1.836
		c-3.061-18.36-5.508-35.496-6.732-52.326c20.809,2.754,41.311,6.426,59.977,10.404c31.518,6.426,65.483,16.83,89.658,39.474
		c16.523,15.606,14.075,36.108,4.283,54.468C425.432,382.375,417.781,372.889,400.951,355.753z"/>
                  </g>
                </svg>
                <p><strong>FirePlace</strong></p>
              </div>
            </div>

          </div>
        }
      </div>

      <Footer focus={true} genre={genre} setGenre={setGenre} song={song} setSong={setSong} audioRef={audioRef} changeSong={changeSong} />
      {complete && <CompleteNotif resetTimer={resetTimer} setComplete={setComplete} setShowModal={setShowModal} setShowStart={setShowStart} />}
    </div >
  )
}

export default FocusPage

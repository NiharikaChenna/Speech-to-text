
import './App.css';

import React, { useState, useEffect } from 'react'
import './App.css'
import Translate from './Component/Translate';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
  const mic = new SpeechRecognition()

  mic.continuous = true
  mic.interimResults = true
  mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      <h1 className='headd'>English Voice to Hindi </h1>
      <div className="container">
        <div className="box">
          <h2>Start and speak</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button className='buton' onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button className='bttn' onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          {/* <p className='fill'>{note}</p> */}
          <div style={{margin:'2rem'}}>
          {<Translate textVal={note}/>}
         </div>
        </div>
        <div className="box1">
          <h2 className='head'>Notes</h2>
          {savedNotes.map(n => (
            <p  key={n}>{n}</p>
          ))}
        </div>

      </div>
    </>
  )
}

export default App
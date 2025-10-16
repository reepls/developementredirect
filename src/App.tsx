import { useState, useEffect, useMemo } from 'react'
import './App.css'

function App() {
  // Target release date: 37 days from today
  const releaseDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 37)
    return date
  }, [])

  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date()
    const difference = releaseDate.getTime() - now.getTime()

    if (difference <= 0) {
      return null
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = releaseDate.getTime() - now.getTime()

      if (difference <= 0) {
        return null
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft()
      setTimeLeft(updatedTimeLeft)
      if (!updatedTimeLeft) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [releaseDate])

  return (
    <div className="container">
      <div className="message-box">
        <h1>It will be available soon</h1>
        {timeLeft ? (
          <div className="timer-box">
            <div className="time-segment">
              <span className="time-number">{timeLeft.days}</span>
              <span className="time-label">Days</span>
            </div>
            <div className="time-segment">
              <span className="time-number">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="time-segment">
              <span className="time-number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="time-label">Minutes</span>
            </div>
            <div className="time-segment">
              <span className="time-number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
        ) : (
          <p className="release-message">The project is now live!</p>
        )}
      </div>
    </div>
  )
}

export default App

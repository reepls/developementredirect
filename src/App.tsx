import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Target release date: November 3rd, current year
  const releaseDate = new Date(new Date().getFullYear(), 10, 3, 0, 0, 0) // Month 10 = November (0-indexed)

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft()
      setTimeLeft(updatedTimeLeft)
      if (!updatedTimeLeft) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

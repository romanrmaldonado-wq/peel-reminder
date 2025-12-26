import { useState, useEffect } from 'react'

export default function PeelCard({ peel, onEdit, onDelete, onToggle, preferences }) {
  const [nextIn, setNextIn] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  // Format time based on user preference
  const formatTime = (time) => {
    if (preferences.timeFormat === '12h') {
      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour % 12 || 12
      return `${displayHour}:${minutes} ${ampm}`
    }
    return time
  }

  // Calculate next notification time (rough estimate)
  useEffect(() => {
    const calculateNext = () => {
      const now = new Date()
      const currentMinutes = now.getHours() * 60 + now.getMinutes()
      const [startH, startM] = peel.startTime.split(':').map(Number)
      const [endH, endM] = peel.endTime.split(':').map(Number)
      const startMinutes = startH * 60 + startM
      const endMinutes = endH * 60 + endM

      if (currentMinutes < startMinutes) {
        // Before window starts
        const diff = startMinutes - currentMinutes
        setNextIn(`starts in ${diff} min`)
      } else if (currentMinutes >= endMinutes) {
        // After window ends
        setNextIn('window closed')
      } else {
        // Within window - estimate next notification
        const minsIntoWindow = currentMinutes - startMinutes
        const nextPeel = peel.intervalMinutes - (minsIntoWindow % peel.intervalMinutes)
        setNextIn(`~${nextPeel} min`)
      }
    }

    calculateNext()
    const interval = setInterval(calculateNext, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [peel])

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="peel-card relative">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-peel-text mb-1">{peel.title}</h3>
          
          <div className="space-y-1 text-sm text-peel-text/70">
            <p>Every {peel.intervalMinutes} minutes</p>
            <p className="text-xs">
              From {formatTime(peel.startTime)} to {formatTime(peel.endTime)}
            </p>
          </div>

          {peel.activeDays && peel.activeDays.length < 7 && (
            <div className="flex gap-1 mt-2">
              {daysOfWeek.map((day, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    peel.activeDays.includes(i)
                      ? 'bg-peel-orange text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-sm font-medium text-peel-orange">{nextIn}</span>
          
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Options"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Active indicator */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        <div className={`w-2 h-2 rounded-full ${peel.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
        <span className="text-xs text-peel-text/60">
          {peel.isActive ? 'active' : 'paused'}
        </span>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[160px]">
            <button
              onClick={() => {
                onEdit()
                setShowMenu(false)
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onToggle()
                setShowMenu(false)
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
            >
              {peel.isActive ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={() => {
                if (confirm('Delete this peel?')) {
                  onDelete()
                }
                setShowMenu(false)
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

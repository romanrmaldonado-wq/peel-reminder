import { useState, useEffect } from 'react'

const INTERVAL_OPTIONS = [15, 30, 45, 60, 90, 120]

export default function PeelModal({ peel, onSave, onClose, preferences }) {
  const [title, setTitle] = useState(peel?.title || '')
  const [intervalMinutes, setIntervalMinutes] = useState(peel?.intervalMinutes || 30)
  const [startTime, setStartTime] = useState(peel?.startTime || '08:00')
  const [endTime, setEndTime] = useState(peel?.endTime || '20:00')
  const [activeDays, setActiveDays] = useState(peel?.activeDays || [0, 1, 2, 3, 4, 5, 6])
  const [notes, setNotes] = useState(peel?.notes || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter a title for your peel')
      return
    }

    onSave({
      title: title.trim(),
      intervalMinutes,
      startTime,
      endTime,
      activeDays,
      notes: notes.trim(),
    })
  }

  const toggleDay = (day) => {
    if (activeDays.includes(day)) {
      // Don't allow removing all days
      if (activeDays.length > 1) {
        setActiveDays(activeDays.filter(d => d !== day))
      }
    } else {
      setActiveDays([...activeDays, day].sort())
    }
  }

  const daysOfWeek = [
    { short: 'S', full: 'Sun', value: 0 },
    { short: 'M', full: 'Mon', value: 1 },
    { short: 'T', full: 'Tue', value: 2 },
    { short: 'W', full: 'Wed', value: 3 },
    { short: 'T', full: 'Thu', value: 4 },
    { short: 'F', full: 'Fri', value: 5 },
    { short: 'S', full: 'Sat', value: 6 },
  ]

  // Format time input based on preference
  const formatTimeForDisplay = (time) => {
    if (preferences.timeFormat === '12h') {
      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour % 12 || 12
      return `${displayHour}:${minutes} ${ampm}`
    }
    return time
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 sm:items-center">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold text-peel-text">
            {peel ? 'Edit Peel' : 'Add a Peel'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-peel-text mb-2">
              What should we remind you about?
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Take medication, Drink water"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-peel-orange focus:border-transparent"
              maxLength={50}
            />
          </div>

          {/* Interval Picker - Circular */}
          <div>
            <label className="block text-sm font-medium text-peel-text mb-3">
              Peel every:
            </label>
            <div className="relative">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-peel-orange">
                  {intervalMinutes} minutes
                </span>
              </div>
              
              {/* Circular selector */}
              <div className="flex justify-center mb-4">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="8"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#E67E50"
                      strokeWidth="8"
                      strokeDasharray={`${(INTERVAL_OPTIONS.indexOf(intervalMinutes) / INTERVAL_OPTIONS.length) * 502.4} 502.4`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-peel-orange rounded-full" />
                  </div>
                </div>
              </div>

              {/* Interval buttons */}
              <div className="grid grid-cols-3 gap-2">
                {INTERVAL_OPTIONS.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setIntervalMinutes(option)}
                    className={`py-2 px-4 rounded-lg font-medium transition-all ${
                      intervalMinutes === option
                        ? 'bg-peel-orange text-white'
                        : 'bg-gray-100 text-peel-text hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Window */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-peel-text mb-2">
                Start time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-peel-orange focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peel-text mb-2">
                End time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-peel-orange focus:border-transparent"
              />
            </div>
          </div>

          {/* Active Days */}
          <div>
            <label className="block text-sm font-medium text-peel-text mb-2">
              Active days
            </label>
            <div className="flex gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDay(day.value)}
                  className={`flex-1 h-12 rounded-lg font-medium transition-all ${
                    activeDays.includes(day.value)
                      ? 'bg-peel-orange text-white'
                      : 'bg-gray-100 text-peel-text hover:bg-gray-200'
                  }`}
                  title={day.full}
                >
                  {day.short}
                </button>
              ))}
            </div>
          </div>

          {/* Notes (optional) */}
          <div>
            <label className="block text-sm font-medium text-peel-text mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional details..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-peel-orange focus:border-transparent resize-none"
              maxLength={200}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full font-medium text-peel-text hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {peel ? 'Save Changes' : 'Add Peel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

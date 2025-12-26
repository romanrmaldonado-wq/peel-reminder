import { useState } from 'react'

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [permissionGranted, setPermissionGranted] = useState(false)

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setPermissionGranted(true)
        // Move to next step or complete
        setTimeout(() => {
          onComplete()
        }, 500)
      } else {
        // User denied, but we can still let them continue
        alert('Notifications are required for Peel to work. You can enable them in your device settings.')
      }
    }
  }

  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-peel-bg to-peel-sage/10">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Orangutan illustration placeholder */}
          <div className="w-32 h-32 mx-auto bg-peel-orange/20 rounded-full flex items-center justify-center">
            <span className="text-6xl">🦧</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-peel-text">Welcome to Peel</h1>
            <p className="text-xl text-peel-text/70">
              Peel back your day, one reminder at a time
            </p>
          </div>

          <div className="space-y-3 text-left bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-peel-text/80">
              Peel sends gentle reminders that repeat automatically throughout your day.
            </p>
            <p className="text-peel-text/80">
              Perfect for medication, hydration, and daily wellness habits.
            </p>
            <p className="text-sm text-peel-text/60 italic">
              Peel reminders repeat automatically within a time window—no rescheduling required.
            </p>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="btn-primary w-full"
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-peel-bg to-peel-sage/10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-peel-text">Install Peel</h2>
            <p className="text-peel-text/70">
              For the best experience, add Peel to your home screen
            </p>
          </div>

          <div className="space-y-4 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-peel-orange flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Tap the Share button</p>
                <p className="text-sm text-peel-text/60">
                  Look for the share icon at the bottom of Safari
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-peel-orange flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Select "Add to Home Screen"</p>
                <p className="text-sm text-peel-text/60">
                  Scroll down in the share menu to find this option
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-peel-orange flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Tap "Add"</p>
                <p className="text-sm text-peel-text/60">
                  Peel will appear on your home screen
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-peel-text/50 italic">
                Installing Peel is required for notifications to work properly
              </p>
            </div>
          </div>

          <button 
            onClick={() => setStep(3)}
            className="btn-primary w-full"
          >
            I've Installed Peel
          </button>

          <button 
            onClick={() => setStep(3)}
            className="w-full text-peel-text/60 text-sm"
          >
            I'll do this later
          </button>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-peel-bg to-peel-sage/10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-peel-text">Enable Notifications</h2>
            <p className="text-peel-text/70">
              Peel needs permission to send you gentle reminders
            </p>
          </div>

          <div className="space-y-4 bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-3">
              <p className="text-peel-text/80">
                ⏰ Notifications will remind you at regular intervals
              </p>
              <p className="text-peel-text/80">
                📱 They work even when the app is closed
              </p>
              <p className="text-peel-text/80">
                🌿 Opening the app periodically improves reliability
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-peel-text/50 italic">
                Notification timing is best-effort and may vary by a few minutes. Peel is designed for gentle wellness reminders, not time-critical alerts.
              </p>
            </div>
          </div>

          <button 
            onClick={requestNotificationPermission}
            className="btn-primary w-full"
          >
            Enable Notifications
          </button>

          <button 
            onClick={onComplete}
            className="w-full text-peel-text/60 text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    )
  }

  return null
}

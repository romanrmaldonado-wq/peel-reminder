export default function Settings({ preferences, onUpdatePreferences, onNavigateHome }) {
  const toggleTimeFormat = () => {
    onUpdatePreferences({
      ...preferences,
      timeFormat: preferences.timeFormat === '12h' ? '24h' : '12h'
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-peel-bg/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-peel-text">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Preferences Section */}
        <section className="peel-card">
          <h2 className="font-semibold text-lg text-peel-text mb-4">Preferences</h2>
          
          <div className="space-y-4">
            {/* Time Format Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-peel-text">Time Format</p>
                <p className="text-sm text-peel-text/60">
                  {preferences.timeFormat === '12h' ? '12-hour (AM/PM)' : '24-hour'}
                </p>
              </div>
              <button
                onClick={toggleTimeFormat}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  preferences.timeFormat === '12h' ? 'bg-peel-orange' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    preferences.timeFormat === '12h' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="peel-card">
          <h2 className="font-semibold text-lg text-peel-text mb-4">Tips for Reliability</h2>
          
          <div className="space-y-3 text-sm text-peel-text/80">
            <div className="flex items-start gap-3">
              <span className="text-lg">📱</span>
              <p>For best results, open Peel every few days to keep notifications active</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🔋</span>
              <p>Low Power Mode may delay notifications</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">⏰</span>
              <p>Notification timing is best-effort and may vary by a few minutes</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🏠</span>
              <p>Make sure Peel is installed to your home screen</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="peel-card">
          <h2 className="font-semibold text-lg text-peel-text mb-4">About Peel</h2>
          
          <div className="space-y-2 text-sm text-peel-text/80">
            <div className="flex items-center justify-between py-2">
              <span className="font-medium">Version</span>
              <span className="text-peel-text/60">1.0.0 (MVP)</span>
            </div>
            
            <div className="border-t border-gray-100 pt-3 mt-3">
              <p className="text-xs text-peel-text/60 italic leading-relaxed">
                Peel is designed for gentle wellness reminders, not time-critical alerts or medical-grade compliance tracking. Notification timing is best-effort and may vary. Do not rely on Peel for medication compliance or safety-critical reminders.
              </p>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="peel-card">
          <h2 className="font-semibold text-lg text-peel-text mb-4">Feedback</h2>
          
          <p className="text-sm text-peel-text/70 mb-4">
            Have suggestions or found a bug? We'd love to hear from you.
          </p>
          
          <a
            href="mailto:feedback@peel.app?subject=Peel Feedback"
            className="inline-block px-6 py-2 bg-peel-sage text-peel-text rounded-full font-medium hover:bg-peel-sage/80 transition-colors"
          >
            Send Feedback
          </a>
        </section>

        {/* Privacy & Terms */}
        <section className="text-center py-4">
          <div className="flex gap-4 justify-center text-sm text-peel-text/60">
            <a href="#privacy" className="hover:text-peel-orange">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-peel-orange">Terms of Service</a>
          </div>
        </section>
      </main>
    </div>
  )
}

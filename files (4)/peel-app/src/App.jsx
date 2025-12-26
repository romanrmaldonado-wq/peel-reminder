import { useState, useEffect } from 'react'
import Home from './components/Home'
import Settings from './components/Settings'
import Onboarding from './components/Onboarding'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [peels, setPeels] = useState([])
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [preferences, setPreferences] = useState({
    timeFormat: '12h', // default to 12-hour
  })

  // Check if user has seen onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
    if (hasSeenOnboarding) {
      setShowOnboarding(false)
    }
    
    // Load preferences
    const savedPreferences = localStorage.getItem('preferences')
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
    
    // Load peels
    const savedPeels = localStorage.getItem('peels')
    if (savedPeels) {
      setPeels(JSON.parse(savedPeels))
    }
  }, [])

  // Save peels to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('peels', JSON.stringify(peels))
  }, [peels])

  // Save preferences
  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(preferences))
  }, [preferences])

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setShowOnboarding(false)
  }

  const addPeel = (peel) => {
    const newPeel = {
      ...peel,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isActive: true,
    }
    setPeels([...peels, newPeel])
  }

  const updatePeel = (id, updates) => {
    setPeels(peels.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deletePeel = (id) => {
    setPeels(peels.filter(p => p.id !== id))
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="min-h-screen">
      {currentView === 'home' && (
        <Home
          peels={peels}
          onAddPeel={addPeel}
          onUpdatePeel={updatePeel}
          onDeletePeel={deletePeel}
          onNavigateToSettings={() => setCurrentView('settings')}
          preferences={preferences}
        />
      )}
      {currentView === 'settings' && (
        <Settings
          preferences={preferences}
          onUpdatePreferences={setPreferences}
          onNavigateHome={() => setCurrentView('home')}
        />
      )}
    </div>
  )
}

export default App

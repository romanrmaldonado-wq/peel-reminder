import { useState } from 'react'
import PeelModal from './PeelModal'
import PeelCard from './PeelCard'

export default function Home({ peels, onAddPeel, onUpdatePeel, onDeletePeel, onNavigateToSettings, preferences }) {
  const [showModal, setShowModal] = useState(false)
  const [editingPeel, setEditingPeel] = useState(null)

  const activePeels = peels.filter(p => p.isActive)

  const handleEdit = (peel) => {
    setEditingPeel(peel)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingPeel(null)
  }

  const handleSave = (peelData) => {
    if (editingPeel) {
      onUpdatePeel(editingPeel.id, peelData)
    } else {
      onAddPeel(peelData)
    }
    handleModalClose()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-peel-bg/80 backdrop-blur-lg border-b border-gray-100 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-peel-text">Peel</h1>
          <button
            onClick={onNavigateToSettings}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Settings"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {activePeels.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-40 h-40 mb-6 bg-peel-orange/10 rounded-full flex items-center justify-center">
              <span className="text-8xl">🦧</span>
            </div>
            <h2 className="text-2xl font-semibold text-peel-text mb-2">
              Nothing here yet
            </h2>
            <p className="text-peel-text/60 mb-8">
              You haven't added any peels
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              Add a peel
            </button>
          </div>
        ) : (
          /* Peel List */
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-peel-text">Your Peels</h2>
              <span className="text-sm text-peel-text/60">{activePeels.length} active</span>
            </div>
            
            {activePeels.map(peel => (
              <PeelCard
                key={peel.id}
                peel={peel}
                onEdit={() => handleEdit(peel)}
                onDelete={() => onDeletePeel(peel.id)}
                onToggle={() => onUpdatePeel(peel.id, { isActive: !peel.isActive })}
                preferences={preferences}
              />
            ))}

            {/* Floating Add Button */}
            <button
              onClick={() => setShowModal(true)}
              className="fixed bottom-6 right-6 w-14 h-14 bg-peel-orange text-white rounded-full shadow-lg flex items-center justify-center hover:bg-peel-orange/90 active:scale-95 transition-all"
              aria-label="Add peel"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <PeelModal
          peel={editingPeel}
          onSave={handleSave}
          onClose={handleModalClose}
          preferences={preferences}
        />
      )}
    </div>
  )
}

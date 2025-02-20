import BudgetModal from '@/components/BudgetModal/BudgetModal'
import { useState } from 'react'

function BudgetsView() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false)
    }
  }

  return (
    <div>
      <header className="flex justify-between">
        <h1>Budgets</h1>
        <button onClick={() => setIsModalOpen(true)}>Add new Budget</button>
      </header>
      <main>This Will be budgets content</main>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <BudgetModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  )
}

export default BudgetsView

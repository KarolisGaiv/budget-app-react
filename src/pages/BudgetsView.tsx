import BudgetModal from '@/components/BudgetModal'

function BudgetsView() {
  return (
    <div>
      <header className="flex justify-between">
        <h1>Budgets</h1>
        <button>Add new Budget</button>
      </header>
      <main>This Will be budgets content</main>
      <BudgetModal />
    </div>
  )
}

export default BudgetsView

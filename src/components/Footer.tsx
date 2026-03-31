import type { FilterType } from '../types'

interface Props {
  activeCount: number
  completedCount: number
  filter: FilterType
  onFilterChange: (f: FilterType) => void
  onClearCompleted: () => void
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'すべて', value: 'all' },
  { label: '未完了', value: 'active' },
  { label: '完了済み', value: 'completed' },
]

export function Footer({ activeCount, completedCount, filter, onFilterChange, onClearCompleted }: Props) {
  return (
    <footer className="todo-footer">
      <span className="item-count">
        <strong>{activeCount}</strong> 件残り
      </span>

      <nav className="filter-bar" aria-label="フィルター">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn${filter === f.value ? ' active' : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </nav>

      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          完了済みを削除
        </button>
      )}
    </footer>
  )
}

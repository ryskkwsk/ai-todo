import { useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import type { FilterType } from './types'
import './styles/global.css'

export default function App() {
  const { todos, activeCount, completedCount, allCompleted, addTodo, toggleTodo, deleteTodo, editTodo, toggleAll, clearCompleted } = useTodos()
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed)
    if (filter === 'completed') return todos.filter(t => t.completed)
    return todos
  }, [todos, filter])

  return (
    <div className="app">
      <h1 className="app-title">todos</h1>

      <div className="card">
        <div className="card-header">
          {todos.length > 0 && (
            <label className="toggle-all-label" title="すべて完了/未完了">
              <input
                type="checkbox"
                className="toggle-all"
                checked={allCompleted}
                onChange={toggleAll}
                aria-label="すべて完了にする"
              />
              <span className="toggle-all-arrow">❯</span>
            </label>
          )}
          <TodoInput onAdd={addTodo} />
        </div>

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>

      {/* Shadow layers for stacked-paper effect */}
      {todos.length > 0 && (
        <>
          <div className="card-shadow card-shadow-1" />
          <div className="card-shadow card-shadow-2" />
        </>
      )}
    </div>
  )
}

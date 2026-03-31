import { useEffect, useMemo, useState } from 'react'
import type { Todo } from '../types'

const STORAGE_KEY = 'ai-todo-items'

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const activeCount = useMemo(() => todos.filter(t => !t.completed).length, [todos])
  const completedCount = useMemo(() => todos.filter(t => t.completed).length, [todos])
  const allCompleted = todos.length > 0 && activeCount === 0

  function addTodo(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() },
    ])
  }

  function toggleTodo(id: string) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTodo(id: string) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function editTodo(id: string, text: string) {
    const trimmed = text.trim()
    if (!trimmed) {
      deleteTodo(id)
      return
    }
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)))
  }

  function toggleAll() {
    setTodos(prev => prev.map(t => ({ ...t, completed: !allCompleted })))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  return {
    todos,
    activeCount,
    completedCount,
    allCompleted,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    toggleAll,
    clearCompleted,
  }
}

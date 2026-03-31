import { useEffect, useRef, useState } from 'react'
import type { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const editRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      editRef.current?.focus()
      editRef.current?.select()
    }
  }, [editing])

  function commitEdit() {
    onEdit(todo.id, editText)
    setEditing(false)
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setEditing(false)
    }
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}${editing ? ' editing' : ''}`}>
      {editing ? (
        <input
          ref={editRef}
          className="edit-input"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={handleEditKeyDown}
          onBlur={commitEdit}
        />
      ) : (
        <>
          <label className="todo-check">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              aria-label={todo.completed ? '完了を取り消す' : '完了にする'}
            />
            <span className="checkmark" />
          </label>

          <span
            className="todo-text"
            onDoubleClick={() => {
              setEditText(todo.text)
              setEditing(true)
            }}
          >
            {todo.text}
          </span>

          <button
            className="delete-btn"
            onClick={() => onDelete(todo.id)}
            aria-label="削除"
          >
            ×
          </button>
        </>
      )}
    </li>
  )
}

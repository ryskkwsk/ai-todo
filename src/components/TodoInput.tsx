import { useRef } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onAdd(e.currentTarget.value)
      e.currentTarget.value = ''
    }
  }

  return (
    <div className="todo-input-wrapper">
      <input
        ref={inputRef}
        className="todo-input"
        type="text"
        placeholder="タスクを入力してEnterで追加…"
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  )
}

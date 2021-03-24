import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import cn from 'classnames'

import './MainPage.scss'

export default function MainPage() {
  const [text, setText] = useState('')
  const { userId } = useContext(AuthContext)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch(`/todo/?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...data])
      })
  }, [])

  function getTodo() {
    fetch(`/todo/?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...data])
      })
  }

  function removeTodo(todoId) {
    fetch(`/todo/delete/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) getTodo()
      })
      .catch((err) => console.log(err))
  }

  function completedTodo(todoId) {
    fetch(`/todo/completed/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) getTodo()
      })
      .catch((err) => console.log(err))
  }

  function importantTodo(todoId) {
    fetch(`/todo/important/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) getTodo()
      })
      .catch((err) => console.log(err))
  }

  function addTodoHandler() {
    if (!text) return null

    fetch('/todo/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setText('')
        getTodo()
      })
  }

  return (
    <div className='container'>
      <div className='main'>
        <h4>Добавить задачу</h4>
        <form className='form' onSubmit={(event) => event.preventDefault()}>
          <div className='row'>
            <div className='input-field'>
              <input
                value={text}
                onChange={(event) => setText(event.target.value)}
                type='text'
                name='input'
                className='validate'
              />
              <label htmlFor='input'>Задача</label>
            </div>
          </div>
          <div className='row'>
            <button onClick={addTodoHandler} className='waves-effect btn green'>
              Добавить
            </button>
          </div>
        </form>

        <h3>Активные задачи</h3>
        <div className='todos'>
          {todos.map((item, i) => (
            <div
              key={item._id}
              className={cn('row todos-item ', {
                important: item.important,
                completed: item.completed,
              })}>
              <div className='col todos-num'>{i + 1}</div>
              <div className='col todos-text'>{item.text}</div>
              <div className='col todos-buttons'>
                <i className='material-icons blue-text' onClick={() => completedTodo(item._id)}>
                  check
                </i>
                <i className='material-icons orange-text' onClick={() => importantTodo(item._id)}>
                  warning
                </i>
                <i
                  onClick={() => {
                    removeTodo(item._id)
                  }}
                  className='material-icons red-text'>
                  delete
                </i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

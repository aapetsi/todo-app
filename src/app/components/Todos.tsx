'use client'
import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import Toast from './Toast'
import Modal from './Modal'

export type Todo = {
  id: number
  title: string
  description: string
  status: string
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [variant, setVariant] = useState('')
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  useEffect(() => {
    setLoading(true)
    // @ts-expect-error
    const existingTodos = JSON.parse(localStorage.getItem('todos'))
    if (existingTodos) {
      setTodos(existingTodos)
    }
    // !existingTodos ? setTodos([]) : setTodos(existingTodos)
    setLoading(false)
  }, [])

  const handleAddTodo = (todo: Todo) => {
    if (!todo.title || !todo.description) {
      setVariant('error')
      setMessage('Please fill all fields')
      showToast()
      return
    }
    if (todos == null || todos.length == 0) {
      setTodos([todo])
    } else {
      setTodos([todo, ...todos])
    }

    localStorage.setItem('todos', JSON.stringify(todos))
    handleCloseModal()
    setMessage('Todo saved successfully')
    setVariant('success')
    showToast()
  }

  const updateStatus = (todo: Todo, index: number) => {
    const foundTodo = todos.find((x) => x.id === todo.id)
    const t = todos
    if (foundTodo) {
      foundTodo.status = 'completed'
      t[index] = foundTodo
      setTodos(t)
      localStorage.setItem('todos', JSON.stringify(t))

      setVariant('success')
      setMessage('Todo saved successfully')

      showToast()
    }
  }

  const handleDelete = (todo: Todo) => {
    const foundTodo = todos.find((x) => x.id == todo.id)
    if (foundTodo) {
      const index = todos.indexOf(foundTodo)
      todos.splice(index, 1)

      localStorage.setItem('todos', JSON.stringify(todos))

      setVariant('success')
      setMessage('Todo removed successfully')

      showToast()
    }
  }

  const showToast = () => {
    setIsToastVisible(true)
    setTimeout(() => {
      setIsToastVisible(false)
    }, 3500)
  }

  return (
    <div className='p-5'>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Toast
            message={message}
            isVisible={isToastVisible}
            onClose={() => setIsToastVisible(false)}
            variant={variant}
          />
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            handleSave={handleAddTodo}
          />
          <div className='flex justify-between mb-6'>
            <h1>Todo App</h1>

            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
              type='button'
              onClick={handleOpenModal}
            >
              Create a new todo
            </button>
          </div>

          <div className='overflow-x-auto'>
            <table className='mx-auto w-2/3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400'>
                <tr>
                  <th></th>
                  <th scope='col' className='px-6 py-3'>
                    Title
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3 w-[200px]'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos.map((x, index) => (
                  <tr key={x.id} className='bg-white border-b'>
                    <th></th>
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                    >
                      {x.title}
                    </th>
                    <td className='px-6 py-4'>
                      {x.status == 'completed' ? (
                        <span className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded capitalize'>
                          {x.status}
                        </span>
                      ) : (
                        <span className='bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded capitalize'>
                          {x.status}
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      <i
                        className='fa fa-trash-o text-red-500 mr-6'
                        style={{
                          fontSize: '24px',
                          fontWeight: 'initial',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleDelete(x)}
                      ></i>

                      <i
                        className='fa fa-solid fa-check text-green-400'
                        style={{
                          fontSize: '24px',
                          fontWeight: 'initial',
                          cursor: 'pointer'
                        }}
                        onClick={() => updateStatus(x, index)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

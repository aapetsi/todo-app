import { useState } from 'react'
import { Todo } from './Todos'

type ModalPropType = {
  isOpen: boolean
  onClose: () => void
  handleSave: (todo: Todo) => void
}

const Modal = ({ isOpen, onClose, handleSave }: ModalPropType) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    const payload = {
      id: new Date().getTime(),
      title,
      description,
      status: 'pending'
    }

    handleSave(payload)

    setTitle('')
    setDescription('')
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 w-[500px]'>
        <h2 className='text-xl font-semibold mb-4'>Add a new todo</h2>

        <div className='mx-auto'>
          <form className='' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='title'
              >
                Title <span className='text-red-500'>*</span>
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline'
                id='title'
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='description'
              >
                Description <span className='text-red-500'>*</span>
              </label>
              <textarea
                className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500 focus:shadow-outline'
                id='description'
                placeholder='******************'
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
                type='submit'
                onClick={handleSubmit}
              >
                Save
              </button>
              <a
                className='inline-block align-baseline font-bold text-sm text-red-500 hover:text-blue-800'
                href='#'
                onClick={onClose}
              >
                Cancel
              </a>
            </div>
          </form>
        </div>

        {/* <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button> */}
      </div>
    </div>
  )
}

export default Modal
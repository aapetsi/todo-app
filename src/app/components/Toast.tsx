type ToastPropType = {
  message: string
  isVisible: boolean
  onClose: () => void
  variant: string
}

export default function ({ message, isVisible, onClose, variant }: ToastPropType) {
  return (
    isVisible && (
      <div
        className={`fixed top-5 right-5 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out  flex items-center ${
          variant == 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <p>{message}</p>
        <button
          className='ml-4 text-white font-black tracking-wide'
          onClick={onClose}
        >
          x
        </button>
      </div>
    )
  )
}

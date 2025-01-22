import axios from 'axios';
import MyModal from './MyModal'

const ConfirmModal = ({ showModal, setShowModal, fetchBooks, bookId }) => {
  if (!showModal) return null;
  
  const closeModal = () => {
    setShowModal(false);
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/api/v1/books/${bookId}`)
      fetchBooks()
      setShowModal(false)
    } catch (error) {
      console.log('Error deleting book:', error)
    }
  }

  return (
    <MyModal title="Confirm Delete" setShowModal={setShowModal}>
      <p className="text-gray-800">Are you sure you want to delete this book?</p>
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded-lg mr-4"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </MyModal>
  )
}

export default ConfirmModal
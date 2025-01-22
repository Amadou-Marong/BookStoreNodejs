import { useEffect, useState } from 'react';
import MyModal from './MyModal';
import axios from 'axios';

const EditBookModal = ({ showModal, setShowModal, fetchBooks, bookId }) => {
  const [singleBook, setSingleBook] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // New state for the image file

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const response = await axios.get(`http://localhost:5555/api/v1/books/${bookId}`);
          setSingleBook(response.data);
        } catch (error) {
          console.log('Error fetching book:', error);
        }
      };
      fetchBook();
    }
  }, [bookId]);

  if (!showModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); // Create a new FormData object
      formData.append('title', singleBook?.title || '');
      formData.append('author', singleBook?.author || '');
      formData.append('publishedYear', singleBook?.publishedYear || '');
      if (selectedImage) {
        formData.append('image', selectedImage); // Add the image file if selected
      }

      const response = await axios.put(
        `http://localhost:5555/api/v1/books/${bookId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Book updated successfully:', response.data);
      fetchBooks(); // Fetch updated book list
        closeModal(); // Close the modal
    } catch (error) {
      console.log('Error updating book:', error);
    }
  };

  return (
    <MyModal title="Edit Book" setShowModal={setShowModal} book={singleBook}>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-800 font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={singleBook?.title || ''}
            onChange={(e) => setSingleBook({ ...singleBook, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-800 font-semibold">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={singleBook?.author || ''}
            onChange={(e) => setSingleBook({ ...singleBook, author: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-800 font-semibold">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setSelectedImage(e.target.files[0])} // Save the selected file
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publishedYear" className="block text-gray-800 font-semibold">
            Published Year
          </label>
          <input
            type="number"
            id="publishedYear"
            value={singleBook?.publishedYear || 0}
            onChange={(e) => setSingleBook({ ...singleBook, publishedYear: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mt-8">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Update Book
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </MyModal>
  );
};

export default EditBookModal;

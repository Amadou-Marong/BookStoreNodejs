import { useState } from "react";
import EditBookModal from "./EditBookModal";
import ConfirmModal from "./ConfirmModal";

const BookCard = ({ book, fetchBooks }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [selectedBookId, setSelectedBookId] = useState(null);

  // Backend base URL
  const baseURL = "http://localhost:5555/";

  const handleEdit = (book) => {
    setSelectedBookId(book._id);
    setShowModal(true);
  };
  
  const handleDelete = (book) => {
    setSelectedBookId(book._id);
    setConfirmDelete(true);
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {book.image && (
        <img
          src={`${baseURL}${book.image}`}
          alt={book.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <h2 className="mt-4 text-lg font-semibold text-gray-800">{book.title}</h2>
      <p className="mt-2 text-gray-600">Author: {book.author}</p>
      <p className="mt-2 text-gray-600">Published Year: {book.publishedYear}</p>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => handleEdit(book)}
        >
          Edit
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2" onClick={() => handleDelete(book)}>
          Delete
        </button>
      </div>
      <EditBookModal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchBooks={fetchBooks}
        bookId={selectedBookId}
      />
      <ConfirmModal
        showModal={confirmDelete}
        setShowModal={setConfirmDelete}
        fetchBooks={fetchBooks}
        bookId={selectedBookId}
      />
    </div>
  );
};

export default BookCard;

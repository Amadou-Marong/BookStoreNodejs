import BookCard from "./BookCard";
import EditBookModal from "./EditBookModal";

const BooksList = ({ books, showModal, setShowModal, fetchBooks }) => {

    const handleAddBook = () => {
        setShowModal(true);
    }
    
  return (
    
    <div className="p-8">
        <EditBookModal showModal={showModal} setShowModal={setShowModal} fetchBooks={fetchBooks}/>
      <h1 className="text-2xl font-semibold text-gray-800 text-center bg-slate-400 my-4">Books</h1>
        <div className="p-2 flex justify-end">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleAddBook}>Add New Book</button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => {
          return (
            <div key={book._id}>
              <div>
                <BookCard book={book} fetchBooks={fetchBooks}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BooksList;

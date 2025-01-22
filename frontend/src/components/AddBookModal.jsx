import axios from "axios";
import { useState } from "react";
import MyModal from "./MyModal";

const AddBookModal = ({ showModal, setShowModal, fetchBooks }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState(0);
  const [image, setImage] = useState(null); // For storing the image file

  if (!showModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the form data to send to the server
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publishedYear", parseInt(publishedYear));
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5555/api/v1/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      fetchBooks(); // Fetch updated book list
      setTitle(""); // Clear the form
      setAuthor("");
      setPublishedYear(0);
      setImage(null); // Reset the image
      setShowModal(false); // Close the modal
    } catch (error) {
      console.log("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <MyModal title={"Add New Book"} setShowModal={setShowModal}>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-800 font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publishedYear" className="block text-gray-800 font-semibold">
            Published Year
          </label>
          <input
            type="number"
            id="publishedYear"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {loading ? "Loading..." : "Add Book"}
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

export default AddBookModal;

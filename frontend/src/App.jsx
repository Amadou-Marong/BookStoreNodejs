import { useEffect, useState } from "react"
import BooksList from "./components/BooksList"
import axios from "axios"
import NavBar from "./components/NavBar"
import AddBookModal from "./components/AddBookModal"
import EditBookModal from "./components/EditBookModal"

function App() {

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Books", path: "/books" },
    { title: "Authors", path: "/authors" },
    { title: "About", path: "/about" },
  ]
  
  const [books, setBooks] = useState([])

  const [showModal, setShowModal] = useState(false)


  const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/v1/books')
        setBooks(response.data)
      } catch (error) {
        console.log('Error fetching books:', error);
      }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <>
      <main>
        <NavBar navLinks={navLinks}/>
        <div className="mt-8">
        <AddBookModal showModal={showModal} setShowModal={setShowModal} fetchBooks={fetchBooks}/>
        <BooksList books={books} setShowModal={setShowModal} fetchBooks={fetchBooks}/>
        </div>
      </main>
    </>
  )
}

export default App

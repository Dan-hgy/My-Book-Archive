import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/Layout";
import { ApiService } from "./services/api-service";
import { CardResponseModel } from "./models";
import BookCard from "./components/BookCard";

export default function App() {
  const [books, setBooks] = useState<CardResponseModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const data = await ApiService.GetBooks();
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout onRefresh={fetchBooks} onSearch={setSearchTerm}>

      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />

      <div className="container mx-auto p-4 w-full max-w-7xl">

        {isLoading ? (
          <div className="flex justify-center items-center mt-20 text-xl text-gray-500 font-medium">
            Loading books... ⏳
          </div>
        ) : books.length === 0 ? (
          <div className="flex justify-center items-center mt-20 text-xl text-gray-500 font-medium">
            The book list is empty. Create your first one! 📚✨
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="flex justify-center items-center mt-20 text-xl text-gray-500 font-medium">
            No Found "{searchTerm}" 🕵️‍♂️
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onRefresh={fetchBooks}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
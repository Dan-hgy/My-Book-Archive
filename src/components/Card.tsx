import { Card, Button } from "flowbite-react";
import { toast } from "react-toastify";
import { ApiService } from "../services/api-service";
import { CardResponseModel } from "../models";
import { LayoutProps } from "../models";



export function BookCard({ book, onRefresh }: { book: CardResponseModel } & LayoutProps) {

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
            return;
        }

        try {
            await ApiService.DeleteBook(book.id);
            toast.success("Book deleted successfully! 🗑️");
            onRefresh();
        } catch (error) {
            console.error("Error in handleDelete:", error);
            toast.error("Book delete failed ❌");
        }
    };

    const handleToggleFavorite = async () => {
        try {
            const payload = {
                title: book.title,
                author: book.author,
                description: book.description,
                coverImage: book.coverImage,
                isFavorite: !book.isFavorite
            };

            await ApiService.UpdateBook(book.id, payload);

            if (book.isFavorite) {
                toast.info("Deleted from favorites 💔");
            } else {
                toast.success("Added to favorites ❤️");
            }

            onRefresh();
        } catch (error) {
            console.error("Error in handleToggleFavorite:", error);
            toast.error("Failed to update favorite status ❌");
        }
    };

    return (
        <Card
            className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300"
            imgAlt={book.title}
            imgSrc={book.coverImage || "https://picsum.photos/200/300"}
        >
            <div className="flex-grow">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                    {book.title}
                </h5>
                <p className="text-sm text-gray-500 mb-3 font-medium">
                    Author: {book.author}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                    {book.description}
                </p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button

                    color={book.isFavorite ? "failure" : "light"}
                    onClick={handleToggleFavorite}
                    className="hover:cursor-pointer transition-transform active:scale-95"
                >
                    {book.isFavorite ? "❤️ Liked" : "🤍 Like"}
                </Button>

                <Button
                    color="dark"
                    onClick={handleDelete}
                    className="hover:cursor-pointer transition-transform active:scale-95"
                >
                    Delete
                </Button>
            </div>
        </Card>
    );
}

export default BookCard;